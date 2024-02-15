import { NoMatch } from "@/components";
import { render, screen } from "@/lib/test";

describe("NoMatch", () => {
   it("renders", () => {
      render(<NoMatch />);
      expect(screen.getByText("Nothing to see here")).toBeInTheDocument();
   });
});
