import { MemoryRouter } from 'react-router-dom';
import { render, screen } from "@/lib/test";
import App from '@/App';

const RenderApp = ({ route }: { route: string }) => (
   <MemoryRouter initialEntries={[ route ]}>
      <App />
   </MemoryRouter>
)

describe("App", () => {
   it("No Match Route", () => {
      render(<RenderApp route="/any-route" />);
      expect(screen.getByText("Nothing to see here")).toBeInTheDocument();
   });

   it("Billings / Initial Route", async () => {
      render(<RenderApp route="/" />);

      expect(screen.getByTestId(/billings-skeleton/i)).toBeInTheDocument();

      await vi.waitFor(() => {
         expect(screen.getByText("Billings List")).toBeInTheDocument();
      });
   });

   it("Files Uploaded Route", async () => {
      render(<RenderApp route="/files-uploaded" />);

      expect(screen.getByTestId(/files-uploaded-skeleton/i)).toBeInTheDocument();

      await vi.waitFor(() => {
         expect(screen.getByText("Files Uploaded")).toBeInTheDocument();
      });
   });
});