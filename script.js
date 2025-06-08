// Données de test pour les produits
const products = [
    {
        id: 1,
        title: "Album Musical Premium",
        description: "Collection exclusive de musiques du monde entier",
        image: "https://source.unsplash.com/random/400x300?music",
        category: "Musique",
        downloads: 1500
    },
    {
        id: 2,
        title: "Film Blockbuster HD",
        description: "Film à succès en qualité haute définition",
        image: "https://source.unsplash.com/random/400x300?movie",
        category: "Films",
        downloads: 2500
    },
    {
        id: 3,
        title: "Jeu PC Édition Spéciale",
        description: "Jeu vidéo populaire avec contenu additionnel",
        image: "https://source.unsplash.com/random/400x300?game",
        category: "Jeux",
        downloads: 3000
    },
    {
        id: 4,
        title: "E-book Best-Seller",
        description: "Livre numérique à succès en format PDF",
        image: "https://source.unsplash.com/random/400x300?book",
        category: "Livres",
        downloads: 1800
    }
];

// Fonction pour générer les cartes de produits
function generateProductCards() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="category"><i class="fas fa-tag"></i> ${product.category}</span>
                    <span class="downloads"><i class="fas fa-download"></i> ${product.downloads}</span>
                </div>
                <a href="#" class="download-button" data-product-id="${product.id}">
                    <i class="fas fa-download"></i>
                    Télécharger
                </a>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Fonction de recherche
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Aucun produit trouvé pour "${searchTerm}"</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="category"><i class="fas fa-tag"></i> ${product.category}</span>
                    <span class="downloads"><i class="fas fa-download"></i> ${product.downloads}</span>
                </div>
                <a href="#" class="download-button" data-product-id="${product.id}">
                    <i class="fas fa-download"></i>
                    Télécharger
                </a>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Gestionnaire d'événements pour la recherche
document.querySelector('.search-button').addEventListener('click', handleSearch);
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Gestionnaire d'événements pour les téléchargements
document.addEventListener('click', (e) => {
    if (e.target.closest('.download-button')) {
        e.preventDefault();
        const productId = e.target.closest('.download-button').dataset.productId;
        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Simuler un téléchargement
            const button = e.target.closest('.download-button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                alert(`Téléchargement de "${product.title}" commencé !`);
            }, 2000);
        }
    }
});

// Animation au défilement
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.product-card, .category-card, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    generateProductCards();
    handleScrollAnimation();
});

// Filtrage par catégorie
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('h3').textContent;
        const filteredProducts = products.filter(product => 
            product.category === category
        );
        displayProducts(filteredProducts);
    });
});

// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log('Données du formulaire:', data);
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    this.reset();
});

// Animation du bouton CTA
document.querySelector('.cta-button').addEventListener('click', function() {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
});

// Animation au défilement
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les sections pour l'animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gestion du menu mobile (à implémenter plus tard)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Afficher les produits au chargement de la page
displayProducts(); 