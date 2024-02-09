import { memo, useCallback, useRef, useState } from "react";
import { FileActionType, useFileContext } from "./file";
import { cn } from "@/lib/utils";
import { fetchData } from "@/lib/fetchData";
import * as Components from "@/components"

const UPLOAD_URL = import.meta.env.VITE_API_UPLOAD;

const FileUploader = memo(function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state: { file, fileList, isLoading }, dispatch } = useFileContext();
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSetFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadingFile = e.target?.files?.[0];

    if (uploadingFile) {
      setError(null);
      dispatch({
        type: FileActionType.SET_LOADING,
        payload: {
          isLoading: true
        }
      });

      dispatch({
        type: FileActionType.SET_FILE,
        payload: {
          file: uploadingFile
        }
      });
    }
  }, [dispatch]);

  const handleUploadFile = useCallback(() => {
    setError(null);
    dispatch({
      type: FileActionType.SET_LOADING,
      payload: {
        isLoading: true
      }
    });

    const formData = new FormData();
    formData.append("csv_file", file as File);

    fetchData({
      url: UPLOAD_URL,
      options: {
        method: "POST",
        body: formData
      },
      onSuccess: () => {
        dispatch({
          type: FileActionType.UPLOAD_FILE,
          payload: {
            fileList: [
              ...(fileList || []),
              file
            ] as File[]
          }
        });

        handleCloseModal();
      },
      onFail: (error) => {
        dispatch({ type: FileActionType.SET_LOADING, payload: { isLoading: false } });
        setError(error.message);
      }
    })
  }, [file, fileList]);

  const clearFile = useCallback(() => {
    dispatch({ type: FileActionType.CLEAR_FILE });

    if (inputRef?.current?.value) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

  const handleCloseModal = useCallback(() => {
    clearFile();
    setShowModal(false);
  }, []);

  return (
    <Components.Dialog>
      <Components.DialogTrigger asChild>
        <button
          className={cn(
            "bg-blue-700 hover:bg-blue-800",
            "block rounded-lg px-5 py-2.5",
            "focus:outline-none focus:ring-4 focus:ring-blue-300",
            "text-white font-medium text-sm text-center"
          )}
          type="button"
          // onClick={() => setShowModal(true)}
        >
          Upload data
        </button>
      </Components.DialogTrigger>

      <Components.DialogContent>
        <Components.DialogHeader>
          <Components.DialogTitle>Are you absolutely sure?</Components.DialogTitle>
          <Components.DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </Components.DialogDescription>
        </Components.DialogHeader>
      </Components.DialogContent>
    </Components.Dialog>
  )

  // return (
  //   <>

  //     {showModal && (
  //       <Modal>
  //         <ModalContent>
  //           <ModalHeader
  //             hasCloseButton
  //             closeModal={handleCloseModal}
  //           >
  //             Upload CSV Files
  //           </ModalHeader>

  //           <ModalBody>
  //             <div>
  //               <label htmlFor="file" className="sr-only">
  //                 Choose file
  //               </label>

  //               <input
  //                 id="file"
  //                 type="file"
  //                 ref={inputRef}
  //                 disabled={isLoading}
  //                 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
  //                 onChange={handleSetFile}
  //                 className={
  //                   cn(
  //                     "file:border-none file:rounded-lg",
  //                     "file:mr-4 file:px-6 file:py-3",
  //                     "file:text-white file:font-semibold file:text-sm",
  //                     "file:bg-slate-800",
  //                     isLoading
  //                       ? "file:cursor-not-allowed file:bg-slate-600"
  //                       : "file:cursor-pointer file:hover:bg-slate-700"
  //                   )
  //                 }
  //               />
  //               <p className="mt-2 text-sm text-gray-400">
  //                 Upload a CSV file
  //               </p>
  //             </div>

  //             {isLoading && (
  //               <p className="text-green-500 text-lg font-semibold flex justify-center">
  //                 Uploading...
  //               </p>
  //             )}

  //             {error && (
  //               <p className="text-red-500 text-lg font-semibold flex justify-center">
  //                 {error}
  //               </p>
  //             )}

  //             {!isLoading && file?.size && (
  //               <section>
  //                 <p className="pb-6">
  //                   File details:
  //                 </p>

  //                 <ul>
  //                   <li>Name: {file.name}</li>
  //                   <li>Type: {file.type}</li>
  //                   <li>Size: {file.size} bytes</li>
  //                 </ul>
  //               </section>
  //             )}
  //           </ModalBody>

  //           <ModalFooter>
  //               <button
  //                 disabled={isLoading}
  //                 onClick={handleCloseModal}
  //                 className={cn(
  //                   "border-none rounded-lg px-4 py-2",
  //                   "text-white font-semibold",
  //                   "bg-red-800 hover:bg-red-700",
  //                   "disabled:bg-slate-600 disabled:cursor-not-allowed",
  //                 )}
  //               >
  //                 Cancel
  //               </button>

  //               <button
  //                 disabled={isLoading || !file?.size}
  //                 onClick={handleUploadFile}
  //                 className={cn(
  //                   "border-none rounded-lg px-4 py-2",
  //                   "text-white font-semibold",
  //                   "bg-green-800 hover:bg-green-700",
  //                   "disabled:bg-slate-600 disabled:cursor-not-allowed",
  //                 )}
  //               >
  //                 Upload
  //               </button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     )}
  //   </>
  // );
});

export { FileUploader };
