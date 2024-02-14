import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import * as Components from "@/components";
import { FileProvider } from "@/components/file";

function Layout(): ReactElement {
  return (
    <Components.ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FileProvider>
        <Components.PageHeader />

        <main className="h-[calc(100vh-4rem)] overflow-auto">
          <Outlet />
        </main>
      </FileProvider>
    </Components.ThemeProvider>
  )
}

export { Layout };