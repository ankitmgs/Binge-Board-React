"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Button } from "../..//ui/button";
import { Input } from "../..//ui/input";
import { Label } from "../..//ui/label";

interface RenameListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  list: any;
}

// Dialog for renaming an existing user list
export function RenameListDialog({
  isOpen,
  onClose,
  list,
}: RenameListDialogProps) {
  const [error, setError] = useState("");
  const [newListName, setNewListName] = useState("")

  useEffect(() => {
    if (isOpen) {
      setNewListName(list.name); // Reset to current list name when dialog opens/list changes
      setError("");
    }
  }, [isOpen, list.name]);

  if (!isOpen) return null;

  const hanldeRename = () => {
    console.log("This is edited list", list);
    console.log("This is new name", newListName);
    
    
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setNewListName(list.name); // Reset on close if needed, but useEffect handles open
          onClose();
        }
      }}
    >
      <DialogContent
        style={{ border: "1px solid #414158" }}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Rename List: {list.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-list-name" className="text-right col-span-1">
              New Name
            </Label>
            <Input
              id="new-list-name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="col-span-3"
              placeholder="Enter new list name"
              aria-label="New list name"
            />
          </div>
          {error && (
            <p className="col-span-4 text-sm text-destructive text-center">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              style={{ border: "1px solid #414158" }}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-[#9174e7] text-black"
            //   style={{backgroundColor: "#9174e7"}}
            type="button"
            onClick={() => {
              hanldeRename();
              onClose(); // Ensure dialog closes after confirmation
            }}
          >
            Save Name
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
