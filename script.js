// ข้อมูลสินค้า

const products = [
    {
        id: 1,
        name: "iPhone 14",
        price: "18,000",
        category: "smartphone",
        image: "iphone14pro.jpg",
        image: "https://media.studio7thailand.com/153208/iPhone_14_Starlight-square_medium.png"
    },

    {
        id: 2,
        name: "iPhone 14 Plus",
        price: "27,000",
        category: "smartphone",
        image: "iphone14pro.jpg",
        image: "https://media-cdn.bnn.in.th/234727/iPhone_14_Plus_Blue_PDP_Image_Position-1A_Blue_1-square_medium.jpg"
    },

    {
        id: 3,
        name: "iPhone 14 Pro",
        price: "45,000",
        category: "smartphone",
        image: "iphone14pro.jpg",
        image: "https://media.studio7thailand.com/133178/iPhone-14-Pro-Gold-square_medium.png"
    },

    {
        id: 4,
        name: "iPhone 14 Pro max",
        price: "49,000",
        category: "smartphone",
        image: "iphone14pro.jpg",
        image: "https://mediam.istudio.store/media/catalog/product/cache/3b7e899159f673788675d87d1d929a98/i/p/iphone-14-pro-max-deep-purple-001.jpg"
    },

    {
        id: 5,
        name: "iPhone 15",
        price: "27,000",
        category: "smartphone",
        image: "https://www.ais.th/content/dam/ais/consumer/store/devices/apple/iphone/iphone-15-series/iphone-15/iphone-15-pink.png"
    },

    {
        id: 6,
        name: "iPhone 15 Plus",
        price: "39,000",
        category: "smartphone",
        image: "https://media.studio7thailand.com/153357/iPhone_15_Plus_Green-square_medium.png"
    },

    {
        id: 7,
        name: "iPhone 15 Pro",
        price: "47,000",
        category: "smartphone",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTfSNMFQ8Xrrniezden06JpfR78pYQGccMiQ&s"
    },

    {
        id: 8,  
        name: "iPhone 15 Pro max",
        price: "59,000",
        category: "smartphone",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMh_rk2uFaVjeSNZe0L9j78x7pNIOLHeLd7g&s"
    },

    {
        id: 9,
        name: "iPhone 16",
        price: "27,000",
        category: "smartphone",
        image: "https://media-cdn.bnn.in.th/426925/iPhone_16_Pink_1-square_medium.jpg"
    },

    {
        id: 10,
        name: "iPhone 16 Plus",
        price: "39,000",
        category: "smartphone",
        image: "https://media.studio7thailand.com/154821/iPhone_16_Plus_Ultramarine_PDP_Image_Position_1a_Ultramarine_Color__TH-TH-square_medium.png"
    },      

    {
        id: 11,
        name: "iPhone 16 Pro",
        price: "47,000",
        category: "smartphone",
        image: "https://www.istudio.store/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_TH_1.jpg?v=1725929129&width=823"
    },

    {
        id: 12,
        name: "iPhone 16 Pro max",
        price: "59,000",
        category: "smartphone",
        image: "https://media.studio7thailand.com/154741/iPhone_16_Pro_Max_Black_Titanium_PDP_Image_Position_1a_Black_Titanium_Color__TH-TH.png"
    }
];


let cart = []; 

function createProductImageElement(product) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'product-image';
    img.style.width = '90%';
    img.style.height = '60%';
    img.style.objectFit = 'cover';
    return img;
}

function createProductInfoElement(product) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';

    const nameElement = document.createElement('h3');
    nameElement.textContent = product.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = product.description;

    const priceElement = document.createElement('p');
    priceElement.className = 'product-price';
    priceElement.textContent = `฿${product.price.toLocaleString()}`;

    const buttonElement = document.createElement('button');
    buttonElement.className = 'add-to-cart-btn';
    buttonElement.textContent = 'เพิ่มลงตะกร้า';
    buttonElement.onclick = () => addToCart(product.id);

    infoDiv.appendChild(nameElement);
    infoDiv.appendChild(descriptionElement);
    infoDiv.appendChild(priceElement);
    infoDiv.appendChild(buttonElement);

    return infoDiv;
}

function createProductCardElement(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-id', product.id);

    const imageElement = createProductImageElement(product);
    const infoElement = createProductInfoElement(product);

    productCard.appendChild(imageElement);
    productCard.appendChild(infoElement);

    return productCard;
}

function displayProducts(productsToShow = products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // ล้างเนื้อหาที่มีอยู่ก่อน

    productsToShow.forEach(product => {
        const productCard = createProductCardElement(product);
        productGrid.appendChild(productCard);
    });
}

// ฟังก์ชันเพิ่มสินค้าลงตะกร้า
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('เพิ่มสินค้าลงในตะกร้าเรียบร้อยแล้ว');
}

// ฟังก์ชันเปิด Modal ตะกร้าสินค้า
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'block';
});

// ฟังก์ชันปิด Modal ตะกร้าสินค้า
document.querySelector('#cartModal .close').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// ปิด Modal เมื่อคลิกพื้นที่ภายนอก
window.addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        document.getElementById('cartModal').style.display = 'none';
    }
});

// ฟังก์ชันอัพเดทการแสดงผลของตะกร้าสินค้า
// function updateCartDisplay() {
//     const cartCount = document.querySelector('.cart-count');
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     cartCount.textContent = totalItems;
    
//     const cartItems = document.getElementById('cartItems');
//     cartItems.innerHTML = cart.map(item => `
//         <div class="cart-item">
//             <img src="${item.image}" alt="${item.name}">
//             <div class="cart-item-info">
//                 <h4>${item.name}</h4>
//                 <p>฿${item.price.toLocaleString()} x ${item.quantity}</p>
//             </div>
//             <div class="cart-item-controls">
//                 <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
//                 <span>${item.quantity}</span>
//                 <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
//             </div>
//         </div>
//     `).join('');
    
//     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     document.getElementById('cartTotal').textContent = `฿${total.toLocaleString()}`;
// }

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        item.quantity = newQuantity;
    }
    updateCartDisplay();
}

// แบบฟอร์มติดต่อ
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    try {
        
        
        showNotification('ส่งข้อความเรียบร้อยแล้ว');
        e.target.reset();
    } catch (error) {
        showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
    }
});

// ฟังก์ชันแสดงการแจ้งเตือน
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// เริ่มต้นแสดงสินค้าเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateProductImage(1, 'https://media.studio7thailand.com/153208/iPhone_14_Starlight-square_medium.png');
    updateProductImage(2, 'https://media-cdn.bnn.in.th/234727/iPhone_14_Plus_Blue_PDP_Image_Position-1A_Blue_1-square_medium.jpg');
    updateProductImage(3, 'https://media.studio7thailand.com/133178/iPhone-14-Pro-Gold-square_medium.png');
    updateProductImage(4, 'https://mediam.istudio.store/media/catalog/product/cache/3b7e899159f673788675d87d1d929a98/i/p/iphone-14-pro-max-deep-purple-001.jpg');
});

// ระบบชำระเงิน
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('กรุณาเลือกสินค้าก่อนชำระเงิน', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // สร้างหน้าสรุปการสั่งซื้อ
    const summary = cart.map(item => 
        `${item.name} x ${item.quantity} = ฿${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
   
});

function updateProductImage(productId, newImageUrl) {
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
        const productImage = productCard.querySelector('.product-image');
        if (productImage) {
            productImage.src = newImageUrl;
        } else {
            console.error('ไม่พบภาพสินค้าใน product-card');
        }
    } else {
        console.error('ไม่พบ product-card ที่มี data-id:', productId);
    }
    
}


