/* ===== Global Document Ready ===== */
document.addEventListener("DOMContentLoaded", () => {

    /* ===== Navbar Shrink ===== */
    (function () {
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
        { category: "Living Room", trend: "Modern", title: "Modern Living Room", image: "Images/Modern_Living_Room.jpg", description: "A sleek modern living room with neutral tones and minimal furniture.", products: ["Sofa", "Coffee Table", "Wall Art"], cost: "$1,200" },
        { category: "Living Room", trend: "Classic", title: "Classic Living Room", image: "Images/Classic_Living_Room.jpg", description: "Traditional design with elegant wooden furniture and warm tones.", products: ["Leather Sofa", "Wooden Cabinet", "Chandelier"], cost: "$2,000" },
        { category: "Kitchen", trend: "Elegant", title: "Elegant Kitchen", image: "Images/Elegant_Kitchen.jpg", description: "Stylish kitchen with marble countertops and modern lighting.", products: ["Cabinets", "Countertop", "Pendant Lights"], cost: "$2,500" },
        { category: "Bedroom", trend: "Minimal", title: "Minimalist Bedroom", image: "Images/Minimalist_Bedroom.jpg", description: "Simple and cozy bedroom with clean lines and soft lighting.", products: ["Bed Frame", "Nightstand", "Lamp"], cost: "$900" }
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

        filtered.forEach((d, index) => {
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
    // Update the floating cart counter
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let count = 0;
        cart.forEach(item => count += item.quantity);

        const counter = document.getElementById("cart-count");
        if (counter) counter.textContent = count;
    }

    // Add product to cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // check if already in cart
        let existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 0;
        } else {
            product.quantity = 0;
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // ✅ update counter immediately
        updateCartCount();

        // 🔥 optional: animate cart icon
        const cartIcon = document.getElementById("cart-icon");
        cartIcon.classList.add("cart-bounce");
        setTimeout(() => cartIcon.classList.remove("cart-bounce"), 500);
    }

    // Listen for clicks on "Add to Cart" buttons
    document.addEventListener("click", e => {
        if (e.target.classList.contains("add-to-cart")) {
            const btn = e.target;

            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image
            };

            addToCart(product);
        }
    });

    // Initialize on page load
    document.addEventListener("DOMContentLoaded", updateCartCount);

    // Optional: update if multiple tabs open
    window.addEventListener("storage", updateCartCount);

    categoryFilter.addEventListener("change", () => { populateSubcategories(); updateProducts(); });
    subcategoryFilter.addEventListener("change", updateProducts);
    priceFilter.addEventListener("change", updateProducts);
    ratingFilter.addEventListener("change", updateProducts);
    searchInput.addEventListener("input", updateProducts);

    populateSubcategories();
    updateProducts();
});


