import { getBillings } from '@/data/get-billings';

describe('create-billings', () => {
   it('getBillings - successful fetch', async () => {
      vi.spyOn(global, 'fetch')
         .mockResolvedValue(
            new Response(JSON.stringify({ data: [], links: [] }))
         );

      const result = await getBillings('?page=1');
      expect(result).toEqual({ data: [], links: [] });
   });

   it('getBillings - failed fetch', async () => {
      vi.spyOn(global, 'fetch')
         .mockResolvedValue(
            new Response(null, { status: 404 })
         );

      const result = await getBillings('?page=1');
      expect(result).toBeNull();
   });
})
