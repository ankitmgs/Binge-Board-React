import { Link } from "react-router-dom";
import { Card, CardFooter, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { deleteList } from "../../redux/rtk-apis/deleteList";
import { getAllList } from "../../redux/rtk-apis/getList";
import { useState } from "react";
import { DeleteListConfirmationDialog } from "../Modals/DeleteListConfimationModal";
import { toast } from "react-toastify";
import { RenameListDialog } from "../Modals/RenameListModal";
import { editList } from "../../redux/rtk-apis/editList";

interface List {
  _id: string;
  name: string;
  isPin: boolean;
  items: Array<any>;
}
const MyList = ({ listsResponse, setShowCreateListModal }: any) => {
  const [deleteConfimation, setDeleteConfimation] = useState({
    title: "",
    isOpen: false,
    onConfirm: null,
  });
  const [renameConfimmation, setRenameConfimmation] = useState({
    list: "",
    isOpen: false,
    onConfirm: null,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteList = async (id: string) => {
    await dispatch(deleteList(id)).then((res) => {
      toast.success(res?.payload?.msg || "List Deleted...");
      dispatch(getAllList());
    });
  };

  const handlePinList = async (id: string, currentPinState: boolean) => {
    const payload = {
      isPin: !currentPinState,
    };
    dispatch(editList({ listId: id, payload })).then(() => {
      dispatch(getAllList());
    });
  };
  return (
    <div>
      {listsResponse?.isLoading ? (
        <ListSkelton />
      ) : listsResponse?.lists?.length ? (
        <div>
          <div className="mb-6">
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
              Filter by Genre (across all lists)
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-«r0»"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-[#8585ad] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 w-full md:w-1/2 mt-1"
              id="genre-filter-my-list"
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
                className="lucide lucide-filter mr-2 h-4 w-4 text-[#8585ad]"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span style={{ pointerEvents: "none" }}>All My List Genres</span>
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
                className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(listsResponse?.lists || [])
              .slice() // clone the array to avoid mutating the original
              .sort((a: List, b: List) => (b.isPin ? 1 : 0) - (a.isPin ? 1 : 0))
              .map((item: List, index: number) => {
                return (
                  <div
                    key={index}
                    className="rounded-lg text-card-foreground shadow-sm flex flex-col justify-between bg-[#262239]/80 hover:shadow-[#9174e7]/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 "
                    style={{
                      border: item?.isPin
                        ? "3px solid #9174e7b3"
                        : "1px solid #414158",
                    }}
                  >
                    <div className="flex flex-col space-y-1.5 cursor-pointer group hover:bg-[#3d3d524d]/30 transition-colors p-4">
                      <div className="flex justify-between items-start">
                        <Link
                          className="block flex-grow outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm min-w-0 group-hover:text-[#9174e7] transition-colors"
                          to="/me/list/list-1753170914309-xxjutvl"
                        >
                          <div className="tracking-tight text-lg sm:text-xl font-semibold break-words">
                            {item?.name || "List Name"}
                          </div>
                          <div className="text-[#8585ad] text-xs group-hover:text-[#9174e7]/80 transition-colors mt-0.5">
                            {item?.items.length} item
                          </div>
                        </Link>
                        <button
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] text-[#8585ad] hover:text-[#9174e7] flex-shrink-0 ml-2 h-8 w-8"
                          data-action-button="true"
                          title={item?.isPin ? "UnPin list" : "Pin list"}
                          onClick={() => handlePinList(item?._id, item?.isPin)}
                        >
                          {item?.isPin ? (
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
                              className="lucide lucide-pin-off h-4 w-4 text-[#9174e7b3]"
                            >
                              <path d="M12 17v5"></path>
                              <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"></path>
                              <path d="m2 2 20 20"></path>
                              <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"></path>
                            </svg>
                          ) : (
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
                              className="lucide lucide-pin h-4 w-4"
                            >
                              <path d="M12 17v5"></path>
                              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path>
                            </svg>
                          )}
                          <span className="sr-only">
                            {item?.isPin ? "UnPin list" : "Pin list"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-1 p-3 border-t border-border/50">
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] hover:text-[#121721] h-8 w-8"
                        data-action-button="true"
                        title="Export list"
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
                          className="lucide lucide-share2 h-4 w-4 text-[#8585ad] hover:text-[#9174e7]"
                        >
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line
                            x1="8.59"
                            x2="15.42"
                            y1="13.51"
                            y2="17.49"
                          ></line>
                          <line
                            x1="15.41"
                            x2="8.59"
                            y1="6.51"
                            y2="10.49"
                          ></line>
                        </svg>
                        <span className="sr-only">Export list</span>
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] hover:text-[#121721] h-8 w-8"
                        data-action-button="true"
                        title="Rename list"
                        onClick={() =>
                          setRenameConfimmation({
                            isOpen: true,
                            list: item,
                          })
                        }
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
                          className="lucide lucide-pen-line h-4 w-4 text-[#8585ad] hover:text-[#9174e7]"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
                        </svg>
                        <span className="sr-only">Rename list</span>
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-[#8585ad] hover:text-[#d74242] hover:bg-[#d74242]/10 h-8 w-8"
                        data-action-button="true"
                        title="Delete list"
                        onClick={() =>
                          setDeleteConfimation({
                            title: item?.name,
                            isOpen: true,
                            onConfirm: () => handleDeleteList(item?._id),
                          })
                        }
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
                          className="lucide lucide-trash2 h-4 w-4"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                        <span className="sr-only">Delete list</span>
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-[#719df4] hover:text-[#121721] rounded-md h-8 px-2 text-xs">
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
                          className="lucide lucide-eye mr-1.5 h-3.5 w-3.5"
                        >
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>{" "}
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-[#3d3d52] rounded-lg">
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
            className="lucide lucide-list-x h-16 w-16 sm:h-20 sm:w-20 text-[#8585ad] mx-auto mb-6"
          >
            <path d="M11 12H3"></path>
            <path d="M16 6H3"></path>
            <path d="M16 18H3"></path>
            <path d="m19 10-4 4"></path>
            <path d="m15 10 4 4"></path>
          </svg>
          <p className="text-[#8585ad] text-xl sm:text-2xl font-medium mb-3">
            You haven't created any lists yet.
          </p>
          <p className="text-[#8585ad] text-sm sm:text-base mb-8">
            Start organizing your favorite movies and shows!
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#9174e7] text-[#161221] hover:bg-[#9174e7]/90 h-11 rounded-md px-8"
            onClick={() => setShowCreateListModal(true)}
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
              className="lucide lucide-circle-plus mr-2 h-5 w-5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>
            Create Your First List
          </button>
        </div>
      )}
      {deleteConfimation.isOpen && (
        <DeleteListConfirmationDialog
          isOpen={deleteConfimation?.isOpen}
          onClose={() =>
            setDeleteConfimation((prev) => ({ ...prev, isOpen: false }))
          }
          listName={deleteConfimation?.title}
          onConfirm={deleteConfimation.onConfirm}
        />
      )}
      {renameConfimmation.isOpen && (
        <RenameListDialog
          isOpen={renameConfimmation.isOpen}
          onClose={() =>
            setRenameConfimmation((prev) => ({ ...prev, isOpen: false }))
          }
          list={renameConfimmation.list}
        />
      )}
    </div>
  );
};

const ListSkelton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} style={{ border: "1px solid #414158" }}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </CardHeader>
          <CardFooter className="flex justify-end gap-1 p-3">
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Export */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Pin */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Rename */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete */}
            <Skeleton className="h-8 w-20 rounded-md" /> {/* View */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyList;
