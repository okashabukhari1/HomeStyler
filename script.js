/* ===== Global Document Ready ===== */
document.addEventListener("DOMContentLoaded", () => {

    /* ===== Navbar Shrink ===== */
    (function() {
        const nav = document.getElementById('mainNav') || document.querySelector('.navbar');
        if (!nav) return;
        const SHRINK_CLASS = 'navbar-shrink';
        const THRESHOLD = 50;

        function applyNavbarShrink() {
            if (window.scrollY > THRESHOLD) nav.classList.add(SHRINK_CLASS);
            else nav.classList.remove(SHRINK_CLASS);
        }
        window.addEventListener('scroll', applyNavbarShrink, { passive: true });
        window.addEventListener('resize', applyNavbarShrink);
        applyNavbarShrink();
    })();


    /* ===== Gallery Image Modal ===== */
    const galleryImages = document.querySelectorAll(".gallery-img");
    const imageModalEl = document.getElementById("imageModal");
    const imageModal = imageModalEl ? new bootstrap.Modal(imageModalEl) : null;
    const modalImage = document.getElementById("modalImage");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            if (modalImage) modalImage.src = img.src;
            imageModal?.show();
        });
    });


    /* ===== Design Styles Page ===== */
    const designContainer = document.getElementById("designContainer");
    const categoryFilter = document.getElementById("categoryFilter");
    const trendFilter = document.getElementById("trendFilter");
    const designModalEl = document.getElementById('designModal');
    const designModal = designModalEl ? new bootstrap.Modal(designModalEl) : null;

    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalProducts = document.getElementById("modalProducts");
    const modalCost = document.getElementById("modalCost");
    const modalTrend = document.getElementById("modalTrend");

    const designs = [
        { category: "Living Room", trend: "Modern", title: "Modern Living Room", image: "Images/Modern_Living_Room.jpg", description: "A sleek modern living room with neutral tones and minimal furniture.", products: ["Sofa","Coffee Table","Wall Art"], cost: "$1,200" },
        { category: "Living Room", trend: "Classic", title: "Classic Living Room", image: "Images/Classic_Living_Room.jpg", description: "Traditional design with elegant wooden furniture and warm tones.", products: ["Leather Sofa","Wooden Cabinet","Chandelier"], cost: "$2,000" },
        { category: "Kitchen", trend: "Elegant", title: "Elegant Kitchen", image: "Images/Elegant_Kitchen.jpg", description: "Stylish kitchen with marble countertops and modern lighting.", products: ["Cabinets","Countertop","Pendant Lights"], cost: "$2,500" },
        { category: "Bedroom", trend: "Minimal", title: "Minimalist Bedroom", image: "Images/Minimalist_Bedroom.jpg", description: "Simple and cozy bedroom with clean lines and soft lighting.", products: ["Bed Frame","Nightstand","Lamp"], cost: "$900" }
        // Add the rest of your designs here...
    ];

    function renderDesigns(filterCategory = "", filterTrend = "") {
        if (!designContainer) return;
        designContainer.innerHTML = "";

        const filtered = designs.filter(d => 
            (!filterCategory || d.category === filterCategory) &&
            (!filterTrend || d.trend === filterTrend)
        );

        if (!filtered.length) {
            designContainer.innerHTML = `<p class="text-center text-muted">No designs found.</p>`;
            return;
        }

        filtered.forEach((d,index) => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card shadow-sm h-100 clickable" style="cursor:pointer;" data-index="${index}">
                    <img src="${d.image}" class="card-img-top" alt="${d.title}">
                    <div class="card-body">
                        <h5 class="card-title">${d.title}</h5>
                        <p class="card-text text-truncate">${d.description}</p>
                        <p class="text-success fw-bold">Cost: ${d.cost}</p>
                    </div>
                </div>
            `;
            designContainer.appendChild(card);
        });

        if (designModal) {
            document.querySelectorAll(".card.clickable").forEach(card => {
                card.addEventListener("click", () => {
                    const index = card.getAttribute("data-index");
                    const design = filtered[index];
                    if (!design) return;
                    modalTitle && (modalTitle.textContent = design.title);
                    modalDescription && (modalDescription.textContent = design.description);
                    modalProducts && (modalProducts.textContent = design.products.join(", "));
                    modalCost && (modalCost.textContent = design.cost);
                    modalTrend && (modalTrend.textContent = design.trend);
                    designModal.show();
                });
            });
        }
    }

    categoryFilter?.addEventListener("change", () => renderDesigns(categoryFilter.value, trendFilter?.value || ""));
    trendFilter?.addEventListener("change", () => renderDesigns(categoryFilter?.value || "", trendFilter.value));
    renderDesigns();


    /* ===== Products Page ===== */
    const products = [
        { id: 1, category: 'furniture', subcategory: 'sofas', name: 'Modern Sofa', price: 799, rating: 4.5, image: 'Images/Modern Sofa.avif', description: 'Comfortable modern sofa.' },
        { id: 2, category: 'furniture', subcategory: 'beds', name: 'Luxury Bed', price: 999, rating: 4.8, image: 'Images/Bed.jpg', description: 'King size luxury bed.' },
        { id: 3, category: 'decor', subcategory: 'rugs', name: 'Persian Rug', price: 299, rating: 4.2, image: 'Images/Living Room.png', description: 'Elegant handmade rug.' },
        { id: 4, category: 'lighting', subcategory: 'ceiling', name: 'Chandelier', price: 499, rating: 4.7, image: 'Images/chandelier.jpg', description: 'Modern ceiling chandelier.' }
    ];

    const subcategories = {
        furniture: ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage'],
        lighting: ['Ceiling', 'Wall', 'Floor', 'Table', 'Outdoor'],
        decor: ['Rugs', 'Curtains', 'Wall Art', 'Cushions', 'Vases'],
        kitchen: ['Cabinets', 'Countertops', 'Sinks', 'Islands', 'Backsplashes'],
        bathroom: ['Vanities', 'Showers', 'Toilets', 'Sinks', 'Mirrors']
    };

    function getWishlist() { return JSON.parse(localStorage.getItem("wishlist")) || []; }
    function saveWishlist(list) { localStorage.setItem("wishlist", JSON.stringify(list)); }
    function updateWishlistCount() { const el = document.getElementById("wishlistCount"); if(el) el.textContent = getWishlist().length; }

    function renderProducts() {
        const container = document.getElementById('productsContainer');
        if (!container) return;
        container.innerHTML = '';

        const category = document.getElementById('categoryFilter')?.value || 'all';
        const subcategory = document.getElementById('subcategoryFilter')?.value || 'all';
        const maxPrice = parseFloat(document.getElementById('priceFilter')?.value) || Infinity;
        const minRating = parseFloat(document.getElementById('ratingFilter')?.value) || 0;

        const filtered = products.filter(p => 
            (category==='all'||p.category===category) &&
            (subcategory==='all'||p.subcategory===subcategory) &&
            p.price<=maxPrice &&
            p.rating>=minRating
        );

        if(!filtered.length){ container.innerHTML='<p class="text-center">No products found.</p>'; return; }

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card product-card h-100 shadow-sm" data-id="${p.id}">
                    <img src="${p.image}" class="card-img-top" alt="${p.name}">
                    <div class="card-body">
                        <h5 class="card-title">${p.name}</h5>
                        <p class="card-text">${p.description}</p>
                        <p class="fw-bold">$${p.price}</p>
                        <p class="star-rating">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</p>
                        <button class="btn btn-dark w-100 add-to-wishlist"><i class="bi bi-heart"></i> Add to Wishlist</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll(".add-to-wishlist").forEach(btn=>{
            btn.addEventListener("click", ()=>{
                const card = btn.closest(".product-card");
                const product = {
                    id: card.dataset.id,
                    title: card.querySelector(".card-title").textContent,
                    price: card.querySelector(".fw-bold").textContent,
                    image: card.querySelector("img").src
                };
                let list = getWishlist();
                if(!list.some(x=>x.id===product.id)){
                    list.push(product); saveWishlist(list); updateWishlistCount();
                    btn.innerHTML=`<i class="bi bi-check2"></i> Added`; btn.disabled=true;
                }
            });
        });
    }

    document.getElementById('categoryFilter')?.addEventListener('change', renderProducts);
    document.getElementById('subcategoryFilter')?.addEventListener('change', renderProducts);
    document.getElementById('priceFilter')?.addEventListener('change', renderProducts);
    document.getElementById('ratingFilter')?.addEventListener('change', renderProducts);
    renderProducts();


    document.addEventListener("DOMContentLoaded", () => {

    const wishlistContainer = document.getElementById("wishlistItems"); // container for wishlist items
    const wishlistCountEl = document.getElementById("wishlistCount");

    // Helper functions
    function getWishlist() { return JSON.parse(localStorage.getItem('wishlist')) || []; }
    function saveWishlist(list) { localStorage.setItem('wishlist', JSON.stringify(list)); }
    function updateWishlistCount() { 
        if (wishlistCountEl) wishlistCountEl.textContent = getWishlist().length; 
    }

    // Render wishlist
    function renderWishlist() {
        const wishlist = getWishlist();
        if(!wishlistContainer) return;

        wishlistContainer.innerHTML = '';
        if(!wishlist.length) {
            wishlistContainer.innerHTML = '<p class="text-center text-muted">Your wishlist is empty.</p>';
            return;
        }

        wishlist.forEach((item, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="fw-bold">${item.price}</p>
                        <button class="btn btn-danger mt-auto remove-btn" data-index="${index}">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            wishlistContainer.appendChild(col);
        });

        // Attach remove button events
        wishlistContainer.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                const wishlist = getWishlist();
                wishlist.splice(idx, 1);
                saveWishlist(wishlist);
                updateWishlistCount();
                renderWishlist();
            });
        });
    }

    // Initial render
    renderWishlist();
    updateWishlistCount();
});
});
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const subcategoryFilter = document.getElementById("subcategoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const searchInput = document.getElementById("searchInput");

    const allProducts = Array.from(productList.querySelectorAll(".product-card"));

    // Define 3 subcategories per category
    const subcategoriesMap = {
        "Furniture": ["Sofas and Couches", "Chairs and Recliners", "Tables"],
        "Lighting": ["Ceiling Lights", "Wall Lights", "Table Lamps"],
        "Decor": ["Rugs and Carpets", "Wall Art and Mirrors", "Vases and Plant Pots"],
        "Kitchen": ["Cabinets and Pantries", "Countertops", "Sinks and Faucets"],
        "Bathroom": ["Vanities and Cabinets", "Showers and Bathtubs", "Toilets and Bidets"]
    };

    function populateSubcategories() {
        const category = categoryFilter.value;
        subcategoryFilter.innerHTML = `<option value="">All Subcategories</option>`;
        if (category && subcategoriesMap[category]) {
            subcategoriesMap[category].forEach(sub => {
                const option = document.createElement("option");
                option.value = sub;
                option.textContent = sub;
                subcategoryFilter.appendChild(option);
            });
        }
    }

    function updateProducts() {
        const category = categoryFilter.value.toLowerCase();
        const subcategory = subcategoryFilter.value.toLowerCase();
        const priceRange = priceFilter.value;
        const ratingValue = parseInt(ratingFilter.value) || 0;
        const searchTerm = searchInput.value.toLowerCase();

        let filtered = allProducts.filter(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            const cardSubcategory = card.dataset.subcategory.toLowerCase();
            const cardPrice = parseFloat(card.dataset.price);
            const cardRating = parseInt(card.dataset.rating);
            const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();

            if (category && cardCategory !== category) return false;
            if (subcategory && cardSubcategory !== subcategory) return false;

            if (priceRange) {
                const [min, max] = priceRange.split("-").map(Number);
                if (cardPrice < min || cardPrice > max) return false;
            }

            if (ratingValue && cardRating < ratingValue) return false;
            if (searchTerm && !cardTitle.includes(searchTerm)) return false;

            return true;
        });

        allProducts.forEach(card => card.style.display = "none");
        filtered.forEach(card => card.style.display = "block");

        // Show "No products found" message
        const noProductsMsgId = "noProductsMsg";
        let msg = document.getElementById(noProductsMsgId);
        if (filtered.length === 0) {
            if (!msg) {
                msg = document.createElement("p");
                msg.id = noProductsMsgId;
                msg.className = "text-center text-muted";
                msg.textContent = "No products found.";
                productList.appendChild(msg);
            }
        } else if (msg) {
            msg.remove();
        }
    }

    categoryFilter.addEventListener("change", () => { populateSubcategories(); updateProducts(); });
    subcategoryFilter.addEventListener("change", updateProducts);
    priceFilter.addEventListener("change", updateProducts);
    ratingFilter.addEventListener("change", updateProducts);
    searchInput.addEventListener("input", updateProducts);

    populateSubcategories();
    updateProducts();
});

