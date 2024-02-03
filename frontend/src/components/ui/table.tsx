import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full relative overflow-x-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom table-compact", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b bg-slate-900 border-b sticky top-0", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-slate-900", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("h-12 px-4", className)}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 mb-4 text-sm text-slate-200 dark:text-slate-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

interface IPaginationHTMLAttributes  extends HTMLDivElement {
  from: number
  to: number
  total: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  gotoPreviousPage: VoidFunction
  gotoNextPage: VoidFunction
}

const TablePagination = React.forwardRef<
  HTMLDivElement,
  Partial<IPaginationHTMLAttributes>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center", className)}
  >
    <span className="text-sm">
        Showing <span className="font-semibold"> {props.from} </span>
        to <span className="font-semibold"> {props.to} </span>
        of <span className="font-semibold"> {props.total} </span>
        Entries
    </span>

    <div className="inline-flex mt-2 xs:mt-0">
      <button
        disabled={!props.hasPreviousPage}
        onClick={props.gotoPreviousPage}
        className={cn(
          "flex items-center justify-center",
          "px-4 h-10 rounded-s",
          "text-base font-medium text-white",
          "bg-gray-800 hover:bg-gray-900",
          "disabled:bg-gray-800 disabled:hover:bg-gray-800",
          "disabled:text-gray-400 disabled:hover:text-gray-400",
          "disabled:border-gray-700"
        )}
      >
        <svg
          className="w-3.5 h-3.5 me-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Prev
      </button>

      <button
        disabled={!props.hasNextPage}
        onClick={props.gotoNextPage}
        className={cn(
          "flex items-center justify-center",
          "px-4 h-10 rounded-s rounded-e",
          "border-0 border-s border-gray-700",
          "text-base font-medium text-white",
          "bg-gray-800 hover:bg-gray-900",
          "disabled:bg-gray-800 disabled:hover:bg-gray-800",
          "disabled:text-gray-400 disabled:hover:text-gray-400",
          "disabled:border-gray-700"
        )}
      >
        Next
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  </div>
));

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination
}
