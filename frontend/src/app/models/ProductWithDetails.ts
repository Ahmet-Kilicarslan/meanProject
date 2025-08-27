export default interface ProductWithDetails {
  id: number;
  name: string;
  amount: number;
  price: number;
  supplier: number;
  supplierName: string;
  imageUrl?: string;
}
