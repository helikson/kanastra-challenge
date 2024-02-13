import { memo } from "react";
import { TableCell, TableRow } from "@/components";

interface IBillingsTableDataProps {
   data: Array<IBillings>
}

function BillingsTableData({ data }: IBillingsTableDataProps) {
   return data?.map(({ id, name, governmentId, email, debtAmount, debtDueDate, debtId }) => (
      <TableRow key={`billing-${id}`}>
         <TableCell align="center">{id}</TableCell>
         <TableCell>{name}</TableCell>
         <TableCell>{governmentId}</TableCell>
         <TableCell>{email}</TableCell>
         <TableCell>{debtAmount}</TableCell>
         <TableCell>{debtDueDate}</TableCell>
         <TableCell>{debtId}</TableCell>
      </TableRow>
   ))
}

export default memo(BillingsTableData);