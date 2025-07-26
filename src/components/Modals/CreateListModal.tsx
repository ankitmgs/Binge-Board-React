import React, { useEffect, useRef, useState } from "react";
// import { addList } from "../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addList } from "../../redux/rtk-apis/addList";
import type { AppDispatch } from "../../redux/store";
import { getAllList } from "../../redux/rtk-apis/getList";

interface CreateListModalProps {
  onClose?: () => void;
}
const CreateListModal: React.FC<CreateListModalProps> = ({ onClose }) => {
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation trigger on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Close modal on outside click and Esc
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  async function handleCreateList() {
    if (!listName.trim()) {
      setError("List name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      name: listName,
      userId: localStorage.getItem("uid"),
      isPin: false,
    };

    try {
      await dispatch(addList(payload)).unwrap();
      toast.success("List created successfully!");
      setListName("");
      onClose?.();
      dispatch(getAllList());
    } catch (error) {
      setError("Failed to create list. Please try again.");
      toast.error("Failed to create list. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-[#000c] bg-opacity-70 transition-opacity"
        style={{ pointerEvents: "auto" }}
      />
      {/* Modal with animation */}
      <div
        ref={modalRef}
        role="dialog"
        id="radix-«r0»"
        aria-describedby="radix-«r2»"
        aria-labelledby="radix-«r1»"
        data-state="open"
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-[#181528] p-6 shadow-lg sm:rounded-lg sm:max-w-md transition-all duration-300 ease-out ${
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        tabIndex={-1}
        style={{ pointerEvents: "auto", border: "1px solid #414158" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="radix-«r1»"
            className="text-lg font-semibold leading-none tracking-tight"
          >
            Create New List
          </h2>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right col-span-1">
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3"
              style={{ border: "1px solid #414158" }}
              id="list-name"
              placeholder="e.g., My Awesome Movies"
              aria-label="List name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-500 col-span-4 text-sm text-destructive text-center">
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-background hover:bg-[#719df4] hover:text-black h-10 px-4 py-2"
            style={{ border: "1px solid #414158" }}
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#9174e7] text-[#161221] hover:bg-[#9174e7]/90 h-10 px-4 py-2"
            type="button"
            onClick={handleCreateList}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create List"}
          </button>
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x h-4 w-4"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};

export default CreateListModal;
