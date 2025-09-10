export  class Purchase {
    constructor(id,userId,products,totalAmount,date) {
        this.id = id;
        this.userId = userId;//foreign key for user
        this.products = products;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}
export  class PurchasedProduct  {
    constructor(id,purchaseId,productId,quantity,price) {
        this.id = id;
        this.purchaseId = purchaseId;//foreign key for purchase
        this.productId = productId;//foreign key for product
        this.quantity = quantity;
        this.price = price;

    }/*



    project-root/
│
├── package.json          # Node.js project metadata and dependencies
├── package-lock.json     # Auto-generated lock file
├── server.js             # Entry point of the Node.js app
│
├── models/               # Define objects and data structures
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── dao/                  # Data Access Objects: handle SQL/database operations
│   ├── userDao.js
│   ├── productDao.js
│   └── orderDao.js
│
├── routes/               # Express.js routes for communicating backend ↔ frontend
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
│
└── config/               # Configuration files (DB connection, environment variables)
    └── db.js










    */
}