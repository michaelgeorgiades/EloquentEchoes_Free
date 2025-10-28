import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-db";
import { seedDatabase } from "./seed";
import { setupAuth, isAuthenticated } from "./replitAuth";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static audio files
  app.use('/audio', express.static(path.join(process.cwd(), 'attached_assets', 'audio')));

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

  const httpServer = createServer(app);

  return httpServer;
}
