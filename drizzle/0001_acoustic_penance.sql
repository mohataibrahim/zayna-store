CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` varchar(64) NOT NULL,
	`name` text NOT NULL,
	`price` varchar(50) NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`video` text,
	`country` enum('SA','EG','AE','IQ') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_productId_unique` UNIQUE(`productId`)
);
