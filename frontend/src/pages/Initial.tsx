import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import * as Components from "@/components";
import { getBillings } from "@/data/billings";
import { useState } from "react";

function Initial() {
   const [open, setOpen] = useState(false);

   const { data: billings } = useQuery({
      queryKey: ["billings"],
      queryFn: getBillings,
   });

   return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
         <h1 className="text-3xl font-bold">
            Billings List
         </h1>

         <div className="flex items-center justify-between">
            <Components.BillingsFilters />

            <Components.Dialog open={open} onOpenChange={setOpen}>
               <Components.DialogTrigger asChild>
                  <Components.Button>
                     <PlusCircle className="w-4 h-4 mr-2" />
                     Add
                  </Components.Button>
               </Components.DialogTrigger>

               <Components.CreateBilling
                  onCreate={() => setOpen(false)}
               />
            </Components.Dialog>
         </div>

         <div className="border rounded-lg p-2">
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
                  {billings?.map((billing, index) => (
                     <Components.TableRow key={index}>
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
                        footer
                     </Components.TableHead>
                  </Components.TableRow>
               </Components.TableFooter>
            </Components.Table>
         </div>
      </div>
   )
}

export default Initial;