import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

type ApprovalDialogProps = {
  children: React.ReactNode;
  onPress: () => Promise<void>;
  title: string;
  description?: string | React.ReactNode;
  buttonActionText?: string;
  loading?: boolean;
};

export const ApprovalDialog = (props: ApprovalDialogProps) => {
  const { children, onPress, loading, title, description, buttonActionText } =
    props;
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onPress().finally(() => {
      setOpen(false);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{description}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleSave}
                loading={loading}
                colorPalette={"blackAlpha"}
              >
                {buttonActionText || "Confirm"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
