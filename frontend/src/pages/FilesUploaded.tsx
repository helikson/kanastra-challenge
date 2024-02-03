import { memo } from 'react';
import * as Components from '@/components'
import { useFileContext } from '@/components/ui/file';

function FilesUploaded() {
   const { state: { fileList } } = useFileContext();

   if ((fileList || []).length === 0) {
      return (
         <p className="h-full w-full flex items-center justify-center">
            No Data
         </p>
      );
   }

   return (
      <Components.Table>
         <Components.TableCaption>
            Files Uploaded
         </Components.TableCaption>

         <Components.TableHeader>
            <Components.TableRow>
               <Components.TableHead>Name</Components.TableHead>
               <Components.TableHead>File Date</Components.TableHead>
            </Components.TableRow>
         </Components.TableHeader>

         <Components.TableBody>
            {fileList.map((file) => (
               <Components.TableRow key={file.lastModified}>
                  <Components.TableCell>{file.name}</Components.TableCell>
                  <Components.TableCell>{new Date(file.lastModified).toLocaleString()}</Components.TableCell>
               </Components.TableRow>
            ))}
         </Components.TableBody>

         <Components.TableFooter>
            <Components.TableRow>
               <Components.TableHead colSpan={6} className="text-right space-x-12">
                  <Components.TablePagination
                     from={1}
                     to={fileList.length}
                     total={fileList.length}
                     hasPreviousPage={false}
                     hasNextPage={false}
                  />
               </Components.TableHead>
            </Components.TableRow>
         </Components.TableFooter>
      </Components.Table>
   )
}

export default memo(FilesUploaded);