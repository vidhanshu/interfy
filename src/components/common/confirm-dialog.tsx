import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import { Button, type ButtonVariants } from "@/components/ui/button";

interface ConfirmDialogProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  onConfirm: () => void;
  variant?: ButtonVariants;
}

const ConfirmDialog = ({
  children,
  title = "Are you absolutely sure?",
  subtitle = "This action is irreversible please proceed with caution",
  onConfirm,
  variant,
}: ConfirmDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant={variant} onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
