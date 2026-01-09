CREATE TABLE `checkouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patronBarcode` text NOT NULL,
	`itemBarcode` text NOT NULL,
	`checkoutDate` text NOT NULL,
	`syncStatus` text
);
--> statement-breakpoint
CREATE TABLE `reference_interactions` (
	`id` text PRIMARY KEY NOT NULL,
	`timestamp` integer DEFAULT (CAST(strftime('%s', CURRENT_TIMESTAMP) AS INTEGER)) NOT NULL,
	`type` text NOT NULL
);
