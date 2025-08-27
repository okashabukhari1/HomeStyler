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


