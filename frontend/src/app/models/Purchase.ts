export interface Purchase {
  id: number;
  userId: number;
  products: [];
  totalAmount: number;
  date: Date;
}

export interface purchasedProduct {
  id: number;
  purchaseId: number;
  productId: number;
  quantity: number;
  price: number;
}
