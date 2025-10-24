import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Speakers Table
export const speakers = pgTable("speakers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  birthYear: integer("birth_year"),
  deathYear: integer("death_year"),
  location: text("location"),
  period: text("period").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertSpeakerSchema = createInsertSchema(speakers).omit({ id: true });
export type InsertSpeaker = z.infer<typeof insertSpeakerSchema>;
export type Speaker = typeof speakers.$inferSelect;

// Categories Table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Speeches Table
export const speeches = pgTable("speeches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  speakerId: varchar("speaker_id").notNull().references(() => speakers.id),
  categoryId: varchar("category_id").notNull().references(() => categories.id),
  type: text("type").notNull(), // 'speech' or 'letter'
  date: text("date").notNull(),
  location: text("location"),
  context: text("context").notNull(),
  transcript: text("transcript").notNull(),
  audioUrl: text("audio_url"),
  duration: integer("duration"), // in seconds
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url"),
  isPremium: boolean("is_premium").notNull().default(false),
  price: integer("price"), // in cents, for per-speech purchase
});

export const insertSpeechSchema = createInsertSchema(speeches).omit({ id: true });
export type InsertSpeech = z.infer<typeof insertSpeechSchema>;
export type Speech = typeof speeches.$inferSelect;

// Subscriptions Table
export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'monthly', 'annual', 'per-speech'
  price: integer("price").notNull(), // in cents
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true });
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Extended types for joined data
export type SpeechWithDetails = Speech & {
  speaker: Speaker;
  category: Category;
};

// User preferences (language, theme)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  language: text("language").notNull().default('en'),
  subscriptionType: text("subscription_type"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
