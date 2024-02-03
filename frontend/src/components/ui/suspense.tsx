import React from 'react';

function Suspense({ children }: any) {
   return (
      <React.Suspense
         fallback={
            <div>Loading...</div>
         }
      >
         {children}
      </React.Suspense>
   )
}

export { Suspense };