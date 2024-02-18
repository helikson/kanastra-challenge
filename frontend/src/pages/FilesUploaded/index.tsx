import * as Components from "@/components";
import { useFileContext } from "@/components/file";

function FilesUploaded() {
   const { state: { fileList } } = useFileContext();

   return (
      <div className="mx-auto space-y-4 p-6">
         <h1 className="text-3xl font-bold">
            Files Uploaded
         </h1>

         <div className="rounded-lg border p-2">
            <Components.Table>
               <Components.TableCaption>
                  Files uploaded
               </Components.TableCaption>

               <Components.TableHeader>
                  <Components.TableRow data-testid="files-uploaded__head--row">
                     <Components.TableHead>Name</Components.TableHead>
                     <Components.TableHead>Type</Components.TableHead>
                     <Components.TableHead>Size</Components.TableHead>
                  </Components.TableRow>
               </Components.TableHeader>

               <Components.TableBody>
                  {fileList?.map((file, index) => (
                     <Components.TableRow key={`file-${file.name}-${file.lastModified}-${index}`}>
                        <Components.TableCell>{file.name}</Components.TableCell>
                        <Components.TableCell>{file.type}</Components.TableCell>
                        <Components.TableCell>{file.size}</Components.TableCell>
                     </Components.TableRow>
                  ))}
               </Components.TableBody>
            </Components.Table>
         </div>
      </div>
   )
}

export default FilesUploaded;