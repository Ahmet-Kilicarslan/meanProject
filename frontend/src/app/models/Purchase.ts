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

export interface PurchasedProductWithDetails extends purchasedProduct {
  productName: string;
  stockAmount: number;
  currentPrice: number;
  originalProductId: number;
}
