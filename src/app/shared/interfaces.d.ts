declare interface ILineItem {
  item: string; 
  quantity: number; 
  pricePerUnit: number; 
  amount: number;
}

declare interface IPersonalInformation {
  name: string;
  address: string;
  phoneNumber: number | null;
  email: string;
}

declare interface IInvoice {
  seller: IPersonalInformation;
  buyer: IPersonalInformation;
  invoice_number: string;
  invoice_date: string;
  payment_due: string;
  lineItems: ILineItem [];
  subTotal: number;
  tax: number;
  fee: number;
  total: number;
  termsAndConditions: string;
}