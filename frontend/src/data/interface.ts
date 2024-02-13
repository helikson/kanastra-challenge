interface IGetBillingsResponse {
  data: Array<IBillings> | null,
  links: Array<IBillingsLink> | null
}

interface IBillings {
  id?: number;
  name: string;
  governmentId: string;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: string;
}

interface IBillingsLink {
  url: string | null;
  label: string;
  active: boolean;
}