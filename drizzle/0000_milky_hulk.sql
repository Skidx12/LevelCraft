CREATE TABLE `friendships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_user_id` text NOT NULL,
	`friend_email` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`owner_user_id`) REFERENCES `learners`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_friendships_owner_email` ON `friendships` (`owner_user_id`,`friend_email`);--> statement-breakpoint
CREATE TABLE `learners` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_learners_email` ON `learners` (`email`);--> statement-breakpoint
CREATE TABLE `progress` (
	`user_id` text PRIMARY KEY NOT NULL,
	`track` text DEFAULT 'Java' NOT NULL,
	`level` text DEFAULT 'Beginner' NOT NULL,
	`completed_json` text DEFAULT '[]' NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`checkpoint` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `learners`(`user_id`) ON UPDATE no action ON DELETE cascade
);
