document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll(".gallery-img");
    const modalImage = document.getElementById("modalImage");
    const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            modalImage.src = img.src;
            imageModal.show();
        });
    });
});
// Highlight active section in navbar
document.addEventListener("scroll", () => {
    let sections = document.querySelectorAll("section");
    let scrollPos = window.scrollY + 100; // offset for navbar height

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${section.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});
// Navbar shrink effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNav");
    if (window.scrollY > 80) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});
// Navbar shrink function
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNav");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-shrink");
    } else {
        navbar.classList.remove("navbar-shrink");
    }
});
// Button animation on scroll
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".animate-btn");

    function revealButton() {
        const rect = button.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            button.classList.add("visible");
        }
    }

    window.addEventListener("scroll", revealButton);
    revealButton(); // Run once in case button is already in view
});
// Expanded design data
const designs = [
    {
        category: "Living Room",
        trend: "Modern",
        title: "Modern Living Room",
        image: "Images/Modern_Living_Room.jpg",
        description: "A sleek modern living room with neutral tones and minimal furniture.",
        products: ["Sofa", "Coffee Table", "Wall Art"],
        cost: "$1,200"
    },
    {
        category: "Living Room",
        trend: "Classic",
        title: "Classic Living Room",
        image: "Images/Classic_Living_Room.jpg",
        description: "Traditional design with elegant wooden furniture and warm tones.",
        products: ["Leather Sofa", "Wooden Cabinet", "Chandelier"],
        cost: "$2,000"
    },
    {
        category: "Living Room",
        trend: "Luxury",
        title: "Luxury Living Room",
        image: "Images/Luxury_Living_Room.jpg",
        description: "Spacious living room with premium sofa set, luxury rug and golden decor.",
        products: ["Velvet Sofa", "Designer Rug", "Gold Lamp"],
        cost: "$3,500"
    },
    {
        category: "Kitchen",
        trend: "Elegant",
        title: "Elegant Kitchen",
        image: "Images/Elegant_Kitchen.jpg",
        description: "Stylish kitchen with marble countertops and modern lighting.",
        products: ["Cabinets", "Countertop", "Pendant Lights"],
        cost: "$2,500"
    },
    {
        category: "Kitchen",
        trend: "Minimal",
        title: "Minimalist Kitchen",
        image: "Images/Minimalist_Kitchen.jpg",
        description: "Bright kitchen design with white cabinets and simple layout.",
        products: ["Island Table", "Cabinet Set", "LED Lights"],
        cost: "$1,800"
    },
    {
        category: "Kitchen",
        trend: "Classic",
        title: "Classic Kitchen",
        image: "Images/Classic_Kitchen.jpg",
        description: "Warm wooden cabinets with traditional tiles and homely vibe.",
        products: ["Wood Cabinets", "Tile Backsplash", "Stove"],
        cost: "$2,200"
    },
    {
        category: "Bedroom",
        trend: "Minimal",
        title: "Minimalist Bedroom",
        image: "Images/Minimalist_Bedroom.jpg",
        description: "Simple and cozy bedroom with clean lines and soft lighting.",
        products: ["Bed Frame", "Nightstand", "Lamp"],
        cost: "$900"
    },
    {
        category: "Bedroom",
        trend: "Luxury",
        title: "Luxury Bedroom",
        image: "Images/Luxury_Bedroom.jpg",
        description: "Luxury bedroom featuring king-size bed, premium decor and soft carpets.",
        products: ["King Bed", "Wardrobe", "Rug"],
        cost: "$3,000"
    },
    {
        category: "Bedroom",
        trend: "Elegant",
        title: "Elegant Bedroom",
        image: "Images/Elegant_Bedroom.jpg",
        description: "Elegant design with pastel tones, soft fabric headboard and chandelier.",
        products: ["Fabric Bed", "Curtains", "Chandelier"],
        cost: "$2,400"
    },
    {
        category: "Bathroom",
        trend: "Contemporary",
        title: "Contemporary Bathroom",
        image: "Images/Contemporary_Bathroom.jpg",
        description: "Modern bathroom with glass shower and stylish vanity.",
        products: ["Shower Set", "Vanity", "Mirror"],
        cost: "$1,500"
    },
    {
        category: "Dining Room",
        trend: "Elegant",
        title: "Elegant Dining Room",
        image: "Images/Elegant_Dining_Room.jpg",
        description: "Elegant dining area with wooden table and classic chandelier.",
        products: ["Dining Table", "Chairs", "Chandelier"],
        cost: "$2,200"
    },
    {
        category: "Dining Room",
        trend: "Contemporary",
        title: "Contemporary Dining Room",
        image: "Images/Contemporary_Dining_Room.jpg",
        description: "Contemporary style with sleek chairs and glass table.",
        products: ["Glass Table", "Modern Chairs", "Wall Art"],
        cost: "$1,700"
    }
];

