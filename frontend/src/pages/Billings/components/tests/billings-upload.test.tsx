import { FileProvider } from '@/components/file';
import { createBilling } from '@/data/create-billings';
import { render, screen, userEvent } from '@/lib/test'
import BillingsUpload from '@/pages/Billings/components/billings-upload';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/data/create-billings', () => ({
   createBilling: vi.fn(),
}));

describe("BillingsUpload", () => {
   beforeEach(async () => {
      const queryClient = new QueryClient();

      render(
         <QueryClientProvider client={queryClient}>
            <FileProvider>
               <BillingsUpload />
            </FileProvider>
         </QueryClientProvider>
      );

      const addButton = screen.getByText('Add');
      await userEvent.click(addButton);
   })

   it('dialog opens when "Add" button is clicked', () => {
      const dialogTitle = screen.getByText(/Add Billings/i);
      expect(dialogTitle).toBeInTheDocument();

      const description = screen.getByText(/Import CSV files with billings/i);
      expect(description).toBeInTheDocument();
   });

   it('form submits successfully with valid CSV file', async () => {
      const fileInput = screen.getByTestId("billings-upload__csv-file-input");
      expect(fileInput).toBeInTheDocument();

      const file = new File(['CSV content'], 'test.csv', { type: 'text/csv' });
      await userEvent.upload(fileInput, file);

      expect(fileInput).toHaveValue("C:\\fakepath\\test.csv");

      const confirmButton = screen.getByText('Confirm');
      await userEvent.click(confirmButton);

      expect(createBilling).toHaveBeenCalled();
   });

   it('form displays error with invalid CSV file', async () => {
      const fileInput = screen.getByTestId("billings-upload__csv-file-input");

      const file = new File(['Invalid content'], 'invalid.txt', { type: 'text/plain' });
      await userEvent.upload(fileInput, file);

      const confirmButton = screen.getByText('Confirm');
      await userEvent.click(confirmButton);

      expect(screen.getByText(/Error/i)).toBeInTheDocument();
   });

   it('dialog closes when "Cancel" button is clicked', async () => {
      const cancelButton = screen.getByText('Cancel');
      await userEvent.click(cancelButton);

      const dialogTitle = screen.queryByText(/Add Billings/i);
      expect(dialogTitle).toBeNull();
   });
})