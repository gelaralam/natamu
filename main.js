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

    // Fetch Destinations
    fetch(`${API_BASE}/destinations`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('destinations-container');
            if (!container) return;
            container.innerHTML = ''; // Clear loading state

            data.forEach(dest => {
                const isFavClass = dest.isFavorite ? 'active' : '';
                const isFavIcon = dest.isFavorite ? 'ri-heart-fill' : 'ri-heart-line';

                container.innerHTML += `
                    <div class="destination-card">
                        <div class="card-image" style="background-image: url('${dest.image}');">
                            <div class="rating"><i class="ri-star-fill"></i> ${dest.rating}</div>
                            <button class="favorite-btn ${isFavClass}"><i class="${isFavIcon}"></i></button>
                        </div>
                        <div class="card-content">
                            <h4>${dest.title}</h4>
                            <div class="location"><i class="ri-map-pin-line"></i> ${dest.location}</div>
                            <div class="price">
                                <span>Mulai dari</span>
                                <strong>${dest.price}</strong>
                            </div>
                        </div>
                    </div>
                `;
            });

            attachFavoriteListeners();
        })
        .catch(err => {
            console.error('Error fetching destinations:', err);
            const container = document.getElementById('destinations-container');
            if (container) container.innerHTML = '<p style="padding: 20px;">Gagal memuat destinasi.</p>';
        });

    // Fetch Packages
    fetch(`${API_BASE}/packages`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('packages-container');
            if (!container) return;
            container.innerHTML = ''; // Clear loading state

            data.forEach(pkg => {
                container.innerHTML += `
                    <div class="package-item">
                        <img src="${pkg.image}" alt="${pkg.title}">
                        <div class="package-details">
                            <h4>${pkg.title}</h4>
                            <p class="duration"><i class="ri-time-line"></i> ${pkg.duration}</p>
                            <div class="package-bottom">
                                <span class="price">${pkg.price}</span>
                                <button class="book-btn">Pesan</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error('Error fetching packages:', err);
            const container = document.getElementById('packages-container');
            if (container) container.innerHTML = '<p style="padding: 20px;">Gagal memuat paket.</p>';
        });
});
