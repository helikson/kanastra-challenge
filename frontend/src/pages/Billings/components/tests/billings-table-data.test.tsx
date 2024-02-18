import { render, screen } from '@/lib/test'
import { Table, TableBody } from '@/components';
import BillingsTableData from '@/pages/Billings/components/billings-table-data';
import { billingsData } from '@/pages/Billings/components/tests/mocks/billings-data';

describe("BillingsTableData", () => {
   beforeEach(() => {
      render(
         <Table>
            <TableBody>
               <BillingsTableData data={billingsData} />
            </TableBody>
         </Table>
      );
   });

   it('renders correct number of rows', () => {
      expect(screen.getAllByRole('row')).toHaveLength(billingsData.length);
   });

   it('renders correct number of cells', () => {
      expect(screen.getAllByRole('cell')).toHaveLength(7 * billingsData.length);
   });
})