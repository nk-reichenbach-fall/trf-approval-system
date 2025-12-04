import { db } from "@/db";
import { approvalAttempts, approvals, forms, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: formId } = await params;

  console.log(formId);

  try {
    // Fetch the form details
    const [form] = await db
      .select()
      .from(forms)
      .where(eq(forms.id, formId))
      .execute();

    if (!form) {
      return Response.json({ error: "Form not found" }, { status: 404 });
    }

    // Fetch the latest approval attempt
    const [attempt] = await db
      .select()
      .from(approvalAttempts)
      .where(eq(approvalAttempts.formId, formId))
      .orderBy(approvalAttempts.attemptNumber)
      .execute();

    if (!attempt) {
      return Response.json(
        { error: "No approval attempt found" },
        { status: 404 }
      );
    }

    // Fetch all approvals with approver details
    const approvalsList = await db
      .select({
        id: approvals.id,
        sequenceOrder: approvals.sequenceOrder,
        status: approvals.status,
        decidedAt: approvals.decidedAt,
        approverName: users.name,
        approverId: users.id,
      })
      .from(approvals)
      .leftJoin(users, eq(approvals.approverId, users.id))
      .where(eq(approvals.approvalAttemptId, attempt.id))
      .orderBy(approvals.sequenceOrder)
      .execute();

    return Response.json({
      id: form.id,
      payload: form.payload,
      status: form.status,
      createdAt: form.createdAt,
      submittedBy: form.submittedBy,
      approvals: approvalsList,
    });
  } catch (error) {
    console.error("Error fetching form details:", error);
    return Response.json(
      { error: "Failed to fetch form details" },
      { status: 500 }
    );
  }
}