const designContainer = document.getElementById("designContainer");
const categoryFilter = document.getElementById("categoryFilter");
const trendFilter = document.getElementById("trendFilter");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalProducts = document.getElementById("modalProducts");
const modalCost = document.getElementById("modalCost");
const modalTrend = document.getElementById("modalTrend");

const designModal = new bootstrap.Modal(document.getElementById('designModal'));

// Function to render designs with fade-in
function renderDesigns(filterCategory = "", filterTrend = "") {
    designContainer.innerHTML = "";
    designs
        .filter(d => (!filterCategory || d.category === filterCategory) && (!filterTrend || d.trend === filterTrend))
        .forEach((d, index) => {
            const card = `
        <div class="col-md-4">
          <div class="card shadow-sm h-100 clickable" style="cursor:pointer;" data-index="${index}">
            <img src="${d.image}" class="card-img-top" alt="${d.title}">
            <div class="card-body">
              <h5 class="card-title">${d.title}</h5>
              <p class="card-text text-truncate">${d.description}</p>
              <p class="text-success fw-bold">Cost: ${d.cost}</p>
            </div>
          </div>
        </div>
      `;
            designContainer.innerHTML += card;
        });

    // Animate cards after they are added
    document.querySelectorAll(".card").forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
    });

    // Attach click events
    document.querySelectorAll(".card.clickable").forEach(card => {
        card.addEventListener("click", () => {
            const index = card.getAttribute("data-index");
            showDetails(designs[index]);
        });
    });
}

// Function to show modal details
function showDetails(design) {
    modalTitle.textContent = design.title;
    modalImage.src = design.image;
    modalDescription.textContent = design.description;
    modalProducts.textContent = design.products.join(", ");
    modalCost.textContent = design.cost;
    modalTrend.textContent = design.trend;
    designModal.show();
}

// Event Listeners
categoryFilter.addEventListener("change", () => {
    renderDesigns(categoryFilter.value, trendFilter.value);
});
trendFilter.addEventListener("change", () => {
    renderDesigns(categoryFilter.value, trendFilter.value);
});

// Initial load
renderDesigns();
// Navbar shrink on scroll - robust & debug friendly
(function () {
    function initNavbarShrink() {
        const nav = document.getElementById('mainNav') || document.querySelector('.navbar');
        console.log('[nav-shrink] init - found nav:', !!nav, nav);
        if (!nav) return;

        const SHRINK_CLASS = 'navbar-shrink';
        const THRESHOLD = 50; // px

        function applyNavbarShrink() {
            const y = window.scrollY || window.pageYOffset || 0;
            if (y > THRESHOLD) {
                if (!nav.classList.contains(SHRINK_CLASS)) {
                    nav.classList.add(SHRINK_CLASS);
                    console.log('[nav-shrink] added class (scrollY=' + y + ')');
                }
            } else {
                if (nav.classList.contains(SHRINK_CLASS)) {
                    nav.classList.remove(SHRINK_CLASS);
                    console.log('[nav-shrink] removed class (scrollY=' + y + ')');
                }
            }
        }

        // Listen to scroll + resize
        window.addEventListener('scroll', applyNavbarShrink, { passive: true });
        window.addEventListener('resize', applyNavbarShrink);
        // Run once on load/DOM ready
        applyNavbarShrink();

        // expose helper for debugging from console
        window._applyNavbarShrink = applyNavbarShrink;
        window._mainNavElement = nav;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarShrink);
    } else {
        initNavbarShrink();
    }
})();
// Product data
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

