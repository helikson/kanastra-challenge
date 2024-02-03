import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import * as Components from './components'
import { FileProvider } from './components/ui/file';

const Billings = lazy(() => import('./pages/Billings'));
const FilesUploaded = lazy(() => import('./pages/FilesUploaded'));

function App() {
   return (
      <FileProvider>
         <Routes>
            <Route path="/" element={<Components.Layout />}>
               <Route
                  index
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
   )
}

export default App;