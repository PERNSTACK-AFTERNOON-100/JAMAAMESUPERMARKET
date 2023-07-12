-- CreateTable
CREATE TABLE "Products" (
    "ProductID" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "orderItems" (
    "orderItemId" SERIAL NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Price" DECIMAL(65,30) NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "OrderID" INTEGER NOT NULL,

    CONSTRAINT "orderItems_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "Customers" (
    "CustomerID" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "OrderID" SERIAL NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalAmount" INTEGER NOT NULL,
    "OrderStatus" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "CustomerID" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "Emplooyee" (
    "EmployeeID" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emplooyee_pkey" PRIMARY KEY ("EmployeeID")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "SupplierID" SERIAL NOT NULL,
    "SupplierName" TEXT NOT NULL,
    "ContactName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("SupplierID")
);

-- CreateTable
CREATE TABLE "ProductSuppliers" (
    "ProductSupplierID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "SupplierID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSuppliers_pkey" PRIMARY KEY ("ProductSupplierID")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "TransactionID" SERIAL NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PaymentMethod" TEXT NOT NULL,
    "TotalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateTable
CREATE TABLE "TransactionItems" (
    "TransactionItemID" SERIAL NOT NULL,
    "TransactionID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Price" DECIMAL(65,30) NOT NULL,
    "productsProductID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionItems_pkey" PRIMARY KEY ("TransactionItemID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_Email_key" ON "Customers"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_PhoneNumber_key" ON "Customers"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Emplooyee_Email_key" ON "Emplooyee"("Email");

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Customers"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSuppliers" ADD CONSTRAINT "ProductSuppliers_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier"("SupplierID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSuppliers" ADD CONSTRAINT "ProductSuppliers_ProductSupplierID_fkey" FOREIGN KEY ("ProductSupplierID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_TransactionItemID_fkey" FOREIGN KEY ("TransactionItemID") REFERENCES "Transactions"("TransactionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_productsProductID_fkey" FOREIGN KEY ("productsProductID") REFERENCES "Products"("ProductID") ON DELETE SET NULL ON UPDATE CASCADE;
