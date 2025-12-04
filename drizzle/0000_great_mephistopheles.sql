CREATE TABLE "approval_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"formId" uuid,
	"attemptNumber" integer NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "approvals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"approvalAttemptId" uuid,
	"approverId" uuid,
	"sequenceOrder" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"decidedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submittedBy" uuid,
	"payload" jsonb NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "approval_attempts" ADD CONSTRAINT "approval_attempts_formId_forms_id_fk" FOREIGN KEY ("formId") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_approvalAttemptId_approval_attempts_id_fk" FOREIGN KEY ("approvalAttemptId") REFERENCES "public"."approval_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_approverId_users_id_fk" FOREIGN KEY ("approverId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_submittedBy_users_id_fk" FOREIGN KEY ("submittedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;