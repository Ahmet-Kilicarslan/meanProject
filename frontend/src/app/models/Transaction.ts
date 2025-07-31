export default interface Transaction {
  id: number;
  Product_id: number;
  Client_id: number;
  Employee_id: number;
  Action:string;
  Amount: number;
  date:Date;
}
