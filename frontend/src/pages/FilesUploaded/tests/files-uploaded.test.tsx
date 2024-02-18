import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { render, screen } from "@/lib/test";
import { useFileContext } from "@/components/file";

vi.mock("@/components/file", () => ({
   FileProvider: vi.fn(({ children }) => children),
   useFileContext: () => ({
      state: {
         fileList: [
            { name: 'file1', type: 'txt', size: 100 },
            { name: 'file2', type: 'jpg', size: 200 }
         ]
      }
   })
}));

describe("App", () => {
   beforeEach(() => {
      render(
         <MemoryRouter initialEntries={["/files-uploaded"]}>
            <App />
         </MemoryRouter>
      );
   });

   it('displays correct header', async () => {
      await vi.waitFor(() => {
         expect(screen.getByText('Files Uploaded')).toBeInTheDocument()
      });
   });

   it('displays correct table headers', async () => {
      await vi.waitFor(() => {
         expect(screen.getByTestId('files-uploaded__head--row').childNodes).toHaveLength(3);
      });
   });

   it('displays correct number of rows in the table', async () => {
      await vi.waitFor(() => {
         const rows = screen.getAllByRole('row');
         expect(rows.length - 1).toBe(useFileContext().state.fileList.length);
      })
   });
});