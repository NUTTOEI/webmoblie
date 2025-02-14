// ข้อมูลสินค้าทั้งหมด



// ฟังก์ชันกรองสินค้าตามหมวดหมู่
function filterByCategory(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    filteredProducts = category === 'all' 
        ? [...allProducts]
        : allProducts.filter(product => product.category === category);
    
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// ฟังก์ชันกรองตามราคา
function filterByPrice() {
    const minPrice = Number(document.getElementById('minPrice').value) || 0;
    const maxPrice = Number(document.getElementById('maxPrice').value) || Infinity;

    filteredProducts = allProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    currentPage = 1;
    displayProducts();
    updatePagination();
}

// ฟังก์ชันเรียงลำดับสินค้า
function sortProducts(method) {
    switch(method) {
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'priceAsc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'nameAsc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    displayProducts();
}




// ฟังก์ชันแสดงรายละเอียดสินค้า
function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const content = modal.querySelector('.product-detail-content');

    content.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p class="price">฿${product.price.toLocaleString()}</p>
            <p class="description">${product.description}</p>
            <div class="product-actions">
                <div class="quantity-selector">
                    <button onclick="updateQuantity('decrease')">-</button>
                    <input type="number" id="productQuantity" value="1" min="1">
                    <button onclick="updateQuantity('increase')">+</button>
                </div>
                <button onclick="addToCartFromModal(${product.id})" class="add-to-cart-btn">
                    เพิ่มลงตะกร้า
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// ฟังก์ชันอัพเดทจำนวนสินค้าในหน้ารายละเอียด
function updateQuantity(action) {
    const input = document.getElementById('productQuantity');
    let value = parseInt(input.value);

    if (action === 'increase') {
        value++;
    } else if (action === 'decrease' && value > 1) {
        value--;
    }

    input.value = value;
}

// ฟังก์ชันเพิ่มสินค้าลงตะกร้าจากหน้ารายละเอียด
function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('productQuantity').value);
    addToCart(productId, quantity);
    document.getElementById('productModal').style.display = 'none';
}

// ฟังก์ชันอัพเดทปุ่มเลขหน้า
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.querySelector('.page-numbers');
    
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">${i}</button>
        `;
    }
    
    pagination.innerHTML = paginationHTML;
}

// ฟังก์ชันเปลี่ยนหน้า
function changePage(page) {
    currentPage = page;
    displayProducts();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updatePagination();

    // ตัวกรองหมวดหมู่
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterByCategory(btn.dataset.category);
        });
    });

    // ตัวกรองราคา
    document.getElementById('filterPrice').addEventListener('click', filterByPrice);

    // ตัวเรียงลำดับ
    document.getElementById('sortProducts').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // ปุ่มปิด Modal
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });
});

// ปิด Modal เมื่อคลิกพื้นที่ภายนอก
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});