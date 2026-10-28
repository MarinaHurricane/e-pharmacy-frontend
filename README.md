
<div align="center">

# 💊 E-Pharmacy

### Full-Stack Online Pharmacy — Frontend

A responsive e-commerce application built with Next.js, React and TypeScript, covering the customer journey from browsing medicines to checkout and order processing.

**[🌐 Live Demo](https://e-pharmacy-frontend-lime.vercel.app/) · [⚙️ Backend Repository](https://github.com/MarinaHurricane/e-pharmacy-backend)**

</div>

---

## 📖 About the Project

E-Pharmacy is a full-stack e-commerce application designed to provide an intuitive online shopping experience for pharmacy products.

The frontend combines reusable UI components, API-driven product data, authentication, persistent shopping cart functionality and checkout workflows.

The project focuses on connecting a responsive interface with real backend operations, including user sessions, product availability, order creation and inventory updates.

## ✨ Features

### 🛍️ Product Discovery
- Browse the medicine catalogue
- Search for products and filter by category
- Navigate paginated product listings
- View product details and reviews
- Responsive layouts for mobile, tablet and desktop

### 🔐 Authentication
- User registration and login
- Protected user functionality
- Session-based authentication using HTTP-only cookies
- Session refresh and authenticated API requests
- Form validation and error feedback

### 🛒 Shopping Cart
- Add products to the cart
- Update quantities and remove products
- Persistent cart state
- Synchronisation between frontend state and backend data
- Cart totals and checkout preparation

### 📦 Checkout & Orders
- Checkout forms with validation
- Shipping and payment option selection
- Order submission through the backend API
- Stock availability checks
- Inventory updates handled by the backend
- UI updates following successful mutations

### ⚡ User Experience
- Reusable React components
- Responsive and interactive interfaces
- Loading, error and empty states
- Toast notifications for user feedback
- Form handling and validation
- Server-data caching and cache invalidation

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js, React |
| Language | TypeScript, JavaScript |
| Styling | CSS, CSS Modules |
| Server State | TanStack Query (React Query) |
| Client State | Redux Toolkit, Redux Persist |
| Forms | React Hook Form, Yup |
| HTTP Client | Axios |
| UI Utilities | React Hot Toast, React Select, React Responsive |
| Development Tools | Git, GitHub, ESLint, Prettier |
| Deployment | Vercel |

**Backend:** Node.js, Express.js, PostgreSQL and Prisma.

---

## 🏗️ Architecture

The application uses Next.js for the frontend and communicates with a separate REST API built with Node.js and Express.

```text
                 User / Browser
                       |
                       v
             Next.js Application
                (Vercel)
                       |
             React UI Components
                       |
          +------------+------------+
          |                         |
          v                         v
    TanStack Query             Redux Toolkit
    Server Data                Client State
          |                         |
          +------------+------------+
                       |
                       v
              Next.js API Proxy
                 /api/[...path]
                       |
                       v
              Express REST API
                 (Render)
                       |
                       v
                PostgreSQL
                   Prisma
```

### Data and State Management

**TanStack Query** manages asynchronous server data, including API requests, caching, loading and error states, and cache invalidation after mutations.

**Redux Toolkit** manages client-side application state, including shopping cart interactions, with Redux Persist providing persistence where required.

### API Integration

The frontend communicates with the backend through a Next.js catch-all API route.

This proxy forwards HTTP requests, query parameters and relevant cookies to the Express backend, then passes the backend response and authentication cookies back to the browser.

This approach was particularly important when connecting the Vercel-hosted frontend to the separately deployed backend on Render.

### Forms and Validation

React Hook Form and Yup are used to manage form inputs, validation rules and user-facing error messages.

---

## 🔧 Technical Highlights

Some of the key development challenges and implementation decisions included:

- Integrating a Next.js frontend with a separately deployed Express REST API
- Handling authentication and session refresh across frontend and backend services
- Forwarding HTTP-only authentication cookies through a Next.js API proxy
- Separating server state from client-side application state
- Keeping cart and product information synchronised after mutations
- Connecting checkout workflows to stock validation and order processing
- Debugging production API routing, environment configuration and integration issues

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A running instance of the E-Pharmacy backend
- A configured PostgreSQL database for the backend

### 1. Clone the repository

```bash
git clone https://github.com/MarinaHurricane/e-pharmacy-frontend.git
cd e-pharmacy-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
API_URL=your_backend_api_url
```

Set `API_URL` to the address of your running Express backend.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## ☁️ Deployment

The application is deployed across two services:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** PostgreSQL, accessed through Prisma on the backend

The frontend uses a Next.js API proxy to communicate with the backend while supporting cookie-based authentication.

**[View Live Application](https://e-pharmacy-frontend-lime.vercel.app/)**

---

## 🔗 Related Repository

The backend contains the REST API, authentication and session management, database models, cart and order logic, and inventory operations.

**[E-Pharmacy Backend](https://github.com/MarinaHurricane/e-pharmacy-backend)**

---

## 👩‍💻 Author

**Maryna Ishchenko**

[GitHub Profile](https://github.com/MarinaHurricane)

