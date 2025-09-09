ALTER TABLE "cart_items" ADD COLUMN "selected_size" varchar(10);--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "selected_size" varchar(10);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "available_sizes" json;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "size_category" varchar(20);