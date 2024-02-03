import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { NavItem, NavList, NavLogo, NavRightSlot, Navbar } from "./navigation-bar";
import { FileUploader } from ".";

function Layout(): ReactElement {
  return (
    <div className="w-full h-screen bg-zinc-800 text-white">
      <Navbar>
        <NavLogo
          to="/"
          src="https://avatars.githubusercontent.com/u/96804932?s=200&v=4"
          alt="Kanastra Challenge"
        />

        <NavList>
          <NavItem to="/">
            Billings
          </NavItem>

          <NavItem to="/files-uploaded">
            Files uploaded
          </NavItem>
        </NavList>

        <NavRightSlot>
          <FileUploader />
        </NavRightSlot>
      </Navbar>

      <main className="flex h-[calc(100vh-4rem)] overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export { Layout };
