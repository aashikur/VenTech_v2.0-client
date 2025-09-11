# 🛒 Multi-Vendor Platform

## 🚀 Live Site

* **Frontend:** [https://example-frontend.com/](https://example-frontend.com/)
* **API:** [https://example-backend.com/](https://example-backend.com/)

---

## 🌟 Project Overview

The **Multi-Vendor Platform** is a role-based e-commerce system where **customers, merchants, and admins** collaborate in a secure and interactive marketplace.
It supports product management, merchant approvals, order handling, stock control, live community chat, and blog publishing—all under one scalable solution.

---

## 🖼️ Key Features

* **Role-based Dashboard**

  * Customer, Merchant, Admin—each with their own dashboards and workflows
* **Merchant Approval Workflow**

  * Regular users can apply to become merchants → admin approval required
* **Product Management**

  * Merchants can add, update, clear stock, request other merchants’ products, and manage inventory
* **Orders & Checkout**

  * COD (Cash on Delivery) support with order status tracking
* **Community Chat & Reports**

  * Public/live chat, problem reporting without login
* **Blog System**

  * Admin can create/manage blogs visible to everyone
* **Authentication & Security**

  * User registration, merchant onboarding, admin control
* **Modern UI/UX**

  * Responsive, clean, and dashboard-driven

---

## 🗂️ File Structure (Key Folders)

<pre> ```bash
├── src
│   ├── assets
│   │   └── (images, logos, icons)
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ChatBox.jsx
│   │   └── BlogCard.jsx
│   ├── layouts
│   │   ├── RootLayout.jsx
│   │   ├── UserDashboardLayout.jsx
│   │   ├── MerchantDashboardLayout.jsx
│   │   └── AdminDashboardLayout.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Blogs.jsx
│   │   ├── BlogDetails.jsx
│   │   ├── Contact.jsx
│   │   ├── auth
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard
│   │   │   ├── user
│   │   │   │   └── MyOrders.jsx
│   │   │   ├── merchant
│   │   │   │   ├── MyProducts.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── StockManagement.jsx
│   │   │   │   └── ProductRequests.jsx
│   │   │   └── admin
│   │   │       ├── ManageUsers.jsx
│   │   │       ├── ManageMerchants.jsx
│   │   │       ├── ManageBlogs.jsx
│   │   │       └── Reports.jsx
│   ├── hooks
│   │   └── useAuth.js
│   ├── providers
│   │   └── AuthProvider.jsx
│   ├── firebase
│   │   └── firebase.config.js
│   ├── utils
│   │   └── helpers.js
│   └── main.jsx
```</pre>

---

## 🔑 How to Use

* **Home & Products**

  * Browse categories, search products, view details (price, stock, merchant info)
* **Customer Dashboard**

  * View My Orders, track COD orders & statuses
* **Merchant Dashboard**

  * Add, edit, clear, or restock products
  * Request products from other merchants
  * Manage incoming requests & track sales
* **Admin Dashboard**

  * Approve/reject merchant requests
  * Manage blogs, users, and reported problems

---

## 📝 Main Pages & Routes

* `/` - Home
* `/products` - Product listing (categories, filters, search)
* `/products/:id` - Product details
* `/blogs` - Blog list (public)
* `/blogs/:id` - Blog details
* `/contact` - Contact & problem report (no login required)
* `/chat` - Community chat (public + live chat for logged-in users)
* `/dashboard/user/my-orders` - Customer dashboard
* `/dashboard/merchant/my-products` - Merchant dashboard
* `/dashboard/admin/manage-merchants` - Admin dashboard

---

## 🔐 Authentication

* User registration & login
* Regular users can apply to become merchants (requires admin approval)
* Merchants must submit shop details (name, license, etc.)
* JWT-based API security
* Admin-only features: role management, approval, blog & report handling

---

## 💡 Technologies Used

* **Frontend:** React, Vite, Tailwind CSS, DaisyUI
* **Backend:** Node.js, Express, MongoDB
* **Auth:** Firebase Auth + JWT
* **Realtime:** Socket.io (for chat)
* **Payments (optional):** Stripe / COD support
* **Other Tools:** Axios, React Query

---

## 🛠️ How to Run Locally

```bash
# Clone repository
git clone https://github.com/your-username/multivendor-platform.git

# Navigate to directory
cd multivendor-platform

# Install dependencies
npm install

# Create .env file (Firebase, MongoDB, JWT secrets)

# Start frontend
npm run dev

# Start backend
npm start
```

