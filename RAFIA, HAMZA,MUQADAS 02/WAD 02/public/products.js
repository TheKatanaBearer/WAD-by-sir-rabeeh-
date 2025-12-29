
// adjust that button above categories

function updateBreadCrumb(){
    const breadCrumb = document.getElementById("breadcrumb-text");

    if(selectedCategory){
        breadCrumb.textContent = `Product > ${selectedCategory}`;
    }

    else{
        breadCrumb.textContent = "Product > All Categories";
    }
}


// Product display function

let selectedCategory = "";
let selectedLimit = 0;

function loadProducts(){
    let url = `/api/products?`;
    
    updateBreadCrumb();

    if(selectedCategory){
        url+=`category=${encodeURIComponent(selectedCategory)}&`;
    }

    if(selectedLimit){
        url+=`limit=${selectedLimit}`;
    }

    fetch(url)
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById("dynamic-products");

        container.innerHTML = products.map(product => `
  <div class="card">
    <div class="img-box">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <h4>${product.name}</h4>

    <a class="read-more-btn"
       href="product.html?type=product&id=${product.slug}">
      Read More
    </a>
  </div>
`).join("");
    });
}





// calling the function 
loadProducts();


fetch("/api/categories")
.then(res => res.json())
.then(categories => {
    const list =document.getElementById("category-list");

    list.innerHTML = categories.map(cat => `
           <li>
        <label>
          <input type="checkbox" value="${cat.name}">
          ${cat.name}
        </label>
      </li>
        `).join("");
})

.catch(err => console.error(err));


// products appear according to checkbox and show limit
document.addEventListener("change", e => {
    if(e.target.type === "checkbox"){
        selectedCategory = e.target.checked ? e.target.value : "";
        loadProducts();
    }

    if(e.target.id == "show-limit"){
        selectedLimit = parseInt(e.target.value);
        loadProducts();
    }

})


 


