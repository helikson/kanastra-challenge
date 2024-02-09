import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from "@tanstack/react-query";

import * as Components from '@/components'
import { FileProvider } from '@/components/ui/file';
import { queryClient } from '@/lib/react-query';

const Initial = lazy(() => import('./pages/Initial'));
const Billings = lazy(() => import('./pages/Billings'));
const FilesUploaded = lazy(() => import('./pages/FilesUploaded'));

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <FileProvider>
            <Routes>
               <Route path="/" element={<Components.Layout />}>
                  <Route
                     index
                     element={
                        <Components.Suspense>
                           <Initial />
                        </Components.Suspense>
                     }
                  />

                  <Route
                     path="/billings"
                     element={
                        <Components.Suspense>
                           <Billings />
                        </Components.Suspense>
                     }
                  />

                  <Route
                     path="/files-uploaded"
                     element={
                        <Components.Suspense>
                           <FilesUploaded />
                        </Components.Suspense>
                     }
                  />

                  <Route path="*" element={<Components.NoMatch />} />
               </Route>
            </Routes>
         </FileProvider>
      </QueryClientProvider>
   )
}

export default App;