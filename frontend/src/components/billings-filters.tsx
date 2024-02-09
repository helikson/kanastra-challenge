import { Input, Button } from "@/components"
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const billingsFilterSchema = z.object({
   name: z.string(),
   governmentId: z.number(),
})

type BillingFilterSchema = z.infer<typeof billingsFilterSchema>;

function BillingsFilters() {
   const { register, handleSubmit } = useForm<BillingFilterSchema>({
      resolver: zodResolver(billingsFilterSchema),
   });

   const handleFilterBillings = (data: BillingFilterSchema) => {
      console.log(data);
   }

   return (
      <form onSubmit={handleSubmit(handleFilterBillings)} className="flex items-center gap-2">
         <Input
            placeholder="Name"
            className="w-auto"
            {...register("name")}
         />

         <Input
            placeholder="Government ID"
            className="w-auto"
            {...register("governmentId")}
         />

         <Button variant="ghost">
            <Search className="w-4 h-4 mr-2" />
            Filter results
         </Button>
      </form>
   )
}

export { BillingsFilters };