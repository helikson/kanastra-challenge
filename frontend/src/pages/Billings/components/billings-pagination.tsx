import { PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components";

interface IBillingsPaginationProps {
   links: Array<IBillingsLink>,
   onHandleChange: (pageLink: string) => void,
}

function BillingsPagination({ links, onHandleChange }: IBillingsPaginationProps) {
   return links?.map((link, index) => {
      if (index === 0) {
         return (
            <PaginationItem key="pagination-previous">
               <PaginationPrevious
                  className={link.url === null ? "cursor-not-allowed" : ""}
                  onClick={() => {
                     if (link.url === null) return;
                     onHandleChange(link.url as string)
                  }}
               />
            </PaginationItem>
         );
      }

      if ((index + 1) === links?.length) {
         return (
            <PaginationItem key="pagination-next">
               <PaginationNext
                  className={link.url === null ? "cursor-not-allowed" : ""}
                  onClick={() => {
                     if (link.url === null) return;
                     onHandleChange(link.url as string)
                  }}
               />
            </PaginationItem>
         )
      }

      if (link.url === null && link.label === "...") {
         return (
            <PaginationItem key="pagination-ellipsis">
               <PaginationEllipsis />
            </PaginationItem>
         )
      }

      return (
         <PaginationItem key={`pagination-${index}`}>
            <PaginationLink
               onClick={() => {
                  if (link.active) return;
                  onHandleChange(link.url as string)
               }}
               isActive={link.active}
            >
               {link.label}
            </PaginationLink>
         </PaginationItem>
      );
   })
}

export default BillingsPagination;