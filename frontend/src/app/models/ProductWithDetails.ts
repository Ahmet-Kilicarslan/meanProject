export default interface ProductWithDetails {
  id: number;
  name: string;
  amount: number;
  price: number;
  supplier: number;
  supplier_name: string;
  imageUrl?: string;
}
