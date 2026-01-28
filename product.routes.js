const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

// handle get request for path /products/id/:id - NEW ROUTE
router.get('/products/id/:id', (request, response) => {
   const { id } = request.params; // Access the ID parameter from the URL

   // Find the product by ID. Note: products.id is a number, but request.params.id is a string, so we use parseInt
   const product = products.find(p => p.id === parseInt(id, 10));

   if (product) {
       response.json(product); // Send the found product
   } else {
       // If no product is found, respond with 404 Not Found
       response.status(404).send(`Product with ID ${id} not found`);
   }
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});


module.exports = router;