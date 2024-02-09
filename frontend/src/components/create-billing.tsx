import * as Components from '@/components';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBilling } from "@/data/billings";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const createBillingSchema = z.object({
   csv_file: z.any().refine(val => val.length > 0, "File is required")
});

type CreateBillingSchema = z.infer<typeof createBillingSchema>;

function CreateBilling({ onCreate }: { onCreate: VoidFunction }) {
   const queryClient = useQueryClient();

   const { register, handleSubmit, formState: { errors } } = useForm<CreateBillingSchema>({
      resolver: zodResolver(createBillingSchema),
   })

   const { mutateAsync: createBillingFn } = useMutation({
      mutationFn: createBilling,
      onSuccess: (_, variables) => {
         queryClient.setQueryData(
            ["billings"],
            (data: Array<unknown>) => ([
               ...data,
               {...variables}
            ])
         );
      },
   });

   const handleCreateBilling = async (data: CreateBillingSchema) => {
      console.log(data)
      try {
         await createBillingFn({
            "name": "Elijah",
            "governmentId": "45678",
            "email": "Elijah@example.com",
            "debtAmount": 3400,
            "debtDueDate": "2023-08-31",
            "debtId": "R019"
         })

         alert("Cadastrado");
         onCreate();
      } catch(err) {
         alert("Erro ao cadastrar billing");
      }
   };

   return (
      <Components.DialogContent>
         <Components.DialogHeader>
            <Components.DialogTitle>
               Add Billings
            </Components.DialogTitle>

            <Components.DialogDescription>
               Import CSV files with billings
            </Components.DialogDescription>
         </Components.DialogHeader>

         <form onSubmit={handleSubmit(handleCreateBilling)} className="space-y-6">
            <div className="grid grid-cols-4 items-center text-right gap-3">
               <Components.Label htmlFor="csv_file">
                  CSV File
               </Components.Label>

               <Components.Input
                  type="file"
                  placeholder="Select CSV file"
                  className="col-span-3"
                  {...register("csv_file")}
               />
            </div>

            {/* TODO: Aplicar styles */}
            {errors.csv_file?.message && (
               <p>
                  {errors.csv_file?.message.toString()}
               </p>
            )}

            <Components.DialogFooter>
               <Components.DialogClose asChild>
                  <Components.Button type="button" variant="outline">
                     Cancel
                  </Components.Button>
               </Components.DialogClose>

               <Components.Button type="submit">
                  Confirm
               </Components.Button>
            </Components.DialogFooter>
         </form>
      </Components.DialogContent>
   )
}

export { CreateBilling };