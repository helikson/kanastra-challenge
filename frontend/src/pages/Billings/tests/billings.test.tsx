import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { render, screen } from "@/lib/test";

describe("App", () => {
   beforeEach(() => {
      render(
         <MemoryRouter initialEntries={["/"]}>
            <App />
         </MemoryRouter>
      );
   });

   it('displays correct header', async () => {
      await vi.waitFor(() => expect(screen.getByText('Billings List')).toBeInTheDocument());
   });

   it('has correct number of items in header', async () => {
      await vi.waitFor(() => expect(screen.getByTestId('billings__header').childNodes).toHaveLength(7));
   });
});