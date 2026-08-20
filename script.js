// محصولات پیش‌فرض اول دوره
const defaultProducts = [
    {
        id: 1,
        title: "دستگاه تصفیه آب ۶ مرحله‌ای پایه دار",
        price: "۱۲,۸۰۰,۰۰۰ تومان",
        desc: "دارای فیلتر ممبران اسمز معکوس، مخزن ۴ گالنی و شیر برداشت اهرمی.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=500"
    }
];

// دریافت محصولات از حافظه
function getProducts() {
    const saved = localStorage.getItem('zamzam_products');
    return saved ? JSON.parse(saved) : defaultProducts;
}

// نمایش در صفحه اصلی
function renderHomeProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    const products = getProducts();
    grid.innerHTML = products.map(p => `
        <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src="${p.image}" alt="${p.title}" class="w-full h-56 object-cover">
            <div class="p-6">
                <h4 class="font-bold text-lg text-slate-900 mb-2">${p.title}</h4>
                <p class="text-slate-500 text-xs leading-relaxed mb-4">${p.desc}</p>
                <div class="flex justify-between items-center border-t border-slate-100 pt-4">
                    <span class="text-xs text-slate-400">قیمت فروشگاه:</span>
                    <span class="text-blue-600 font-extrabold text-base">${p.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// افزودن محصول جدید در پنل مدیریت
const addForm = document.getElementById('add-product-form');
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('p-image');
        const file = fileInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newProduct = {
                    id: Date.now(),
                    title: document.getElementById('p-title').value,
                    price: document.getElementById('p-price').value,
                    desc: document.getElementById('p-desc').value,
                    image: event.target.result // تبدیل عکس به Data URL جهت ذخیره‌سازی
                };
                
                const products = getProducts();
                products.push(newProduct);
                localStorage.setItem('zamzam_products', JSON.stringify(products));
                
                addForm.reset();
                renderAdminProducts();
                alert('محصول با موفقیت اضافه شد!');
            };
            reader.readAsDataURL(file);
        }
    });
}

// نمایش لیست در ادمین
function renderAdminProducts() {
    const list = document.getElementById('admin-product-list');
    if (!list) return;
    
    const products = getProducts();
    list.innerHTML = products.map(p => `
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-3">
                <img src="${p.image}" class="w-12 h-12 rounded-lg object-cover">
                <div>
                    <h5 class="font-bold text-sm text-slate-800">${p.title}</h5>
                    <span class="text-xs text-blue-600">${p.price}</span>
                </div>
            </div>
            <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold px-3 py-1 bg-red-50 rounded-lg">حذف</button>
        </div>
    `).join('');
}

// حذف محصول
function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('zamzam_products', JSON.stringify(products));
    renderAdminProducts();
}

// اجرا هنگام بارگذاری
document.addEventListener('DOMContentLoaded', renderHomeProducts);
