CREATE TABLE `reference_interactions` (
	`id` text PRIMARY KEY NOT NULL,
	`timestamp` integer DEFAULT (unixepoch('now')) NOT NULL,
	`type` text NOT NULL
);
