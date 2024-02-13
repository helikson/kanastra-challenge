import { useQuery } from "@tanstack/react-query";
import * as Components from "@/components";
import { getBillings } from "@/data/get-billings";
import CreateBilling from "@/pages/Billings/components/create-billing";
import BillingsPagination from "@/pages/Billings/components/billings-pagination";
import BillingsTableData from "@/pages/Billings/components/billings-table-data";
import { memo, useState } from "react";

function Billings() {
  const [pageLink, setPageLink] = useState("?page=1");

  const { data: fetchedData } = useQuery({
    queryKey: ["billings", pageLink],
    queryFn: () => getBillings(pageLink),
  });

  return (
    <div className="mx-auto space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billings List</h1>
        <Components.ModeToggle />
      </div>

      <div className="rounded-lg border p-2">
        <Components.Table>
          <Components.TableCaption>Billings Table</Components.TableCaption>

          <Components.TableHeader>
            <Components.TableRow>
              <Components.TableHead>
                <CreateBilling />
              </Components.TableHead>
              <Components.TableHead>Name</Components.TableHead>
              <Components.TableHead>Government ID</Components.TableHead>
              <Components.TableHead>Email</Components.TableHead>
              <Components.TableHead>Debt Amount</Components.TableHead>
              <Components.TableHead>Debt Due Date</Components.TableHead>
              <Components.TableHead>Debt ID</Components.TableHead>
            </Components.TableRow>
          </Components.TableHeader>

          <Components.TableBody>
            <BillingsTableData data={fetchedData?.data as Array<IBillings>} />
          </Components.TableBody>

          <Components.TableFooter>
            <Components.TableRow>
              <Components.TableHead
                className="space-x-12 text-right"
                colSpan={7}
              >
                <Components.Pagination>
                  <Components.PaginationContent>
                    <BillingsPagination
                      links={fetchedData?.links as Array<IBillingsLink>}
                      onHandleChange={setPageLink}
                    />
                  </Components.PaginationContent>
                </Components.Pagination>
              </Components.TableHead>
            </Components.TableRow>
          </Components.TableFooter>
        </Components.Table>
      </div>
    </div>
  );
}

export default memo(Billings);