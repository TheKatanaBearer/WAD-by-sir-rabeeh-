  async function loadFeaturedProducts() {
    try {
      const res = await fetch("/api/featured"); // your server route
      const data = await res.json();

      const grid = document.getElementById("featuredGrid");

      grid.innerHTML = data.map(item => `
        <div class="product-card">
          <div class="product-img">
            <img src="${item.image}" alt="${item.name}">
          </div>

          <h3>${item.name}</h3>

          <div class="stars">${item.rating}</div>

         <a href="product.html?type=featured&id=${item.slug}" class="dark-btn details-class">
  click for details
</a>
        </div>
      `).join("");

    } catch (err) {
      console.error("Failed to load featured products:", err);
    }
  }

  loadFeaturedProducts();