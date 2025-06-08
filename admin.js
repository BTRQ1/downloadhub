// Données de test
let products = [
    {
        id: 1,
        title: "Document PDF",
        description: "Un document PDF important",
        category: "Documents",
        downloads: 150,
        imageUrl: "https://via.placeholder.com/50"
    },
    // Ajoutez plus de produits ici
];

let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin"
    },
    // Ajoutez plus d'utilisateurs ici
];

// Gestion de la navigation
document.querySelectorAll('.admin-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        // Mise à jour des classes actives
        document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        
        // Affichage de la section correspondante
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Gestion du modal
const modal = document.getElementById('product-modal');
const addProductBtn = document.querySelector('.add-product-btn');
const closeBtn = document.querySelector('.close');

addProductBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Gestion du formulaire de produit
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const newProduct = {
        id: products.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        downloads: 0,
        imageUrl: URL.createObjectURL(formData.get('image'))
    };
    
    products.push(newProduct);
    updateProductsTable();
    modal.style.display = 'none';
    this.reset();
});

// Mise à jour du tableau des produits
function updateProductsTable() {
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.imageUrl}" alt="${product.title}" width="50"></td>
            <td>${product.title}</td>
            <td>${product.category}</td>
            <td>${product.downloads}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Mise à jour du tableau des utilisateurs
function updateUsersTable() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Fonctions d'édition et de suppression
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        // Remplir le formulaire avec les données du produit
        const form = document.getElementById('product-form');
        form.title.value = product.title;
        form.description.value = product.description;
        form.category.value = product.category;
        
        // Afficher le modal
        modal.style.display = 'block';
    }
}

function deleteProduct(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        products = products.filter(p => p.id !== id);
        updateProductsTable();
    }
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        // Implémenter l'édition d'utilisateur
        console.log('Édition de l\'utilisateur:', user);
    }
}

function deleteUser(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        users = users.filter(u => u.id !== id);
        updateUsersTable();
    }
}

// Initialisation des graphiques
function initCharts() {
    // Graphique des téléchargements
    const downloadsCtx = document.getElementById('downloads-chart').getContext('2d');
    new Chart(downloadsCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                label: 'Téléchargements',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: '#3498db',
                tension: 0.1
            }]
        }
    });

    // Graphique des catégories
    const categoriesCtx = document.getElementById('categories-chart').getContext('2d');
    new Chart(categoriesCtx, {
        type: 'pie',
        data: {
            labels: ['Documents', 'Images', 'Vidéos', 'Audio'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
            }]
        }
    });
}

// Gestion des paramètres
document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const settings = {
        siteName: formData.get('site-name'),
        siteDescription: formData.get('site-description'),
        theme: formData.get('theme')
    };
    
    // Sauvegarder les paramètres
    console.log('Paramètres sauvegardés:', settings);
    alert('Paramètres sauvegardés avec succès !');
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateProductsTable();
    updateUsersTable();
    initCharts();
}); 