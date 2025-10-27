import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
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
});

export const insertSpeechSchema = createInsertSchema(speeches).omit({ id: true });
export type InsertSpeech = z.infer<typeof insertSpeechSchema>;
export type Speech = typeof speeches.$inferSelect;

// Extended types for joined data
export type SpeechWithDetails = Speech & {
  speaker: Speaker;
  category: Category;
};

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// Users Table (adapted for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  language: text("language").notNull().default('en'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// User Favorites Table
export const userFavorites = pgTable("user_favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  speechId: varchar("speech_id").notNull().references(() => speeches.id, { onDelete: 'cascade' }),
  favoritedAt: timestamp("favorited_at").notNull().defaultNow(),
});

export const insertUserFavoriteSchema = createInsertSchema(userFavorites).omit({ id: true, favoritedAt: true });
export type InsertUserFavorite = z.infer<typeof insertUserFavoriteSchema>;
export type UserFavorite = typeof userFavorites.$inferSelect;

// Playlists Table
export const playlists = pgTable("playlists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPlaylistSchema = createInsertSchema(playlists).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
export type Playlist = typeof playlists.$inferSelect;

// Playlist Items Table
export const playlistItems = pgTable("playlist_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playlistId: varchar("playlist_id").notNull().references(() => playlists.id, { onDelete: 'cascade' }),
  speechId: varchar("speech_id").notNull().references(() => speeches.id, { onDelete: 'cascade' }),
  order: integer("order").notNull(),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const insertPlaylistItemSchema = createInsertSchema(playlistItems).omit({ id: true, addedAt: true });
export type InsertPlaylistItem = z.infer<typeof insertPlaylistItemSchema>;
export type PlaylistItem = typeof playlistItems.$inferSelect;

// User Listening History Table
export const userListeningHistory = pgTable("user_listening_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  speechId: varchar("speech_id").notNull().references(() => speeches.id, { onDelete: 'cascade' }),
  progress: integer("progress").notNull().default(0), // seconds
  completed: boolean("completed").notNull().default(false),
  lastListenedAt: timestamp("last_listened_at").notNull().defaultNow(),
});

export const insertUserListeningHistorySchema = createInsertSchema(userListeningHistory).omit({ id: true, lastListenedAt: true });
export type InsertUserListeningHistory = z.infer<typeof insertUserListeningHistorySchema>;
export type UserListeningHistory = typeof userListeningHistory.$inferSelect;

// Audio Bookmarks Table
export const audioBookmarks = pgTable("audio_bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  speechId: varchar("speech_id").notNull().references(() => speeches.id, { onDelete: 'cascade' }),
  timestamp: integer("timestamp").notNull(), // seconds
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAudioBookmarkSchema = createInsertSchema(audioBookmarks).omit({ id: true, createdAt: true });
export type InsertAudioBookmark = z.infer<typeof insertAudioBookmarkSchema>;
export type AudioBookmark = typeof audioBookmarks.$inferSelect;
