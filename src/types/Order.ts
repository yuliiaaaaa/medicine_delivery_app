interface Order {
  id?: number;
  user_email: string;
  user_phone: string;
  user_address: string;
  total_price: string;
  order_date?: string;
  items: {
    medicine_id: number;
    quantity: number;
    subtotal: number;
    image_url: string;
    medicine_name: string;
    price: number;
  }[];
}
