import mockData from './mockData.json';

type Customer = {
    customerEmail: string;
    customerId: string;
    customerName: string;
    customerLastName: string;
    customerPhoneNumber: string;
    customerLocale: string;
    elegibleCoupon: boolean;
    Coupon: string;
};

type Hub = {
  hubId: string;
  hubName: string;
  hubCode: string;
  hubAddress: string;
  hubAddressNumber: string;
  hubAddressLocationLatitude: number;
  hubAddressLocationLongitude: number;
};

type Products = {
  sourceId?: string;
  productCode: string;
  reservationType: string;
  id: string;
  productName: string;
  productDescription: string;
}[];

interface Order {
  id: string;
  businessCode: string;
  number: string;
  type: string;
  receptionType: string;
  status: string;
  requestedDate: string;
  scheduledDate: string | null;
  confirmedDate: string;
  channel: string;
  customer: Customer;
  hub: Hub;
  products: Products;
}

// A mock function to mimic making an async request for data
export function fetchData() {
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: mockData.content }), 500)
  );
}