interface Billing {
   name: string;
   governmentId: string;
   email: string;
   debtAmount: number;
   debtDueDate: string;
   debtId: string;
}

interface ServiceData {
   data: Array<Billing>

   from: number
   to: number
   total: number

   first_page_url: string
   prev_page_url: string
   next_page_url: string
   last_page_url: string
}