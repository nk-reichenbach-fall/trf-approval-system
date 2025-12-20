"use client";

import { Box, Heading, Table } from "@chakra-ui/react";
import styles from "../page.module.css";
import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormItem = {
  id: string;
  title: string;
  grade: string;
  status: string;
};

export default function ApprovalsPage() {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch forms from the API
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/forms", {
          headers: {
            "x-user-id": "dacb5bc9-1cbc-4a0e-949f-f1fbf463038c",
          },
        });
        const data = await response.json();
        console.log(data);
        setForms(
          data.map(
            (form: {
              id: string;
              payload: { title: string; jobGrade: string };
              status: string;
            }) => ({
              id: form.id,
              title: form.payload.title,
              grade: form.payload.jobGrade,
              status: form.status.toUpperCase(),
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

  const handleViewDetails = (formId: string) => {
    router.push(`/forms/${formId}`);
  };

  return (
    <Box maxW="600px" mx="auto" mt="10">
      <Heading mb="6">My Submissions</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Position Title</Table.ColumnHeader>
            <Table.ColumnHeader>Job Grade</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading &&
            forms.map((form) => (
              <Table.Row key={form.id}>
                <Table.Cell
                  cursor="pointer"
                  onClick={() => handleViewDetails(form.id)}
                >
                  {form.title}
                </Table.Cell>
                <Table.Cell>{form.grade}</Table.Cell>
                <Table.Cell>{form.status}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
