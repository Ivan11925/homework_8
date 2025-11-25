document.addEventListener("DOMContentLoaded", () => {
  const productData = [
    {
      name: "Product 1",
      price: "$10.00",
      description: "Description for product 1.",
    },
    {
      name: "Product 2",
      price: "$20.00",
      description: "Description for product 2.",
    },
    {
      name: "Another Product",
      price: "$15.00",
      description: "Description for another product.",
    },
  ];

  fetch("src/template.hbs")
    .then((response) => response.text())
    .then((templateSource) => {
      const template = Handlebars.compile(templateSource);

      const productListContainer = document.getElementById(
        "productListContainer"
      );
      const searchInput = document.getElementById("productSearch");

      function renderProducts(filteredProducts) {
        if (filteredProducts.length === 0) {
          productListContainer.innerHTML = "<p>No products found.</p>";
          return;
        }
        const html = template({ products: filteredProducts });
        productListContainer.innerHTML = html;
      }

      function filterProducts(searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        return productData.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerSearch) ||
            product.description.toLowerCase().includes(lowerSearch)
        );
      }

      searchInput.addEventListener("input", () => {
        const filtered = filterProducts(searchInput.value);
        renderProducts(filtered);
      });

      renderProducts(productData);
    })
    .catch((error) => {
      console.error("Error loading template:", error);
    });
});
