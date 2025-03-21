export type PaymentItem = {
  id: number;
  payment_id: number;
  beer_id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export type Payment = {
  id: number;
  date_created: string;
  total_amount: number;
  items: PaymentItem[];
};
