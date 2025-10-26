import { db } from "./db";
import { eq, and, or, like, sql } from "drizzle-orm";
import {
  type User,
  type UpsertUser,
  type Speaker,
  type InsertSpeaker,
  type Category,
  type InsertCategory,
  type Speech,
  type InsertSpeech,
  type SpeechWithDetails,
  type Subscription,
  type InsertSubscription,
  users,
  speakers,
  categories,
  speeches,
  subscriptions,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, user: Partial<UpsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // Speakers
  getSpeakers(): Promise<Speaker[]>;
  getSpeaker(id: string): Promise<Speaker | undefined>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  updateSpeaker(id: string, speaker: Partial<InsertSpeaker>): Promise<Speaker | undefined>;
  deleteSpeaker(id: string): Promise<boolean>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  // Speeches
  getSpeeches(filters?: {
    categoryId?: string;
    speakerId?: string;
    type?: string;
    search?: string;
  }): Promise<SpeechWithDetails[]>;
  getSpeech(id: string): Promise<SpeechWithDetails | undefined>;
  createSpeech(speech: InsertSpeech): Promise<Speech>;
  updateSpeech(id: string, speech: Partial<InsertSpeech>): Promise<Speech | undefined>;
  deleteSpeech(id: string): Promise<boolean>;

  // Subscriptions
  getSubscriptions(): Promise<Subscription[]>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  deleteSubscription(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<UpsertUser>): Promise<User | undefined> {
    const [updated] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Speakers
  async getSpeakers(): Promise<Speaker[]> {
    return await db.select().from(speakers);
  }

  async getSpeaker(id: string): Promise<Speaker | undefined> {
    const [speaker] = await db.select().from(speakers).where(eq(speakers.id, id));
    return speaker || undefined;
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const [newSpeaker] = await db.insert(speakers).values(speaker).returning();
    return newSpeaker;
  }

  async updateSpeaker(id: string, speaker: Partial<InsertSpeaker>): Promise<Speaker | undefined> {
    const [updated] = await db.update(speakers).set(speaker).where(eq(speakers.id, id)).returning();
    return updated || undefined;
  }

  async deleteSpeaker(id: string): Promise<boolean> {
    const result = await db.delete(speakers).where(eq(speakers.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updated] = await db.update(categories).set(category).where(eq(categories.id, id)).returning();
    return updated || undefined;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Speeches
  async getSpeeches(filters?: {
    categoryId?: string;
    speakerId?: string;
    type?: string;
    search?: string;
  }): Promise<SpeechWithDetails[]> {
    let query = db
      .select({
        id: speeches.id,
        title: speeches.title,
        speakerId: speeches.speakerId,
        categoryId: speeches.categoryId,
        type: speeches.type,
        date: speeches.date,
        location: speeches.location,
        context: speeches.context,
        transcript: speeches.transcript,
        audioUrl: speeches.audioUrl,
        duration: speeches.duration,
        excerpt: speeches.excerpt,
        imageUrl: speeches.imageUrl,
        isPremium: speeches.isPremium,
        price: speeches.price,
        speaker: speakers,
        category: categories,
      })
      .from(speeches)
      .innerJoin(speakers, eq(speeches.speakerId, speakers.id))
      .innerJoin(categories, eq(speeches.categoryId, categories.id));

    const conditions = [];

    if (filters?.categoryId) {
      conditions.push(eq(speeches.categoryId, filters.categoryId));
    }

    if (filters?.speakerId) {
      conditions.push(eq(speeches.speakerId, filters.speakerId));
    }

    if (filters?.type) {
      conditions.push(eq(speeches.type, filters.type));
    }

    if (filters?.search) {
      conditions.push(
        or(
          like(speeches.title, `%${filters.search}%`),
          like(speeches.excerpt, `%${filters.search}%`),
          like(speakers.name, `%${filters.search}%`)
        )!
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)!);
    }

    return await query;
  }

  async getSpeech(id: string): Promise<SpeechWithDetails | undefined> {
    const [speech] = await db
      .select({
        id: speeches.id,
        title: speeches.title,
        speakerId: speeches.speakerId,
        categoryId: speeches.categoryId,
        type: speeches.type,
        date: speeches.date,
        location: speeches.location,
        context: speeches.context,
        transcript: speeches.transcript,
        audioUrl: speeches.audioUrl,
        duration: speeches.duration,
        excerpt: speeches.excerpt,
        imageUrl: speeches.imageUrl,
        isPremium: speeches.isPremium,
        price: speeches.price,
        speaker: speakers,
        category: categories,
      })
      .from(speeches)
      .innerJoin(speakers, eq(speeches.speakerId, speakers.id))
      .innerJoin(categories, eq(speeches.categoryId, categories.id))
      .where(eq(speeches.id, id));

    return speech || undefined;
  }

  async createSpeech(speech: InsertSpeech): Promise<Speech> {
    const [newSpeech] = await db.insert(speeches).values(speech).returning();
    return newSpeech;
  }

  async updateSpeech(id: string, speech: Partial<InsertSpeech>): Promise<Speech | undefined> {
    const [updated] = await db.update(speeches).set(speech).where(eq(speeches.id, id)).returning();
    return updated || undefined;
  }

  async deleteSpeech(id: string): Promise<boolean> {
    const result = await db.delete(speeches).where(eq(speeches.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Subscriptions
  async getSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions);
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
    return subscription || undefined;
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [newSubscription] = await db.insert(subscriptions).values(subscription).returning();
    return newSubscription;
  }

  async updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [updated] = await db.update(subscriptions).set(subscription).where(eq(subscriptions.id, id)).returning();
    return updated || undefined;
  }

  async deleteSubscription(id: string): Promise<boolean> {
    const result = await db.delete(subscriptions).where(eq(subscriptions.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
