# Outside the Box - E-commerce Website

## Introduction

For my final university degree project, I developed an e-commerce 
platform emphasizing essential functionality. This project serves 
as a practical demonstration of key e-commerce features, showcasing 
the application of skills acquired throughout the course. It has 
been an opportunity for me to learn new technologies and gain insights 
into fundamental web development practices.

## Technologies Used

**Backend (Server-Side):**
- Node.js
- Express.js
- Mongoose
- Bcryptjs
- Jsonwebtoken
- Cloudinary
- Dotenv

**Frontend (Client-Side):**
- React
- React Router Dom
- Redux
- React Redux
- @reduxjs/toolkit
- Ant Design (antd)
- Axios
- Moment.js
- Web Vitals
- Tailwind CSS

## Features

- **User Roles:**
  - Buyers: Shop for products, manage cart, view purchase history.
  - Admins: Add/edit products, manage sales history, and user list.

- **Shop Functionality:**
  - Browse, filter, and search for products.
  - View detailed product information.
  - Add products to the shopping cart.

- **User Profiles:**
  - Manage shopping cart.
  - Complete purchases.
  - View past purchase history.

- **Admin Functionalities:**
  - Product management (add/edit).
  - Sales history tracking.
  - User management (block users).


## Installation

1. **Clone the Repository:**
   - Download the project files from the GitHub repository.

2. **Setup Environment Variables:**
   - Create a `.env` file in the root folder.
   - Add the following environment variables to the `.env` file:
     - `MONGO_URL`: Your MongoDB connection URL.
     - `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication.
     - `CLOUD_NAME`: Cloudinary account name.
     - `CLOUD_API_KEY`: Cloudinary API key.
     - `CLOUD_API_SECRET`: Cloudinary API secret.

3. **Install Server Dependencies:**
   - Open a terminal in the `server` folder.
   - Run the command: `npm install`

4. **Install Client Dependencies:**
   - Open a terminal in the `client` folder.
   - Run the command: `npm install`

5. **Build the Client:**
   - In the `client` folder, run the command: `npm run build`

6. **Run the Server:**
   - In the `server` folder, run the command: `npx nodemon server/server`

7. **Run the Client:**
   - In the `client` folder, run the command: `npm start`

## Usage

### Buyers:

1. **Shop Functionality:**
   - Browse products, filter, and search for items.
   - View the product-specific information page.
   - Choose the desired quantity of products to add to the cart.

2. **Profile Page:**
   - Navigate to the profile page.
   - View and manage the shopping cart.
   - Complete the purchase of selected items.
   - View the history of past purchases in the store.

### Admins:

1. **Product Management:**
   - Add and edit products.
   - Include pictures and necessary details for each product using the edit button.
   - Choose the status of the product (online or inactive).

2. **Sales History:**
   - View the history of all sales on the online store.

3. **User Management:**
   - Access the complete list of users (buyers).
   - Review and monitor user activity on the platform.
   - Take necessary actions, including blocking users, to ensure a secure and positive user experience.
     

### Online Render:
[Check out the online render of the project](https://ecommerce-website-7ps9.onrender.com)

Feel free to explore the website's functionality without needing a local setup.

### Admin Access (For Testing Only):
- Email: `Michael@gmail.com`
- Password: `123qwe123qwe`

**Note:** These credentials are provided for testing purposes only. Use them to explore admin functionalities. 

## Screenshots

1. **Home Page:**
   ![Home Page](https://imgur.com/VMtf8ZF)

2. **Product Catalog:**
   ![Product Info](https://imgur.com/VMtf8ZF)

3. **Product Details Page:**
   ![Admin's Panel](https://imgur.com/VMtf8ZF)


---
