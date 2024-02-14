import { NavLink } from 'react-router-dom';
import * as Components from '@/components';
import { cn } from '@/lib/utils';

function PageHeader() {
   const routesClassName = ({ isActive }: { isActive: boolean }): string =>
      cn(
         "block py-2 px-3 rounded bg-transparent p-0",
         isActive
            ? "text-zinc-900 dark:text-zinc-50"
            : "text-zinc-400 dark:text-zinc-500",
      )

   return (
      <header className="flex flex-row justify-between">
         <nav
            className={cn(
               "bg-zinc-200/50 dark:bg-zinc-900",
               "w-full z-20 top-0 start-0",
               "border-b border-zinc-300 dark:border-zinc-600",
            )}
         >
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
               <NavLink
                  to="/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
               >
                  <img
                     className="h-8"
                     src="https://avatars.githubusercontent.com/u/96804932?s=200&v=4"
                  />
               </NavLink>

               <ul
                  className={cn(
                     "flex flex-row",
                     "space-x-8 p-0 mt-0",
                     "font-medium",
                  )}
               >
                  <li>
                     <NavLink to="/" className={routesClassName}>
                        Billings List
                     </NavLink>
                  </li>

                  <li>
                     <NavLink to="/files-uploaded" className={routesClassName}>
                        Files Uploaded
                     </NavLink>
                  </li>
               </ul>

               <div
                  className={cn(
                     "flex md:order-2",
                     "space-x-3 md:space-x-0 rtl:space-x-reverse",
                  )}
               >
                  <Components.ModeToggle />
               </div>
            </div>
         </nav>
      </header>
   )
}

export { PageHeader };