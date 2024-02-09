import { memo, useCallback, useEffect, useState } from "react";
import * as Components from '@/components'
import { useFileContext } from "@/components/ui/file";
import { fetchData } from "@/lib/fetchData";

const LIST_URL = import.meta.env.VITE_API_LIST;

function Billings() {
   const [billings, setBillings] = useState<ServiceData>();
   const [error, setError] = useState<string | null>(null);
   const { state: { fileList } } = useFileContext();

   useEffect(() => {
      callPage();
   }, [fileList]);

   const callPage = useCallback((paginate?: string) => {
      setError(null);

      fetchData({
         url: `${LIST_URL}${paginate || ""}`,
         onSuccess: data => setBillings(data),
         onFail: (error) => {
            setBillings({} as ServiceData);
            setError(error.message);
         },
      });
   }, []);

   if (error) {
      return (
         <p className="h-full w-full flex items-center justify-center text-red-500 text-lg font-semibold">
            {error}
         </p>
      );
   }

   if (!billings) {
      return (
         <p className="h-full w-full flex items-center justify-center">
            Loading...
         </p>
      );
   }

   if (Object.keys(billings.data || {}).length === 0) {
      return (
         <p className="h-full w-full flex items-center justify-center">
            No data
         </p>
      );
   }

   return (
      <Components.Table>
         <Components.TableCaption>
            Billings Table
         </Components.TableCaption>

         <Components.TableHeader>
            <Components.TableRow>
               <Components.TableHead>name</Components.TableHead>
               <Components.TableHead>governmentId</Components.TableHead>
               <Components.TableHead>email</Components.TableHead>
               <Components.TableHead>debtAmount</Components.TableHead>
               <Components.TableHead>debtDueDate</Components.TableHead>
               <Components.TableHead>debtId</Components.TableHead>
            </Components.TableRow>
         </Components.TableHeader>

         <Components.TableBody>
            {billings.data.map((billing: any) => (
               <Components.TableRow key={billing.id}>
                  <Components.TableCell>{billing.name}</Components.TableCell>
                  <Components.TableCell>{billing.governmentId}</Components.TableCell>
                  <Components.TableCell>{billing.email}</Components.TableCell>
                  <Components.TableCell>{billing.debtAmount}</Components.TableCell>
                  <Components.TableCell>{billing.debtDueDate}</Components.TableCell>
                  <Components.TableCell>{billing.debtId}</Components.TableCell>
               </Components.TableRow>
            ))}
         </Components.TableBody>

         <Components.TableFooter>
            <Components.TableRow>
               <Components.TableHead
                  className="text-right space-x-12"
                  colSpan={6}
               >
                  {/* <Components.TablePagination
                     from={billings.from}
                     to={billings.to}
                     total={billings.total}
                     hasPreviousPage={!!billings.prev_page_url}
                     hasNextPage={!!billings.next_page_url}
                     gotoPreviousPage={() => callPage(billings.prev_page_url)}
                     gotoNextPage={() => callPage(billings.next_page_url)}
                  /> */}
               </Components.TableHead>
            </Components.TableRow>
         </Components.TableFooter>
      </Components.Table>
   )
}

export default memo(Billings);