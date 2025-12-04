import { db } from "@/db";
import { approvals, forms } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");

  // With all the select, add a column isForApproval which is true if the sequence is next in line for approval
  const data = await db
    .select({
      formId: forms.id,
      formPayload: forms.payload,
      status: approvals.status,
      submittedAt: forms.createdAt,
      sequenceOrder: approvals.sequenceOrder,
      approvalAttemptId: approvals.id,
      isForApproval: eq(
        approvals.sequenceOrder,
        db
          .select({ sequenceOrder: approvals.sequenceOrder })
          .from(approvals)
          .where(
            and(eq(approvals.formId, forms.id), eq(approvals.status, "pending"))
          )
          .orderBy(approvals.sequenceOrder)
          .limit(1)
      ),
    })
    .from(approvals)
    .leftJoin(forms, eq(approvals.formId, forms.id))
    .where(eq(approvals.approverId, userId as string))
    .orderBy(desc(forms.updatedAt));

  console.log(data);

  return Response.json(data);
}

export async function PUT(request: Request) {
  const userId = request.headers.get("x-user-id");
  const data = await request.json();

  await db
    .update(approvals)
    .set({ status: data.status })
    .where(
      and(
        eq(approvals.approverId, userId as string),
        eq(approvals.id, data.approvalId)
      )
    );

  return new Response("Approval recorded", { status: 200 });
}
