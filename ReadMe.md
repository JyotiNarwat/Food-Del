The Food-Del platform is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for online food ordering, catalog management, and administrative order tracking. The system architecture is divided into three distinct workspaces: a customer-facing single-page application (frontend/), an administrative dashboard (admin/), and a RESTful backend API (backend/).

Sources: frontend/index.html:1-14 
frontend/index.html
 admin/index.html:1-13 
admin/index.html

System Architecture & Data Flow
The client applications (frontend/ and admin/) communicate with the backend/ Express server via HTTP/REST endpoints. The backend utilizes Mongoose to interface with MongoDB for data persistence, managing user authentication via JSON Web Tokens (JWT), image storage via multer, and order processing.


Workspaces Overview
The repository is structured into modular workspaces, each configured with Vite for fast bundling and hot module replacement (HMR).

Frontend Customer App (frontend/): Provides the user interface for browsing the catalog, managing items in the cart, executing authentication, and placing orders.
Admin Dashboard (admin/): Provides interfaces for adding food items, viewing item lists, and managing customer orders.
Backend API (backend/): Serves Express routes, manages Mongoose schemas, handles static file uploads, and processes API requests.


FRONTEND EXPLANATION

The frontend folder is the customer-facing React + Vite single-page app of the Food-Del platform — it lets users browse the menu, manage a cart, authenticate, and place orders against the Express backend at http://localhost:4000. 

Entry Point & App Shell
index.html mounts the app at #root via /src/main.jsx.
src/main.jsx wraps App in BrowserRouter and StoreContextProvider, so routing and global state are available everywhere.
src/App.jsx defines the layout (Navbar, Footer, LoginPopup modal) and four routes: / (Home), /cart, /order, /verify.
Global State — src/context/
StoreContext.jsx is the central store. It holds food_list (fetched from /api/food/list), cartItems (a {itemId: quantity} map), the JWT token, and exposes addToCart, removeFromCart, getTotalCartAmount. Cart changes sync to the backend (/api/cart/add, /remove, /get) when a token exists, and on load it restores the token and cart from localStorage. StoreContext.jsx:5-29 StoreContext.jsx:59-78

Pages — src/pages/
Page	Role
Home/Home.jsx	Composes Header, Exploremenu, FoodDisplay, AppDownload; owns the category filter state. 
Cart/Cart.jsx	Lists cart items, computes totals (+$2 delivery fee), proceeds to /order. 
Placeorder/Placeorder.jsx	Delivery-info form; builds orderData and POSTs to /api/order/place, then redirects to /verify. 
Verify/Verify.jsx	Reads success/orderId query params, POSTs to /api/order/verify, navigates accordingly. 
Components — src/components/
Navbar: logo, menu links, cart icon with a "dot" badge when getTotalCartAmount() > 0, and either a Sign-in button or a profile dropdown (Orders/Logout) depending on token.
Header: hero banner with "View Menu" CTA. 
Exploremenu: horizontal category list from menu_list; clicking toggles category between the name and "all". 
FoodDisplay / FoodItem: FoodDisplay filters food_list by category and renders FoodItem cards; each card shows an add icon or a +/− counter wired to addToCart/removeFromCart, loading images from http://localhost:4000/uploads/. 
LoginPopup: toggles between "Login" and "Sign Up", POSTs to /api/user/login or /api/user/register, stores the returned JWT in localStorage. LoginPopup.jsx:22-50
Footer / AppDownload: static branding, links, contact info, and store badges.

Assets & Config
src/assets/assets.js imports all images/icons and exports the assets object plus menu_list and a static food_list fallback.
vite.config.js is minimal (just the React plugin); package.json scripts are dev, build, lint, preview, with deps on react, react-router-dom, and axios.


BACKEND FOLDER

The backend/ folder is the Node.js + Express + MongoDB (Mongoose) REST API for Food-Del, running on port 4000. It handles food catalog management, JWT auth, cart persistence, and order placement/verification for both the frontend/ and admin/ apps.

Entry Point — server.js
server.js creates the Express app, applies express.json(), express.urlencoded(), and cors(), calls connectDb(), serves the uploads/ directory statically at /uploads, and mounts four routers under /api/food, /api/user, /api/cart, /api/order.

Database — config/db.js
connectDb() connects Mongoose to a MongoDB Atlas cluster, database food-del.

Models — models/
Model	Fields
foodModel (foodmodel.js)	name, description, price, image, category 
userModel (userModel.js)	name, email (unique), password, cartData object — the cart lives embedded on the user doc 
orderModel (orderModel.js)	userId, items, amount, address, status (default "Food Processing"), payment (default false) 
Routes & Controllers
Food (routes/foodRoutes.js → controllers/foodController.js): POST /add uses multer disk storage to save images into uploads/ with a timestamped filename; GET /list returns all foods; POST /remove deletes the DB doc and unlinks the image file.
User (routes/userRoutes.js → controllers/userController.js): POST /register validates email via validator, enforces 8+ char passwords, hashes with bcrypt, and returns a JWT; POST /login compares the bcrypt hash and returns a token signed with process.env.JWT_SECRET.
Cart (routes/cartRoutes.js → controllers/cartController.js): POST /add, /remove, /get — all behind authMiddleware — mutate the cartData map on the user document.
Order (routes/orderRoutes.js → controllers/orderController.js): POST /place saves the order, clears the user's cartData, builds Stripe-style line_items (INR, with a delivery-charge line), and returns a success_url pointing at the frontend /verify page; POST /verify marks payment:true or deletes the order; GET /list returns all orders for the admin panel.
Middleware — middleware/auth.js
authMiddleware reads token from request headers, verifies it with jwt.verify, and injects req.body.userId — which is how cart and order controllers know which user is calling.

Config — package.json
ESM project ("type": "module"), single script npm run server → nodemon server.js. Deps: express, mongoose, bcrypt, jsonwebtoken, multer, cors, dotenv, validator, stripe (imported but commented out in the order controller).

***ADMIN FOLDER***

The admin/ folder is a standalone React + Vite dashboard app for store managers — it lets admins add food items (with image upload), view/remove catalog items, and track customer orders, all against the same backend at http://localhost:4000. 

Entry Point & Shell
index.html mounts at #root via /src/main.jsx, which wraps App in BrowserRouter — note there's no context provider here, unlike the customer frontend. 
src/App.jsx renders ToastContainer (react-toastify notifications), Navbar, and a split layout: Sidebar on the left, routed page content on the right. Three routes: /add, /list, /orders.
Components — src/components/
Navbar: minimal header with just the logo and a profile avatar image.
Sidebar: three NavLinks (Add Items, List Items, Orders) that auto-highlight via the .active class; labels hide below 900px width.
Pages — src/pages/
Page	Role
Add/Add.jsx	Controlled form (name, description, price, category dropdown) + image file picker with preview via URL.createObjectURL. Submits as multipart/form-data to POST /api/food/add, resets the form and toasts on success. 
List/List.jsx	Fetches GET /api/food/list on mount, renders a table (image from ${url}/uploads/, name, category, price), and X triggers POST /api/food/remove then re-fetches.
Orders/Orders.jsx	Fetches GET /api/order/list on mount and renders each order's items as "name x quantity" strings with a parcel icon. 
Assets & Config
src/assets/assets.js exports the assets icon set (logo, add_icon, order_icon, upload_area, parcel_icon, profile_image) plus a shared url = 'http://localhost:4000'. 
package.json: same Vite/React stack as frontend/, plus react-toastify for notifications; scripts are dev, build, lint, preview. 
src/index.css defines the global layout helpers: .app-content flex row, .flex-col, Outfit font.