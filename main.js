document.addEventListener('DOMContentLoaded', () => {
    // Category selection logic
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Side Menu Logic
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = (isOpen) => {
        if (isOpen) {
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    if (openMenuBtn) openMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
    if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

    // Smooth Scrolling for Menu Links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                toggleMenu(false); // Close menu first

                // Slight delay for menu animation to finish before scrolling
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Favorite button logic function
    const attachFavoriteListeners = () => {
        const favoriteBtns = document.querySelectorAll('.favorite-btn');
        favoriteBtns.forEach(btn => {
            // Remove previous listeners if any to avoid duplicates
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                newBtn.classList.toggle('active');
                const icon = newBtn.querySelector('i');
                if (newBtn.classList.contains('active')) {
                    icon.classList.remove('ri-heart-line');
                    icon.classList.add('ri-heart-fill');
                } else {
                    icon.classList.remove('ri-heart-fill');
                    icon.classList.add('ri-heart-line');
                }
            });
        });
    };

    // Bottom Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => {
                nav.classList.remove('active');
                const navIcon = nav.querySelector('i');
                if (navIcon.className.includes('-fill')) {
                    navIcon.className = navIcon.className.replace('-fill', '-line');
                }
            });
            item.classList.add('active');
            const icon = item.querySelector('i');
            if (icon.className.includes('-line')) {
                icon.className = icon.className.replace('-line', '-fill');
            }
        });
    });

    // Fetch data from backend
    const API_BASE = 'http://localhost:3000/api';

    // Fallback Data
    const fallbackDestinations = [
        { id: 1, title: 'Imah Gede', location: 'Pusat Kasepuhan', price: 'Gratis', rating: 4.9, image: 'assets/images/imah-gede.jpg', isFavorite: true },
        { id: 2, title: 'Leuit Si Jimat', location: 'Area Pertanian', price: 'Gratis', rating: 4.8, image: 'assets/images/leuit.jpg', isFavorite: false },
        { id: 3, title: 'Hutan Larangan', location: 'Zona Konservasi', price: 'Rp 50rb', rating: 4.7, image: 'assets/images/hutan.jpg', isFavorite: false }
    ];

    const fallbackPackages = [
        { id: 1, title: 'Wisata Budaya 2D1N', duration: '2 Hari 1 Malam', price: 'Rp 350.000', image: 'assets/images/package-1.jpg' },
        { id: 2, title: 'Tracking Hutan Larangan', duration: '1 Hari Full', price: 'Rp 150.000', image: 'assets/images/package-2.jpg' }
    ];

    const renderDestinations = (data) => {
        const container = document.getElementById('destinations-container');
        if (!container) return;
        container.innerHTML = '';
        data.forEach((dest, index) => {
            const isFavClass = dest.isFavorite ? 'active' : '';
            const isFavIcon = dest.isFavorite ? 'ri-heart-fill' : 'ri-heart-line';
            const card = document.createElement('div');
            card.className = 'destination-card observe-fade';

            card.innerHTML = `
                <div class="card-image" style="background-image: url('${dest.image}');">
                    <div class="rating"><i class="ri-star-fill"></i> ${dest.rating}</div>
                    <button class="favorite-btn ${isFavClass}"><i class="${isFavIcon}"></i></button>
                </div>
                <div class="card-content">
                    <h4>${dest.title}</h4>
                    <div class="location"><i class="ri-map-pin-line"></i> ${dest.location}</div>
                    <div class="price">
                        <div class="price-box">
                            <span>Mulai dari</span>
                            <strong>${dest.price}</strong>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        attachFavoriteListeners();
        observeElements();
    };

    const renderPackages = (data) => {
        const container = document.getElementById('packages-container');
        if (!container) return;
        container.innerHTML = '';
        data.forEach((pkg, index) => {
            const item = document.createElement('div');
            item.className = 'package-item observe-fade';

            const waMessage = encodeURIComponent(`Halo Natamu! Saya tertarik memesan paket perjalanan: ${pkg.title}`);
            const waLink = `https://wa.me/6281234567890?text=${waMessage}`; // Ganti dengan nomor asli nanti

            item.innerHTML = `
                <img src="${pkg.image}" alt="${pkg.title}">
                <div class="package-details">
                    <h4>${pkg.title}</h4>
                    <p class="duration"><i class="ri-time-line"></i> ${pkg.duration}</p>
                    <div class="package-bottom">
                        <span class="price">${pkg.price}</span>
                        <a href="${waLink}" target="_blank" class="book-btn">Pesan</a>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
        observeElements();
    };

    // Intersection Observer for Animations
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));
    }

    // Initial Observation for static elements
    observeElements();

    let allDestinations = [];

    // Helper to Filter Destinations
    const filterDestinations = (category) => {
        const lowerCategory = category.toLowerCase();
        const source = allDestinations.length > 0 ? allDestinations : fallbackDestinations;

        if (lowerCategory === 'semua') {
            renderDestinations(source);
        } else {
            const filtered = source.filter(dest =>
                dest.title.toLowerCase().includes(lowerCategory) ||
                dest.location.toLowerCase().includes(lowerCategory)
            );
            renderDestinations(filtered.length > 0 ? filtered : source);
        }
    };

    // Category Click Handlers
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const currentActive = document.querySelector('.category-item.active');
            if (currentActive) currentActive.classList.remove('active');
            item.classList.add('active');
            const categoryName = item.querySelector('span').innerText;
            filterDestinations(categoryName);
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const source = allDestinations.length > 0 ? allDestinations : fallbackDestinations;

            const filtered = source.filter(dest =>
                dest.title.toLowerCase().includes(query) ||
                dest.location.toLowerCase().includes(query)
            );

            renderDestinations(filtered);

            // Reset categories if searching
            if (query.length > 0) {
                document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            }
        });
    }

    // Fetch Destinations
    fetch(`${API_BASE}/destinations`)
        .then(res => res.json())
        .then(data => {
            allDestinations = data;
            renderDestinations(data);
        })
        .catch(err => {
            console.warn('Using fallback destinations', err);
            renderDestinations(fallbackDestinations);
        });

    // Fetch Packages
    fetch(`${API_BASE}/packages`)
        .then(res => res.json())
        .then(data => renderPackages(data))
        .catch(err => {
            console.warn('Using fallback packages', err);
            renderPackages(fallbackPackages);
        });
});
