import { saveFilesToStorage, getFilesFromStorage } from "@/components/file-storage";

describe('file-storage', () => {
   it('should save an empty array of files to storage', () => {
      saveFilesToStorage([]);
      expect(getFilesFromStorage()).toEqual([]);
   });

   it('should save an array of files with multiple files to storage', () => {
      saveFilesToStorage([
         new File(['file1 contents'], 'file1.txt', { type: 'text/csv', lastModified: Date.now() }),
         new File(['file2 contents'], 'file2.txt', { type: 'text/csv', lastModified: Date.now() }),
      ]);

      expect(getFilesFromStorage()).toEqual([
         new File([new ArrayBuffer(14)], 'file1.txt', { type: 'text/csv', lastModified: Date.now() }),
         new File([new ArrayBuffer(14)], 'file2.txt', { type: 'text/csv', lastModified: Date.now() })
      ]);
   });
});
