import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export { Layout };
