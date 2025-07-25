import React, { useEffect, useRef, useState } from "react";
import { CirclePlusIcon, XIcon } from "../../assets/icons";
import { Star } from "lucide-react";

interface AddMovieListModalProps {
  onClose?: () => void;
  title?: string;
  disabled?: boolean;
}

const maxStars = 5;
const starSize = "h-6 w-6";

const AddMovieListModal: React.FC<AddMovieListModalProps> = ({
  onClose,
  title = "Movie",
  disabled = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  // Dummy lists for UI
  const lists = [
    { id: "list-1", name: "test 1", items: 1 },
    { id: "list-2", name: "test 2", items: 13 },
    { id: "list-3", name: "test 3", items: 16 },
    // Add more lists as needed
  ];

  useEffect(() => {
    setAnimateIn(true);
  }, []);

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

  function handleStarClick(value: number) {
    if (!disabled) {
      setCurrentRating(value);
    }
  }

  function handleClearRating() {
    setCurrentRating(null);
    setHoverRating(null);
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
        aria-modal="true"
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-[#181528] p-6 shadow-lg sm:rounded-lg sm:max-w-md transition-all duration-300 ease-out ${
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        tabIndex={-1}
        style={{ pointerEvents: "auto", border: "1px solid #414158" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Manage "{title}" in Lists
          </h2>
        </div>
        <div className="my-4 space-y-4">
          {/* Rating UI */}
          <div>
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium mb-1 block">
              Your Rating
            </label>
            <div className="flex items-center space-x-0.5">
              {[...Array(maxStars)].map((_, index) => {
                const starIndex = index + 1;
                let fillType: "full" | "half" | "empty" = "empty";
                const effectiveRating =
                  hoverRating !== null ? hoverRating : currentRating ?? 0;
                if (effectiveRating >= starIndex) {
                  fillType = "full";
                } else if (effectiveRating >= starIndex - 0.5) {
                  fillType = "half";
                }
                return (
                  <span
                    key={starIndex}
                    className={`relative ${starSize} ${
                      !disabled ? "cursor-pointer" : ""
                    }`}
                    onMouseEnter={() =>
                      !disabled && setHoverRating(starIndex - 0.5)
                    }
                    onMouseMove={(e) => {
                      if (!disabled) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if (x < rect.width / 2) {
                          setHoverRating(starIndex - 0.5);
                        } else {
                          setHoverRating(starIndex);
                        }
                      }
                    }}
                    onMouseLeave={() => !disabled && setHoverRating(null)}
                    onClick={(e) => {
                      if (!disabled) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if (x < rect.width / 2) {
                          handleStarClick(starIndex - 0.5);
                        } else {
                          handleStarClick(starIndex);
                        }
                      }
                    }}
                  >
                    {fillType === "full" ? (
                      <Star
                        className={`${starSize} text-yellow-400`}
                        fill="currentColor"
                        stroke="currentColor"
                      />
                    ) : fillType === "half" ? (
                      <span
                        style={{
                          position: "relative",
                          display: "inline-block",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Star
                          className={`${starSize} text-yellow-400`}
                          fill="currentColor"
                          stroke="currentColor"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: "inset(0 50% 0 0)",
                          }}
                        />
                        <Star
                          className={`${starSize} text-gray-300 dark:text-gray-600`}
                          fill="none"
                          stroke="currentColor"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: "inset(0 0 0 50%)",
                          }}
                        />
                      </span>
                    ) : (
                      <Star
                        className={`${starSize} text-gray-300 dark:text-gray-600`}
                        fill="none"
                        stroke="currentColor"
                      />
                    )}
                  </span>
                );
              })}
              {!disabled && currentRating !== null && (
                <button
                  type="button"
                  onClick={handleClearRating}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground underline"
                  title="Clear rating"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {/* List selection UI */}
          <div>
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
              Select Lists
            </label>
            <div
              className="relative overflow-hidden max-h-48 mt-1 border rounded-md"
              style={{ position: "relative" } as React.CSSProperties}
            >
              <div
                className="h-full w-full rounded-[inherit]"
                style={{ overflow: "auto" }}
              >
                <div style={{ minWidth: "100%", display: "table" }}>
                  <div className="space-y-1 p-2">
                    {lists.map((list) => (
                      <div
                        key={list.id}
                        className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLists.includes(list.id)}
                          onChange={(e) => {
                            setSelectedLists((sel) =>
                              e.target.checked
                                ? [...sel, list.id]
                                : sel.filter((id) => id !== list.id)
                            );
                          }}
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          id={`list-checkbox-${list.id}`}
                        />
                        <label
                          htmlFor={`list-checkbox-${list.id}`}
                          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-normal flex-grow cursor-pointer"
                        >
                          {list.name}{" "}
                          <span className="text-xs text-muted-foreground">
                            ({list.items} items)
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2">
          <div className="flex w-full justify-between items-center">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm">
              <CirclePlusIcon className="mr-2 h-4 w-4" />
              Create New
            </button>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-[#181528] hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};

export default AddMovieListModal;
