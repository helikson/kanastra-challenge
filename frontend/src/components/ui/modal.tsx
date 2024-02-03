import * as React from "react"
import { cn } from "@/lib/utils"

const Modal = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
   <div
      ref={ref}
      {...props}
      className={
         cn(
            "flex justify-center items-center",
            "bg-zinc-800 bg-opacity-60",
            "fixed inset-0 z-50 outline-none",
            "overflow-x-hidden overflow-y-auto",
            className
         )
      }
   >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
         {children}
      </div>
   </div>
))
Modal.displayName = "Modal"

const ModalContent = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      {...props}
      className={cn(
         "relative rounded-lg shadow bg-gray-700",
         className
      )}
   />
))
ModalContent.displayName = "ModalContent"

const ModalHeader = React.forwardRef<
   HTMLDivElement,
   Partial<{
      hasCloseButton: boolean,
      closeModal: VoidFunction
   } & React.HTMLAttributes<HTMLDivElement>>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      {...props}
      className={cn(
         "flex items-center justify-between",
         "rounded-t border-b border-gray-600",
         "p-4 md:p-5",
         className
      )}
   >
      <h3 className="text-xl font-semibold text-white">
         {props.children}
      </h3>
      {props.hasCloseButton && (
         <button
            type="button"
            className={cn(
               "inline-flex justify-center items-center",
               "text-sm text-gray-400 hover:text-white",
               "bg-transparent hover:bg-gray-600",
               "rounded-lg w-8 h-8 ms-auto"
            )}
            onClick={props.closeModal}
         >
            <svg
               className="w-3 h-3"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 14 14"
            >
               <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
               />
            </svg>

            <span className="sr-only">
               Close modal
            </span>
         </button>
      )}
   </div>
))
ModalHeader.displayName = "ModalHeader"

const ModalBody = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      {...props}
      className={cn(
         "p-4 md:p-5 space-y-4",
         className
      )}
   />
))
ModalBody.displayName = "ModalBody"

const ModalFooter = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      {...props}
      className={cn(
         "flex justify-end",
         "border-t rounded-b border-gray-600",
         "gap-6 p-5",
         className
      )}
   />
))
ModalFooter.displayName = "ModalFooter"

export {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter
}