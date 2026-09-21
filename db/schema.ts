import { integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const learners = sqliteTable("learners", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  updatedAt: integer("updated_at").notNull(),
}, (table) => [uniqueIndex("idx_learners_email").on(table.email)]);

export const progress = sqliteTable("progress", {
  userId: text("user_id").primaryKey().references(() => learners.userId, { onDelete: "cascade" }),
  track: text("track").notNull().default("Java"),
  level: text("level").notNull().default("Beginner"),
  completedJson: text("completed_json").notNull().default("[]"),
  xp: integer("xp").notNull().default(0),
  checkpoint: integer("checkpoint").notNull().default(0),
  updatedAt: integer("updated_at").notNull(),
});

export const journeyProgress = sqliteTable("journey_progress", {
  userId: text("user_id").notNull().references(() => learners.userId, { onDelete: "cascade" }),
  track: text("track").notNull(),
  completedJson: text("completed_json").notNull().default("[]"),
  xp: integer("xp").notNull().default(0),
  checkpoint: integer("checkpoint").notNull().default(0),
  updatedAt: integer("updated_at").notNull(),
}, (table) => [primaryKey({ columns: [table.userId, table.track] })]);

export const friendships = sqliteTable("friendships", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ownerUserId: text("owner_user_id").notNull().references(() => learners.userId, { onDelete: "cascade" }),
  friendEmail: text("friend_email").notNull(),
  createdAt: integer("created_at").notNull(),
}, (table) => [uniqueIndex("idx_friendships_owner_email").on(table.ownerUserId, table.friendEmail)]);
