import { useState } from "react";
import { PlusCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Components from "@/components";
import { createBilling } from "@/data/create-billings";
import { FileActionType, useFileContext } from "@/components/file";

const createBillingSchema = z.object({
  csv_file: z.instanceof(FileList).refine((val) => val.length > 0, "File is required"),
});

type CreateBillingSchema = z.infer<typeof createBillingSchema>;

function BillingsUpload() {
  const [open, setOpen] = useState(false);
  const { state: { fileList }, dispatch } = useFileContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    }
  } = useForm<CreateBillingSchema>({
    resolver: zodResolver(createBillingSchema),
  });

  const { mutateAsync: createBillingFn, failureReason, isError } = useMutation({
    mutationFn: createBilling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["billings"] }),
  });

  const handleCreateBilling = async (data: CreateBillingSchema) => {
    try {
      const csvFile = data.csv_file[0];

      await createBillingFn(csvFile);

      dispatch({
        type: FileActionType.SET_FILE_LIST,
        payload: {
          fileList: [ ...(fileList || []), csvFile ]
        }
      });

      setOpen(false);
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  return (
    <Components.Dialog open={open} onOpenChange={setOpen}>
      <Components.DialogTrigger asChild>
        <Components.Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Components.Button>
      </Components.DialogTrigger>

      <Components.DialogContent>
        <Components.DialogHeader>
          <Components.DialogTitle>Add Billings</Components.DialogTitle>

          <Components.DialogDescription>
            Import CSV files with billings
          </Components.DialogDescription>
        </Components.DialogHeader>

        <form onSubmit={handleSubmit(handleCreateBilling)} className="space-y-6">
          <div className="grid grid-cols-4 items-center gap-3 text-right">
            <Components.Label htmlFor="csv_file">CSV File</Components.Label>

            <Components.Input
              type="file"
              placeholder="Select CSV file"
              className="col-span-3"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
              {...register("csv_file")}
            />
          </div>

          {(errors.csv_file?.message || isError) && (
            <Components.Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <Components.AlertTitle>Error</Components.AlertTitle>
              <Components.AlertDescription>
                {(errors.csv_file?.message || failureReason?.message || "Something went wrong").toString()}
              </Components.AlertDescription>
            </Components.Alert>
          )}

          <Components.DialogFooter>
            <Components.DialogClose asChild>
              <Components.Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Components.Button>
            </Components.DialogClose>

            <Components.Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </span>
              ) : "Confirm"}
            </Components.Button>
          </Components.DialogFooter>
        </form>
      </Components.DialogContent>
    </Components.Dialog>
  );
}

export default BillingsUpload;