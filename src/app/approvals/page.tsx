"use client";

import { Box, Heading, Table, Textarea } from "@chakra-ui/react";
import styles from "../page.module.css";
import { TbCircleCheckFilled, TbXboxXFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import { ApprovalDialog } from "@/components/ApprovalDialog";

type FormApproval = {
  title: string;
  grade: string;
  level: number;
  status: string;
  approvalId: string;
  isForApproval: boolean;
};

export default function ApprovalsPage() {
  const [forms, setForms] = useState<FormApproval[]>([]);

  // Fetch forms from the API
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/forms/approvals", {
          headers: {
            "x-user-id": "c99902ff-9927-45f5-bd7e-6b8ea795be46",
          },
        });
        const data = await response.json();
        setForms(
          data.map(
            (form: {
              formPayload: {
                title: string;
                jobGrade: string;
              };
              sequenceOrder: number;
              status: string;
              approvalAttemptId: string;
              isForApproval: boolean;
            }) => ({
              title: form.formPayload.title,
              grade: form.formPayload.jobGrade,
              level: form.sequenceOrder,
              status: form.status.toUpperCase(),
              approvalId: form.approvalAttemptId,
              isForApproval: form.isForApproval,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const [loading, setLoading] = useState(false);
  const handleApprove = async (id: string) => {
    setLoading(true);

    await fetch("/api/forms/approvals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": "c99902ff-9927-45f5-bd7e-6b8ea795be46",
      },
      body: JSON.stringify({ status: "approved", approvalId: id }),
    });

    setLoading(false);
  };
  const handleReject = async () => {
    setLoading(true);
    // Simulate an async operation
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        alert("Form rejected!");
        resolve("done");
      }, 2000);
    });
  };

  const rejectionReasonInput = (
    <Box mt="4">
      <Heading size="sm" mb="5">
        Rejection Reason
      </Heading>
      <p>Please provide a reason for rejecting this form.</p>
      <Textarea />
    </Box>
  );

  return (
    <Box maxW="600px" mx="auto" mt="10">
      <Heading mb="6">For My Approvals</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Position Title</Table.ColumnHeader>
            <Table.ColumnHeader>Job Grade</Table.ColumnHeader>
            <Table.ColumnHeader>Level</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {forms.map((form, index) => (
            <Table.Row key={index}>
              <Table.Cell>{form.title}</Table.Cell>
              <Table.Cell>{form.grade}</Table.Cell>
              <Table.Cell>{form.level}</Table.Cell>
              <Table.Cell>{form.status}</Table.Cell>
              <Table.Cell className={styles.approveAction}>
                {form.status === "PENDING" && form.isForApproval ? (
                  <>
                    <ApprovalDialog
                      onPress={() => handleApprove(form.approvalId)}
                      loading={loading}
                      title={form.title}
                      description={`Are you sure you want to approve the position: ${form.title}?`}
                      buttonActionText="Approve"
                    >
                      <TbCircleCheckFilled
                        color="green"
                        size={28}
                        cursor={"pointer"}
                      />
                    </ApprovalDialog>
                    <ApprovalDialog
                      onPress={handleReject}
                      loading={loading}
                      title={form.title}
                      description={rejectionReasonInput}
                      buttonActionText="Reject"
                    >
                      <TbXboxXFilled color="red" size={28} cursor={"pointer"} />
                    </ApprovalDialog>
                  </>
                ) : (
                  <>
                    <TbCircleCheckFilled
                      color="gray"
                      size={28}
                      opacity={0.3}
                      cursor={"not-allowed"}
                    />
                    <TbXboxXFilled
                      color="gray"
                      size={28}
                      opacity={0.3}
                      cursor={"not-allowed"}
                    />
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
