"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  NativeSelect,
  Fieldset,
  RadioGroup,
  Field,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Toaster, toaster } from "@/components/ui/toaster";

const BOX_SHADOW = "2px 2px 10px #989898";
const APPROVERS_LIST = [
  { name: "Ashima", id: "c99902ff-9927-45f5-bd7e-6b8ea795be46" },
  { name: "Venkat", id: "3fee3fc4-9a88-4333-8df8-19ce08127e99" },
  { name: "Bharani", id: "a92881e9-5be7-4ec1-9fbb-70377517b34e" },
];

export default function SubmitFormPage() {
  const [formData, setFormData] = useState({
    title: "",
    typeOfHire: "Permanent",
    justification: "New",
    noOfPositions: "",
    jobGrade: "",
    hiringManager: "",
    interviewerSpoc: "",
    approver1: "",
    approver2: "",
    approver3: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    typeOfHire: false,
    justification: false,
    noOfPositions: false,
    jobGrade: false,
    hiringManager: false,
    interviewerSpoc: false,
    approver1: false,
    approver2: false,
    approver3: false,
  });

  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | FormEvent<HTMLDivElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async () => {
    let isInvalid = false;
    console.log(formData);

    // Check if all required fields are filled
    if (!formData.title) {
      setFormErrors((prev) => ({ ...prev, title: true }));
      isInvalid = true;
    }
    if (!formData.typeOfHire) {
      setFormErrors((prev) => ({ ...prev, typeOfHire: true }));
      isInvalid = true;
    }
    if (!formData.justification) {
      setFormErrors((prev) => ({ ...prev, justification: true }));
      isInvalid = true;
    }
    if (!formData.noOfPositions || Number(formData.noOfPositions) <= 0) {
      setFormErrors((prev) => ({ ...prev, noOfPositions: true }));
      isInvalid = true;
    }
    if (!formData.jobGrade) {
      setFormErrors((prev) => ({ ...prev, jobGrade: true }));
      isInvalid = true;
    }
    if (!formData.hiringManager) {
      setFormErrors((prev) => ({ ...prev, hiringManager: true }));
      isInvalid = true;
    }
    if (!formData.interviewerSpoc) {
      setFormErrors((prev) => ({ ...prev, interviewerSpoc: true }));
      isInvalid = true;
    }
    if (!formData.approver1) {
      setFormErrors((prev) => ({ ...prev, approver1: true }));
      isInvalid = true;
    }
    if (!formData.approver2) {
      setFormErrors((prev) => ({ ...prev, approver2: true }));
      isInvalid = true;
    }
    if (!formData.approver3) {
      setFormErrors((prev) => ({ ...prev, approver3: true }));
      isInvalid = true;
    }

    if (isInvalid) {
      toaster.error({ title: "Please fill all required fields." });
      return;
    }

    toaster.promise(
      fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: { ...formData },
          submittedBy: "dacb5bc9-1cbc-4a0e-949f-f1fbf463038c",
        }),
      }),
      {
        loading: { title: "Submitting form..." },
        success: {
          title: "Form submitted successfully!",
          description: "Redirecting to My Submissions page",
        },
        error: { title: "Error submitting form." },
        finally: () => {
          setTimeout(() => {
            router.push("/forms");
            return;
          }, 2000);
        },
      }
    );
  };

  const typeOfHireItems = [
    { label: "Permanent", value: "Permanent" },
    {
      label: "Fixed Term (Direct Contract)",
      value: "Fixed Term (Direct Contract)",
    },
    {
      label: "Sub-Contracting (Vendor Contract)",
      value: "Sub-Contracting (Vendor Contract)",
    },
    { label: "Any of the above", value: "Any of the above" },
  ];

  const justificationItems = [
    { label: "New", value: "New" },
    { label: "Replacement", value: "Replacement" },
  ];

  return (
    <Box maxW="600px" mx="auto" mt="10" mb="10">
      <Toaster />
      <Fieldset.Root>
        <Heading mb="6">TRF</Heading>
        <VStack align="stretch">
          <Fieldset.Content>
            <Field.Root mb="4" invalid={formErrors.title}>
              <Fieldset.Legend fontWeight={"bold"}>
                Position Title
              </Fieldset.Legend>
              <Input
                value={formData.title || ""}
                onChange={handleChange}
                boxShadow={BOX_SHADOW}
                name="title"
                required
              />
            </Field.Root>
            <Field.Root mb="4" invalid={formErrors.typeOfHire}>
              <Fieldset.Legend fontWeight={"bold"}>
                Type of Hire
              </Fieldset.Legend>
              <RadioGroup.Root
                defaultValue={typeOfHireItems[0].value}
                name="typeOfHire"
                onChange={handleChange}
              >
                <VStack gap="2" alignItems={"flex-start"}>
                  {typeOfHireItems.map((item) => (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Field.Root>
            <Field.Root invalid={formErrors.justification} mb="4">
              <Fieldset.Legend fontWeight={"bold"}>
                Justification
              </Fieldset.Legend>
              <RadioGroup.Root
                defaultValue={justificationItems[0].value}
                name="justification"
                onChange={handleChange}
              >
                <VStack gap="2" alignItems={"flex-start"}>
                  {justificationItems.map((item) => (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Field.Root>
            <Field.Root invalid={formErrors.noOfPositions} mb="4">
              <Fieldset.Legend fontWeight={"bold"}>
                No. of Positions
              </Fieldset.Legend>
              <Input
                value={formData.noOfPositions || ""}
                maxW={"100px"}
                type="number"
                boxShadow={BOX_SHADOW}
                name="noOfPositions"
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root invalid={formErrors.jobGrade} mb="4">
              <Fieldset.Legend fontWeight={"bold"}>
                Job Grade/Sub Grade
              </Fieldset.Legend>
              <Input
                value={formData.jobGrade || ""}
                boxShadow={BOX_SHADOW}
                name="jobGrade"
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root invalid={formErrors.hiringManager} mb="4">
              <Fieldset.Legend fontWeight={"bold"}>
                Hiring Manager
              </Fieldset.Legend>
              <Input
                value={formData.hiringManager || ""}
                boxShadow={BOX_SHADOW}
                name="hiringManager"
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root invalid={formErrors.interviewerSpoc} mb="4">
              <Fieldset.Legend fontWeight={"bold"}>
                Interviewer SPOC
              </Fieldset.Legend>
              <Input
                value={formData.interviewerSpoc}
                boxShadow={BOX_SHADOW}
                name="interviewerSpoc"
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root invalid={formErrors.approver1}>
              <Fieldset.Legend fontWeight={"bold"}>Approver 1</Fieldset.Legend>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select Level 1 approver"
                  name="approver1"
                  value={formData.approver1}
                  onChange={handleChange}
                >
                  {APPROVERS_LIST.map((approver) => (
                    <option key={approver.id} value={approver.id}>
                      {approver.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root invalid={formErrors.approver2}>
              <Fieldset.Legend fontWeight={"bold"}>Approver 2</Fieldset.Legend>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select Level 2 approver"
                  name="approver2"
                  value={formData.approver2}
                  onChange={handleChange}
                >
                  {APPROVERS_LIST.map((approver) => (
                    <option key={approver.id} value={approver.id}>
                      {approver.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root invalid={formErrors.approver3}>
              <Fieldset.Legend fontWeight={"bold"}>Approver 3</Fieldset.Legend>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select Level 3 approver"
                  name="approver3"
                  value={formData.approver3}
                  onChange={handleChange}
                >
                  {APPROVERS_LIST.map((approver) => (
                    <option key={approver.id} value={approver.id}>
                      {approver.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Fieldset.Content>
          <Button colorPalette={"blackAlpha"} onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>
      </Fieldset.Root>
    </Box>
  );
}
