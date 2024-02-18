import { createBilling } from '@/data/create-billings';

describe('create-billings', () => {
   beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue(new Response());
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('createBilling should create FormData with correct file data', () => {
      const mockFile = new File([new ArrayBuffer(0)], "test.csv", { type: "text/csv" });
      createBilling(mockFile);

      const formData = new FormData();
      formData.set("csv_file", mockFile, mockFile.name);

      expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_UPLOAD}`, {
         method: 'POST',
         body: formData,
      });
   });
})