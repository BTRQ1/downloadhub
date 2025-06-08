// Gestion de l'affichage/masquage du mot de passe
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Gestion du formulaire de connexion
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.querySelector('input[name="remember"]').checked;
    
    // Ajouter la classe de chargement au bouton
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    
    try {
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Vérifier les identifiants (à remplacer par une vraie vérification)
        if (email === 'admin@example.com' && password === 'admin123') {
            // Stocker les informations de connexion si "Se souvenir de moi" est coché
            if (remember) {
                localStorage.setItem('user', JSON.stringify({ email }));
            } else {
                sessionStorage.setItem('user', JSON.stringify({ email }));
            }
            
            // Rediriger vers la page d'administration
            window.location.href = 'admin.html';
        } else {
            throw new Error('Identifiants invalides');
        }
    } catch (error) {
        // Afficher le message d'erreur
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = error.message;
        
        // Supprimer l'ancien message d'erreur s'il existe
        const oldError = this.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        
        this.insertBefore(errorMessage, submitButton);
    } finally {
        // Retirer la classe de chargement
        submitButton.classList.remove('loading');
    }
});

// Vérifier si l'utilisateur est déjà connecté
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (user) {
        window.location.href = 'admin.html';
    }
}

// Vérifier l'authentification au chargement de la page
checkAuth();

// Gestion du lien "Mot de passe oublié"
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert('Veuillez entrer votre adresse email pour réinitialiser votre mot de passe.');
        return;
    }
    
    // Simuler l'envoi d'un email de réinitialisation
    alert('Un email de réinitialisation a été envoyé à ' + email);
});

// Gestion du lien d'inscription
document.querySelector('.register-link').addEventListener('click', function(e) {
    e.preventDefault();
    // Rediriger vers la page d'inscription (à implémenter)
    alert('Fonctionnalité d\'inscription à venir !');
}); 