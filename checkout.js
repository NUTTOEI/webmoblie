// ฟังก์ชันแสดงรายการสินค้าในตะกร้า
function displayOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotalElement = document.getElementById('orderTotal');
    
    // ดึงข้อมูลตะกร้าสินค้าจาก localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>ไม่มีสินค้าในตะกร้า</p>';
        orderTotalElement.textContent = '฿0';
        return;
    }

    let total = 0;
    orderItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
        total += itemTotal;
        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="order-item-info">
                    <h4>${item.name}</h4>
                    <p>฿${item.price} x ${item.quantity}</p>
                    <p>รวม: ฿${itemTotal.toLocaleString()}</p>
                </div>
                <div class="item-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">ลบ</button>
                </div>
            </div>
        `;
    }).join('');

    orderTotalElement.textContent = `฿${total.toLocaleString()}`;
}

// เพิ่มฟังก์ชันแสดงรูปภาพขนาดใหญ่
function showLargeImage(imageSrc, productName) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${imageSrc}" alt="${productName}">
            <p>${productName}</p>
        </div>
    `;
    document.body.appendChild(modal);

    // ปิด modal เมื่อคลิกพื้นหลัง
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ฟังก์ชันยืนยันการสั่งซื้อ
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', handleCheckout);
    }
    displayOrderItems();
});

async function handleCheckout(e) {
    e.preventDefault();
    
    const slipImage = document.getElementById('slipImage').files[0];
    if (!slipImage) {
        alert('กรุณาอัพโหลดสลิปการโอนเงิน');
        return;
    }

    try {
        // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // ล้างตะกร้าสินค้า
        localStorage.removeItem('cart');
        
        alert('ขอบคุณสำหรับการสั่งซื้อ! เราจะจัดส่งสินค้าให้ท่านโดยเร็วที่สุด');
        window.location.href = 'index.html';
    } catch (error) {
        alert('เกิดข้อผิดพลาดในการทำรายการ กรุณาลองใหม่อีกครั้ง');
    }
}

// เพิ่มฟังก์ชันแสดงตัวอย่างรูปภาพ
function displaySlipPreview(input) {
    const previewElement = document.getElementById('slipPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewElement.innerHTML = `<img src="${e.target.result}" alt="สลิปการโอนเงิน" style="max-width: 300px;">`;
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// ฟังก์ชันจัดการการอัพโหลดรูปภาพ
function handleImageUpload(input) {
    const file = input.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['C:\Users\nut08\Downloads\งานคู่tanyapong\งานคู่2\imags\iphon14.jpg'];
    
    // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
    if (!file) {
        alert('กรุณาเลือกรูปภาพ');
        return false;
    }
    
    // ตรวจสอบประเภทไฟล์
    if (!allowedTypes.includes(file.type)) {
        alert('กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น (JPEG, PNG, GIF)');
        input.value = '';
        return false;
    }
    
    // ตรวจสอบขนาดไฟล์
    if (file.size > maxSize) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
        input.value = '';
        return false;
    }
    
    // แสดงตัวอย่างรูปภาพ
    const preview = document.getElementById('imagePreview');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        preview.innerHTML = `
            <div class="preview-container">
                <img src="${e.target.result}" alt="ตัวอย่างรูปภาพ">
                <button type="button" class="remove-image" onclick="removeImage()">ลบรูปภาพ</button>
            </div>
        `;
    };
    
    reader.readAsDataURL(file);
    return true;
}

// ฟังก์ชันลบรูปภาพ
function removeImage() {
    const input = document.getElementById('slipImage');
    const preview = document.getElementById('imagePreview');
    
    input.value = '';
    preview.innerHTML = '';
}

// เพิ่ม Event Listener สำหรับการอัพโหลดรูปภาพ
document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('slipImage');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            handleImageUpload(this);
        });
    }
});

// ฟังก์ชันโหลดข้อมูลสินค้าและแสดงในตะกร้า
async function loadCartItems() {
    try {
        // ดึงข้อมูลตะกร้าจาก localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            document.getElementById('orderItems').innerHTML = '<p>ไม่มีสินค้าในตะกร้า</p>';
            document.getElementById('orderTotal').textContent = '฿0';
            return;
        }

        // แสดงรายการสินค้าในตะกร้า
        displayCartItems(cart);
        
        // คำนวณและแสดงราคารวม
        calculateTotal(cart);
        
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า:', error);
        alert('ไม่สามารถโหลดข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
    }
}

// ฟังก์ชันแสดงรายการสินค้าในตะกร้า
function displayCartItems(cart) {
    const cartContainer = document.getElementById('orderItems');
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="product-image" 
                onclick="showLargeImage('${item.image}', '${item.name}')">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-description">${item.description || ''}</p>
                <div class="price-quantity">
                    <p>ราคา: ฿${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <p>รวม: <span class="item-total">฿${(parseFloat(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}</span></p>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">ลบ</button>
        </div>
    `).join('');
    
    updateTotalPrice(cart);
}

// ฟังก์ชันคำนวณราคารวมของสินค้าแต่ละรายการ
function calculateItemTotal(item) {
    const price = typeof item.price === 'string' ? 
        parseFloat(item.price.replace(/,/g, '')) : 
        item.price;
    return price * item.quantity;
}

// ฟังก์ชันคำนวณราคารวมทั้งหมด
function calculateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    const totalElement = document.getElementById('orderTotal');
    if (totalElement) {
        totalElement.textContent = `฿${total.toLocaleString()}`;
    }
}

// ฟังก์ชันอัพเดทจำนวนสินค้า
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        if (confirm('ต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?')) {
            removeFromCart(productId);
        }
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // อัพเดทการแสดงผลทันที
        const quantityDisplay = document.querySelector(`[data-product-id="${productId}"] .quantity-display`);
        if (quantityDisplay) {
            quantityDisplay.textContent = newQuantity;
        }
        
        // อัพเดทราคารวมของสินค้านั้น
        const itemTotal = document.querySelector(`[data-product-id="${productId}"] .item-total`);
        if (itemTotal) {
            const price = parseFloat(cart[itemIndex].price.replace(/,/g, ''));
            itemTotal.textContent = `฿${(price * newQuantity).toLocaleString()}`;
        }
        
        // อัพเดทราคารวมทั้งหมด
        updateTotalPrice(cart);
    }
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // ลบ element ของสินค้าออกจาก DOM
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);
    if (productElement) {
        productElement.remove();
    }
    
    // อัพเดทราคารวม
    updateTotalPrice(updatedCart);
    
    // ถ้าไม่มีสินค้าในตะกร้า
    if (updatedCart.length === 0) {
        document.getElementById('orderItems').innerHTML = '<p>ไม่มีสินค้าในตะกร้า</p>';
        document.getElementById('orderTotal').textContent = '฿0';
    }
}

// ฟังก์ชันอัพเดทราคารวม
function updateTotalPrice(cart) {
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/,/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    document.getElementById('orderTotal').textContent = `฿${total.toLocaleString()}`;
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    
    // เพิ่ม event listener สำหรับฟอร์มชำระเงิน
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
        checkoutForm.addEventListener('cancel', handleCancel);
    }
});

function handleCancel(e) {
    e.preventDefault();
    window.location.href = 'index.html';
}

