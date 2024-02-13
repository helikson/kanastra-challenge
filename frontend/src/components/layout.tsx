import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

function Layout(): ReactElement {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  )
}

export { Layout };