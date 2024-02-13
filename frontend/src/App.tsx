import { Suspense, lazy, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from "@tanstack/react-query";

import * as Components from '@/components'
import { FileProvider } from '@/components/file';
import { queryClient } from '@/lib/react-query';
import BillingsSkeleton from '@/pages/Billings/billings-skeleton';

const Billings = lazy(() => import('@/pages/Billings'));

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <FileProvider>
            <Routes>
               <Route path="/" element={<Components.Layout />}>
                  <Route
                     index
                     element={
                        <Suspense fallback={<BillingsSkeleton />}>
                           <Billings />
                        </Suspense>
                     }
                  />

                  <Route path="*" element={<Components.NoMatch />} />
               </Route>
            </Routes>
         </FileProvider>
      </QueryClientProvider>
   )
}

export default memo(App);