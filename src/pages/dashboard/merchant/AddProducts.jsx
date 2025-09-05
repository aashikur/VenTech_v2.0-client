import React from 'react';

const AddProducts = () => {
    return (
        <div>
            Add Product
        </div>
    );
};

export default AddProducts;

/*

Product Data Structure
{
  "_id": "string",                // Product unique ID (MongoDB ObjectId)
  "title": "string",               // Product name/title
  "description": "string",         // Product description
  "category": "string",            // Product category (e.g., Electronics, Apparel)
  "images": ["string"],            // Array of image URLs
  "retailPrice": 1200,             // Retail price (customer price)
  "merchantPrice": 900,            // Merchant price / resale price
  "quantity": 50,                  // Current stock quantity
  "stockStatus": "in-stock",       // "in-stock" | "out-of-stock"
  "merchantId": "string",          // ID of the merchant who owns this product
  "createdAt": "Date",             // Timestamp
  "updatedAt": "Date"              // Timestamp
}








// Example actions on product
{
  action: "increment" | "decrement" | "clear-stock",
  value: 10  // Only for increment/decrement
}
















Order Data Structure
{
  "_id": "string",               // Order ID
  "customerId": "string",        // User placing the order
  "products": [
    {
      "productId": "string",
      "title": "string",
      "quantity": 2,
      "price": 1200,             // Retail price at time of order
      "merchantPrice": 900       // Merchant price (optional)
    }
  ],
  "totalAmount": 2400,
  "status": "pending" | "shipped" | "delivered" | "cancelled",
  "orderedAt": "Date",
  "shippedAt": "Date",
  "deliveredAt": "Date"
}

















Category Structure (Optional)
{
  "categoryId": "string",
  "name": "string",
  "description": "string",
  "createdAt": "Date"
}














*/