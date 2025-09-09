// Update products with size information via API
const fetch = require('node-fetch');

async function updateProductSizes() {
  console.log('🔄 Updating products with size information via API...');

  try {
    // Sample size data
    const mensSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
    const womensSizes = ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'];
    const unisexSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];

    // Get all products
    const response = await fetch('http://localhost:3000/api/products?limit=100');
    const data = await response.json();
    const products = data.products;

    console.log(`Found ${products.length} products to update...`);

    for (const product of products) {
      let availableSizes;
      let sizeCategory;

      // Determine size category based on product data
      if (product.name.toLowerCase().includes('women') || 
          product.gender?.toLowerCase() === 'women') {
        sizeCategory = 'Women';
        availableSizes = womensSizes.slice(0, Math.floor(Math.random() * 5) + 6);
      } else if (product.name.toLowerCase().includes('men') || 
                 product.gender?.toLowerCase() === 'men') {
        sizeCategory = 'Men';
        availableSizes = mensSizes.slice(0, Math.floor(Math.random() * 6) + 7);
      } else {
        sizeCategory = 'Unisex';
        availableSizes = unisexSizes.slice(0, Math.floor(Math.random() * 5) + 6);
      }

      // Update via API - we'll need to update the API to handle size updates
      console.log(`✅ Would update ${product.name}: ${sizeCategory} sizes [${availableSizes.join(', ')}]`);
    }

    console.log('🎉 Product size analysis complete!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

updateProductSizes();