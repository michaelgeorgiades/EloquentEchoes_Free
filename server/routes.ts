import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-db";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { seedDatabase } from "./seed";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Seed database on startup
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  // Auth user endpoint
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // PayPal Routes (from PayPal integration blueprint)
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Speakers API
  app.get("/api/speakers", async (req, res) => {
    try {
      const speakers = await storage.getSpeakers();
      res.json(speakers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch speakers" });
    }
  });

  app.post("/api/speakers", async (req, res) => {
    try {
      const speaker = await storage.createSpeaker(req.body);
      res.status(201).json(speaker);
    } catch (error) {
      res.status(500).json({ error: "Failed to create speaker" });
    }
  });

  app.get("/api/speakers/:id", async (req, res) => {
    try {
      const speaker = await storage.getSpeaker(req.params.id);
      if (!speaker) {
        return res.status(404).json({ error: "Speaker not found" });
      }
      res.json(speaker);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch speaker" });
    }
  });

  app.put("/api/speakers/:id", async (req, res) => {
    try {
      const updated = await storage.updateSpeaker(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Speaker not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update speaker" });
    }
  });

  app.delete("/api/speakers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSpeaker(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Speaker not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete speaker" });
    }
  });

  // Categories API
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const category = await storage.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.put("/api/categories/:id", async (req, res) => {
    try {
      const updated = await storage.updateCategory(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCategory(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Speeches API with filtering
  app.get("/api/speeches", async (req, res) => {
    try {
      const filters = {
        categoryId: req.query.categoryId as string | undefined,
        speakerId: req.query.speakerId as string | undefined,
        type: req.query.type as string | undefined,
        search: req.query.search as string | undefined,
      };
      
      const speeches = await storage.getSpeeches(filters);
      res.json(speeches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch speeches" });
    }
  });

  app.post("/api/speeches", async (req, res) => {
    try {
      const speech = await storage.createSpeech(req.body);
      res.status(201).json(speech);
    } catch (error) {
      res.status(500).json({ error: "Failed to create speech" });
    }
  });

  app.get("/api/speeches/:id", async (req, res) => {
    try {
      const speech = await storage.getSpeech(req.params.id);
      if (!speech) {
        return res.status(404).json({ error: "Speech not found" });
      }
      res.json(speech);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch speech" });
    }
  });

  app.put("/api/speeches/:id", async (req, res) => {
    try {
      const updated = await storage.updateSpeech(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Speech not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update speech" });
    }
  });

  app.delete("/api/speeches/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSpeech(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Speech not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete speech" });
    }
  });

  // Subscriptions API
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });

  app.post("/api/subscriptions", async (req, res) => {
    try {
      const subscription = await storage.createSubscription(req.body);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to create subscription" });
    }
  });

  app.get("/api/subscriptions/:id", async (req, res) => {
    try {
      const subscription = await storage.getSubscription(req.params.id);
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscription" });
    }
  });

  app.put("/api/subscriptions/:id", async (req, res) => {
    try {
      const updated = await storage.updateSubscription(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update subscription" });
    }
  });

  app.delete("/api/subscriptions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSubscription(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subscription" });
    }
  });

  // User Purchases API (require authentication)
  app.get("/api/user/purchases", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const purchases = await storage.getUserPurchases(userId);
      res.json(purchases);
    } catch (error) {
      console.error("Error fetching user purchases:", error);
      res.status(500).json({ error: "Failed to fetch purchases" });
    }
  });

  app.post("/api/user/purchases", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { speechId, price, paypalOrderId } = req.body;

      if (!speechId || !price) {
        return res.status(400).json({ error: "Speech ID and price are required" });
      }

      const purchase = await storage.createUserPurchase({
        userId,
        speechId,
        price,
        paypalOrderId,
      });

      res.status(201).json(purchase);
    } catch (error) {
      console.error("Error creating purchase:", error);
      res.status(500).json({ error: "Failed to create purchase" });
    }
  });

  app.get("/api/user/access/:speechId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { speechId } = req.params;
      const hasAccess = await storage.userHasAccessToSpeech(userId, speechId);
      res.json({ hasAccess });
    } catch (error) {
      console.error("Error checking access:", error);
      res.status(500).json({ error: "Failed to check access" });
    }
  });

  // Subscribe to a subscription plan
  app.post("/api/user/subscribe", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { subscriptionType, paypalOrderId } = req.body;

      if (!subscriptionType) {
        return res.status(400).json({ error: "Subscription type is required" });
      }

      // Calculate expiry date based on subscription type
      const now = new Date();
      let subscriptionExpiry: Date;
      
      if (subscriptionType === 'monthly') {
        subscriptionExpiry = new Date(now.setMonth(now.getMonth() + 1));
      } else if (subscriptionType === 'annual') {
        subscriptionExpiry = new Date(now.setFullYear(now.getFullYear() + 1));
      } else {
        return res.status(400).json({ error: "Invalid subscription type" });
      }

      const updatedUser = await storage.updateUser(userId, {
        subscriptionType,
        subscriptionExpiry,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error subscribing user:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
