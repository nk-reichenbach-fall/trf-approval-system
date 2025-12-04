ALTER TABLE "approval_attempts" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "approvals" ADD COLUMN "formId" uuid;--> statement-breakpoint
ALTER TABLE "approvals" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_formId_forms_id_fk" FOREIGN KEY ("formId") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;