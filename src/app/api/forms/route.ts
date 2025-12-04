import { db } from "@/db";
import { approvalAttempts, approvals, forms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  const result = await db.transaction(async (tx) => {
    const [form] = await tx
      .insert(forms)
      .values({
        submittedBy: data.submittedBy,
        payload: data.payload,
      })
      .returning();

    const [attempt] = await tx
      .insert(approvalAttempts)
      .values({
        formId: form.id,
        attemptNumber: 1,
      })
      .returning();

    // const approvers = data.approvers;
    const approvers = [
      data.payload.approver1,
      data.payload.approver2,
      data.payload.approver3,
    ];

    await tx.insert(approvals).values(
      approvers.map((approverId: string, index: number) => ({
        approvalAttemptId: attempt.id,
        approverId,
        formId: form.id,
        sequenceOrder: index + 1,
      }))
    );

    return { form, attempt };
  });

  return Response.json(result);
}

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");

  const data = await db
    .select()
    .from(forms)
    .where(eq(forms.submittedBy, userId as string));

  return Response.json(data);
}
