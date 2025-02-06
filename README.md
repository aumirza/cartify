# Cartify - Full Stack E-Commerce Application

Cartify is a modern full-stack e-commerce web application built with Next.js that provides a seamless shopping experience for users.

## Features

- [x] Product browsing and searching
- [x] Shopping cart functionality
- [x] Server-side rendering for better SEO
- [x] Admin dashboard for managing products and orders

## Tech Stack

- Next.js 15 (Full Stack Framework)
  - App Router for routing
  - Server Components
- Context API for state management
- Tailwind CSS for styling

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/cartify.git
cd cartify
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add:

4. Start the development server

```bash
npm run dev
```

## Project Structure

```bash
├── src/
│   ├── api/
│   ├── app/                # Next.js app directory
│   │   ├── (storefront)/      # Main shop routes
│   │   └── dashboard/        # Admin dashboard
│   ├── components/        #React Components
│   │   ├── ui/
│   │   ├── dashboard/
│   ├── config/
│   ├── context/          # Context API files
│   ├── hooks/
│   ├── lib/                  # Utility functions
│   └── types/
```

## Dashboard Features

The `/dashboard` route provides administrative features:

- Product management
- Order management
- User management
- Sales analytics

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
