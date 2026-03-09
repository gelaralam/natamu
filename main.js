document.addEventListener('DOMContentLoaded', () => {
    // Category selection logic
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
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
        { id: 1, title: "Nusa Penida", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400", rating: 4.9, price: "Rp 1.2M", isFavorite: true },
        { id: 2, title: "Gunung Bromo", location: "Jawa Timur", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=400", rating: 4.8, price: "Rp 850k", isFavorite: false },
        { id: 3, title: "Raja Ampat", location: "Papua Barat", image: "https://images.unsplash.com/photo-1516483638261-f4085ee6bd0f?auto=format&fit=crop&q=80&w=400", rating: 5.0, price: "Rp 4.5M", isFavorite: false }
    ];

    const fallbackPackages = [
        { id: 1, title: "Jelajah Raja Ampat", duration: "4 Hari 3 Malam", image: "https://images.unsplash.com/photo-1516483638261-f4085ee6bd0f?auto=format&fit=crop&q=80&w=200", price: "Rp 5.5M" },
        { id: 2, title: "Budaya Yogyakarta", duration: "3 Hari 2 Malam", image: "https://images.unsplash.com/photo-1596401081755-d3fa7bfbbf53?auto=format&fit=crop&q=80&w=200", price: "Rp 2.1M" },
        { id: 3, title: "Eksplorasi Labuan Bajo", duration: "5 Hari 4 Malam", image: "https://images.unsplash.com/photo-1512100256359-e70538d4dbd9?auto=format&fit=crop&q=80&w=200", price: "Rp 6.2M" }
    ];

    const renderDestinations = (data) => {
        const container = document.getElementById('destinations-container');
        if (!container) return;
        container.innerHTML = '';
        data.forEach((dest, index) => {
            const isFavClass = dest.isFavorite ? 'active' : '';
            const isFavIcon = dest.isFavorite ? 'ri-heart-fill' : 'ri-heart-line';
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
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
    };

    const renderPackages = (data) => {
        const container = document.getElementById('packages-container');
        if (!container) return;
        container.innerHTML = '';
        data.forEach((pkg, index) => {
            const item = document.createElement('div');
            item.className = 'package-item';
            item.style.animation = `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`;
            item.innerHTML = `
                <img src="${pkg.image}" alt="${pkg.title}">
                <div class="package-details">
                    <h4>${pkg.title}</h4>
                    <p class="duration"><i class="ri-time-line"></i> ${pkg.duration}</p>
                    <div class="package-bottom">
                        <span class="price">${pkg.price}</span>
                        <button class="book-btn">Pesan</button>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    };

    // Fetch Destinations
    fetch(`${API_BASE}/destinations`)
        .then(res => res.json())
        .then(data => renderDestinations(data))
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
