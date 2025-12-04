"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Fieldset,
  Text,
  Badge,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { TbCircleCheckFilled, TbClock, TbXboxXFilled } from "react-icons/tb";

const BOX_SHADOW = "2px 2px 10px #989898";

type FormData = {
  title: string;
  typeOfHire: string;
  justification: string;
  noOfPositions: string;
  jobGrade: string;
  hiringManager: string;
  interviewerSpoc: string;
  approver1: string;
  approver2: string;
  approver3: string;
};

type Approval = {
  id: string;
  approverName: string;
  sequenceOrder: number;
  status: string;
  decidedAt: string | null;
};

type FormDetails = {
  id: string;
  payload: FormData;
  status: string;
  createdAt: string;
  submittedBy: string;
  approvals: Approval[];
};

export default function FormDetailPage() {
  const params = useParams();
  const formId = params?.id as string;
  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/forms/${formId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch form details");
        }
        const data = await response.json();
        setFormDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchFormDetails();
    }
  }, [formId]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <TbCircleCheckFilled color="green" size={20} />;
      case "rejected":
        return <TbXboxXFilled color="red" size={20} />;
      case "pending":
        return <TbClock color="orange" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <Box maxW="800px" mx="auto" mt="10" textAlign="center">
        <Spinner size="xl" />
        <Text mt="4">Loading form details...</Text>
      </Box>
    );
  }

  if (error || !formDetails) {
    return (
      <Box maxW="800px" mx="auto" mt="10" textAlign="center">
        <Heading size="lg" color="red.500">
          {error || "Form not found"}
        </Heading>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" mt="10" mb="10">
      <Fieldset.Root>
        <HStack justify="space-between" mb="6">
          <Heading>TRF Details</Heading>
          <Badge colorPalette={getStatusColor(formDetails.status)} size="lg">
            {formDetails.status.toUpperCase()}
          </Badge>
        </HStack>

        <VStack align="stretch" gap="4">
          {/* Form Information */}
          <Box
            p="4"
            borderRadius="md"
            boxShadow={BOX_SHADOW}
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
          >
            <Heading size="md" mb="4">
              Form Information
            </Heading>
            <VStack align="stretch" gap="3">
              <Box>
                <Text fontWeight="bold" mb="1">
                  Position Title
                </Text>
                <Text>{formDetails.payload.title}</Text>
              </Box>
              <HStack>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    Type of Hire
                  </Text>
                  <Text>{formDetails.payload.typeOfHire}</Text>
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    Justification
                  </Text>
                  <Text>{formDetails.payload.justification}</Text>
                </Box>
              </HStack>
              <HStack>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    No. of Positions
                  </Text>
                  <Text>{formDetails.payload.noOfPositions}</Text>
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    Job Grade/Sub Grade
                  </Text>
                  <Text>{formDetails.payload.jobGrade}</Text>
                </Box>
              </HStack>
              <HStack>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    Hiring Manager
                  </Text>
                  <Text>{formDetails.payload.hiringManager}</Text>
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" mb="1">
                    Interviewer SPOC
                  </Text>
                  <Text>{formDetails.payload.interviewerSpoc}</Text>
                </Box>
              </HStack>
              <Box>
                <Text fontWeight="bold" mb="1">
                  Submitted At
                </Text>
                <Text>{new Date(formDetails.createdAt).toLocaleString()}</Text>
              </Box>
            </VStack>
          </Box>

          {/* Approval Status */}
          <Box
            p="4"
            borderRadius="md"
            boxShadow={BOX_SHADOW}
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
          >
            <Heading size="md" mb="4">
              Approval Status
            </Heading>
            <VStack align="stretch" gap="3">
              {formDetails.approvals &&
                formDetails.approvals.map((approval) => (
                  <HStack
                    key={approval.id}
                    p="3"
                    borderRadius="md"
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                    justify="space-between"
                  >
                    <HStack>
                      {getStatusIcon(approval.status)}
                      <Box>
                        <Text fontWeight="bold">
                          Level {approval.sequenceOrder} -{" "}
                          {approval.approverName}
                        </Text>
                        {approval.decidedAt && (
                          <Text fontSize="sm" color="gray.600">
                            Decided at:{" "}
                            {new Date(approval.decidedAt).toLocaleString()}
                          </Text>
                        )}
                      </Box>
                    </HStack>
                    <Badge colorPalette={getStatusColor(approval.status)}>
                      {approval.status.toUpperCase()}
                    </Badge>
                  </HStack>
                ))}
            </VStack>
          </Box>
        </VStack>
      </Fieldset.Root>
    </Box>
  );
}
