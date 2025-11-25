
// Cette fonction pour regler l'ordre des pages
function verifierSessionLogin() {
    // Si l'utilisateur est déjà connecté, on l'envoie directement au dashboard.
    // Cela empêche l'utilisateur de rester sur la page de connexion s'il est déjà logué.
    const estConnecte = localStorage.getItem('isLoggedIn');
    if (estConnecte === 'true') {
        window.location.href = 'dash.html'; 
    }
}
// Identifiants prédéfinis 
const IDENTIFIANTS_ADMIN = {
    username: 'basmalah',
    password: 'basmalah123' 
};
document.addEventListener('DOMContentLoaded', () => {
    // Vérifie si l'utilisateur est déjà connecté avant d'afficher le formulaire
    verifierSessionLogin();
    // soumission du formulaire
    const loginForm = document.getElementById('loginForm');
    const inputUsername = document.getElementById('username');
    const inputPassword = document.getElementById('password');
    const messageErreur = document.getElementById('messageErreur');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const enteredUsername = inputUsername.value.trim();
        const enteredPassword = inputPassword.value.trim();
        if (enteredUsername === IDENTIFIANTS_ADMIN.username && enteredPassword === IDENTIFIANTS_ADMIN.password) {
            // Connexion réussie 
            localStorage.setItem('isLoggedIn','true');
            // Redirection vers le tableau de bord
            window.location.href = 'dash.html'; 
        } else {
            messageErreur.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
            inputPassword.value = '';
        }
    });
});
