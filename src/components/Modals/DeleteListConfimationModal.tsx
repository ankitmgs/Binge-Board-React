"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

interface DeleteListConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  onConfirm: () => void;
}

// Dialog for confirming list deletion
export function DeleteListConfirmationDialog({
  isOpen,
  onClose,
  listName,
  onConfirm,
}: DeleteListConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete "{listName}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All items in this list will be
            permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{border : "1px solid #414158"}} onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onClose(); // Ensure dialog closes after confirmation
            }}
            className="bg-[#d74242] text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
