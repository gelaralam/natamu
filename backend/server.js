const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes (allow frontend to access API)
app.use(cors());
app.use(express.json());

// Dummy data for destinations
const destinations = [
    {
        id: 1,
        title: "Nusa Penida",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
        rating: 4.9,
        price: "Rp 1.2M",
        isFavorite: true
    },
    {
        id: 2,
        title: "Gunung Bromo",
        location: "Jawa Timur",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=400",
        rating: 4.8,
        price: "Rp 850k",
        isFavorite: false
    },
    {
        id: 3,
        title: "Raja Ampat",
        location: "Papua Barat",
        image: "https://images.unsplash.com/photo-1516483638261-f4085ee6bd0f?auto=format&fit=crop&q=80&w=400",
        rating: 5.0,
        price: "Rp 4.5M",
        isFavorite: false
    }
];

// Dummy data for travel packages
const packages = [
    {
        id: 1,
        title: "Jelajah Raja Ampat",
        duration: "4 Hari 3 Malam",
        image: "https://images.unsplash.com/photo-1516483638261-f4085ee6bd0f?auto=format&fit=crop&q=80&w=200",
        price: "Rp 5.5M"
    },
    {
        id: 2,
        title: "Budaya Yogyakarta",
        duration: "3 Hari 2 Malam",
        image: "https://images.unsplash.com/photo-1596401081755-d3fa7bfbbf53?auto=format&fit=crop&q=80&w=200",
        price: "Rp 2.1M"
    },
    {
        id: 3,
        title: "Eksplorasi Labuan Bajo",
        duration: "5 Hari 4 Malam",
        image: "https://images.unsplash.com/photo-1512100256359-e70538d4dbd9?auto=format&fit=crop&q=80&w=200",
        price: "Rp 6.2M"
    }
];

// Routes
app.get('/api/destinations', (req, res) => {
    res.json(destinations);
});

app.get('/api/packages', (req, res) => {
    res.json(packages);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
