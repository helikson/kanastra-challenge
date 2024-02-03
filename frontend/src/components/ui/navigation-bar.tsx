import * as React from "react"

import { cn } from "@/lib/utils"
import { NavLink, NavLinkProps } from "react-router-dom"

const Navbar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      "bg-gray-900",
      "w-full z-20 top-0 start-0",
      "border-b border-gray-600",
      className
    )}
    {...props}
  >
    <div className="flex flex-wrap items-center justify-between mx-auto p-4">
      {props.children}
    </div>
  </nav>
))
Navbar.displayName = "Navbar"

interface INavLogo extends React.ImgHTMLAttributes<HTMLImageElement> {
  to: string
}

const NavLogo = React.forwardRef<
  HTMLImageElement,
  INavLogo
>(({ className, ...props }, ref) => (
  <NavLink
    to={props.to}
    className="flex items-center space-x-3 rtl:space-x-reverse"
  >
    <img
      ref={ref}
      className={cn("h-8", className)}
      {...props}
    />
  </NavLink>
))
NavLogo.displayName = "NavLogo"

const NavList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "bg-gray-900",
      "flex flex-col flex-row",
      "space-x-8 p-0 mt-0",
      "font-medium",
      className
    )}
    {...props}
  />
))
NavList.displayName = "NavList"

const NavItem = React.forwardRef<
  HTMLAnchorElement,
  NavLinkProps
>(({ className, ...props }, ref) =>  {
  const getClassName = React.useCallback(({ isActive }: { isActive: boolean }) =>
    cn(
      "block py-2 px-3 text-white rounded bg-transparent p-0",
      isActive
        ? "text-slate-100"
        : "text-slate-400 dark:text-slate-500",
      className
    ), [className]);

  return (
    <li>
      <NavLink
        ref={ref}
        className={getClassName}
        {...props}
      />
    </li>
  );
})
NavItem.displayName = "NavItem"

const NavRightSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex md:order-2",
      "space-x-3 md:space-x-0 rtl:space-x-reverse",
      className
    )}
    {...props}
  />
))
NavRightSlot.displayName = "NavRightSlot"

export { Navbar, NavLogo, NavList, NavItem, NavRightSlot }
