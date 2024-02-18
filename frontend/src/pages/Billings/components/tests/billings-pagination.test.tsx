import { render, screen } from '@/lib/test'
import BillingsPagination from '@/pages/Billings/components/billings-pagination';
import { billingsLinks } from '@/pages/Billings/components/tests/mocks/billings-links';

describe("BillingsTableData", () => {
   it('renders no items', () => {
      const { container } = render(<BillingsPagination links={[]} onHandleChange={vi.fn()} />);
      expect(container).toBeEmptyDOMElement();
   });

   it('render all items', () => {
      render(<BillingsPagination links={billingsLinks} onHandleChange={vi.fn()} />);

      expect(screen.getByLabelText(/Go to previous page/i)).toBeInTheDocument();
      expect(screen.getByText(/1/i)).toBeInTheDocument();
      expect(screen.getByText(/2/i)).toBeInTheDocument();
      expect(screen.getByText(/More pages/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to next page/i)).toBeInTheDocument();
   });

   it('calls onHandleChange', () => {
      const onHandleChange = vi.fn();
      render(<BillingsPagination links={billingsLinks} onHandleChange={onHandleChange} />);

      screen.getByText(/2/i).click();
      expect(onHandleChange).toHaveBeenCalled();
   });

   it("active link don't call onHandleChange", () => {
      const onHandleChange = vi.fn();
      render(<BillingsPagination links={billingsLinks} onHandleChange={onHandleChange} />);

      screen.getByText(/1/i).click();
      expect(onHandleChange).not.toHaveBeenCalled();
   });
})