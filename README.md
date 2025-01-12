# Product Manager

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [ER Diagram](#er-diagram)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Samonto-Karmaker/Product-Manager.git
    cd product-manager
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Environment Variables](#environment-variables) section for more details.

4. Start the development server:

    ```sh
    npm start
    ```

## Usage

To start the server in development mode:

```sh
npm start
```

To start the server in production mode:
```sh
npm run prod
```

The sample data for categories is provided in the `db/sampleCategoriesData.js` file. You can use this file to create category documents in MongoDB.

## API Endpoints
Here are the main API endpoints:

- Product Routes:

    ```http
    GET /api/v1/products - Get Products 
    (Filtering & search supported. Returns all product by default)
    ```
    ```http
    POST /api/v1/products - Create Product
    ```
    ```http
    PATCH /api/v1/products/:id - Update Product Details by id
    ```

- Health Check Routes:

    ```http
    GET /api/v1/health-check - Health Check endpoint
    ```

**Pagination and Sorting:**

For endpoints that support pagination and sorting, you can use the following query parameters:

- _page_: The page number to retrieve (default is `1`).
- _limit_: The number of items per page (default is `10`).

**Search & Filter:**

For endpoints related to searching, you can use the following query parameters:

- _category_: category name. 
- _name_: product name. (Full or Partial Match)

**Example:**

    ```http
    GET /api/v1/products?name=mi&category=books&page=1&limit=10
    ```

## Environment Variables

<table>
    <thead>
        <tr>
            <th>Variable</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>PORT</td>
            <td>The port number on which the server runs (e.g., 3000)</td>
        </tr>
        <tr>
            <td>CORS_ORIGIN</td>
            <td>Allowed origins for Cross-Origin Resource Sharing (CORS)</td>
        </tr>
        <tr>
            <td>MONGODB_CONNECTION_STRING</td>
            <td>The MongoDB connection URI</td>
        </tr>
        <tr>
            <td>NODE_ENV</td>
            <td>Defines the environment in which the app is running (e.g., development, production)</td>
        </tr>
    </tbody>
</table>

## ER Diagram

ER Diagram link: [Click Here](https://app.eraser.io/workspace/iDAova6PI1dh8UDXxSqi?origin=share)

Eraser is used to create the ER Diagram.

_Note: You don't need an account to view this diagram_