let wishlist = [];

// Populate subcategories based on selected category
document.getElementById('categoryFilter').addEventListener('change', function () {
    const category = this.value;
    const subFilter = document.getElementById('subcategoryFilter');
    subFilter.innerHTML = '<option value="all">All Subcategories</option>';
    if (category !== 'all' && subcategories[category]) {
        subcategories[category].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.toLowerCase();
            option.textContent = sub;
            subFilter.appendChild(option);
        });
    }
    renderProducts();
});

// Render products
function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    const category = document.getElementById('categoryFilter').value;
    const subcategory = document.getElementById('subcategoryFilter').value;
    const maxPrice = parseFloat(document.getElementById('priceFilter').value) || Infinity;
    const minRating = parseFloat(document.getElementById('ratingFilter').value) || 0;

    const filtered = products.filter(p => {
        return (category === 'all' || p.category === category)
            && (subcategory === 'all' || p.subcategory === subcategory)
            && p.price <= maxPrice
            && p.rating >= minRating;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center">No products found.</p>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">${p.description}</p>
                    <p class="fw-bold">$${p.price}</p>
                    <p class="star-rating">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</p>
                    <button class="btn btn-dark w-100" onclick="addToWishlist(${p.id})">Add to Wishlist</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Wishlist functions
function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    if (!wishlist.includes(product)) wishlist.push(product);
    renderWishlist();
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(p => p.id !== id);
    renderWishlist();
}

function renderWishlist() {
    const tbody = document.getElementById('wishlistBody');
    tbody.innerHTML = '';
    if (wishlist.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">No products added yet.</td></tr>';
        return;
    }
    wishlist.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>$${p.price}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${p.id})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Re-render products when filters change
['subcategoryFilter', 'priceFilter', 'ratingFilter'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderProducts);
});

// Initial render
renderProducts();
// Initialize AOS

// Animate hero text on page load
window.addEventListener('load', () => {
    document.querySelector('.animate-slide').classList.add('appear');
    document.querySelector('.animate-slide-delay').classList.add('appear');
});
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Load feedback from localStorage
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

function displayFeedback() {
    feedbackList.innerHTML = '';
    feedbacks.slice().reverse().forEach(fb => {
        const div = document.createElement('div');
        div.className = 'col-md-6';
        div.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${fb.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${fb.email}</h6>
                    <p class="card-text">${fb.message}</p>
                </div>
            </div>
        `;
        feedbackList.appendChild(div);
    });
}

displayFeedback();

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newFeedback = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    feedbacks.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    feedbackForm.reset();
    displayFeedback();
});
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- Active link highlighting ---
    const currentPage = window.location.pathname.split("/").pop().toLowerCase().split('#')[0];
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop().toLowerCase().split('#')[0];
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Navbar shrink effect ---
    const SHRINK_CLASS = 'navbar-shrink';
    const THRESHOLD = 50; // scroll threshold in px

    function applyNavbarShrink() {
        if (window.scrollY > THRESHOLD) {
            navbar.classList.add(SHRINK_CLASS);
        } else {
            navbar.classList.remove(SHRINK_CLASS);
        }
    }

    // Run on scroll and on load
    window.addEventListener('scroll', applyNavbarShrink, { passive: true });
    applyNavbarShrink();
});
// Optional: Slight fade-up animation on scroll for cards
const designerCards = document.querySelectorAll('.designer-card');

window.addEventListener('scroll', () => {
  designerCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

// Initialize all cards hidden for scroll animation
designerCards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
});
// Navbar shrink on scroll
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('navbar-shrink');
  else navbar.classList.remove('navbar-shrink');
});



