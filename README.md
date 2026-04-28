# Abone Eco Store

Full-stack eco-friendly e-commerce website built with Next.js App Router, Tailwind CSS, MongoDB and Cloudinary image uploads.

## Features

- Premium, minimal responsive storefront
- Product listing and product details pages
- WhatsApp-based product inquiry buttons with dynamic messages
- Admin login and protected dashboard
- Product CRUD with stock updates
- Cloudinary image upload API
- Toast notifications, loading states and error handling

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` from `.env.example` and fill values.

3. Run development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## WhatsApp format

Each product sends:

```text
Hello, I am interested in '{productName}' priced at ₹{price}. Please share more details.
Product URL: {productUrl}
```
