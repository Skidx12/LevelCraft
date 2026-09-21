CREATE TABLE `journey_progress` (
	`user_id` text NOT NULL,
	`track` text NOT NULL,
	`completed_json` text DEFAULT '[]' NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`checkpoint` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `track`),
	FOREIGN KEY (`user_id`) REFERENCES `learners`(`user_id`) ON UPDATE no action ON DELETE cascade
);
