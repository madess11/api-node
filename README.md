# Blog API

## Features

- User registration and login
- CRUD operations for blog posts
- Add, update, and delete comments on posts
- Like and unlike posts
- JWT authentication
- API documentation using Swagger

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:madess11/api-node.git
   cd api-node

2. Installation:

   ```bash
      npm install
      cd blog-api
3. Create a `.env` file in the root directory with the following content:

   ```bash
   MONGO_URI=mongodb://localhost:27017/blog_db
   JWT_SECRET=jwt_secret
   PORT=3000
4. Start the dev server:

   ```bash
      npm run dev
