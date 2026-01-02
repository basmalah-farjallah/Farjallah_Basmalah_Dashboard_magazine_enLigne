const IDENTIFIANTS_ADMIN = { username: 'basmalah', password: 'basmalah123' };
const loginPage = document.getElementById('login-body');
const dashboard = document.getElementById('dashboard');
//Toujours afficher login en premier lieu au chargement
loginPage.style.display = 'flex';
dashboard.style.display = 'none';
//Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); //empeéche le chargement de la page
    // on utilise .trim() pour enlever les espaces avant et aprés la valeur récupérée
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const msg = document.getElementById('messageErreur');
    if (user === IDENTIFIANTS_ADMIN.username && pass === IDENTIFIANTS_ADMIN.password) {
        //connecté
        localStorage.setItem('isLoggedIn', 'true'); // on utilise localStorage pour mémoriser dans le navigateur que l'utilisateur est connecté 
        loginPage.style.display = 'none';
        dashboard.style.display = 'block';
        initialiserDashboard();
    } else {
        //connexion échouée
        msg.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
        document.getElementById('password').value = '';
    }
});
//Déconnexion
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    loginPage.style.display = 'flex';
    dashboard.style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('messageErreur').textContent = '';
});
//DASHBOARD 
// Fonction qui récupére les données d'une certaine date
function getDateJoursAvant(jours) {
    const d = new Date(); //contient l'heure et la date actuelles
    d.setDate(d.getDate() - jours);//getDate nous donne le jour du mois actuel et setDate change le jour du mois selon notre besoin.
    return d.getTime(); 
}
// Données 
const produits = [
    { id: 1, nom: 'Sporty And Rosy Sweatshirt', categorie: 'Vêtements', prix: 119.000, stock: 150, totalVentes: 85, dateDerniereVente: getDateJoursAvant(2) }, 
    { id: 2, nom: 'Layali Dress', categorie: 'Vêtements', prix: 229.990, stock: 80, totalVentes: 55, dateDerniereVente: getDateJoursAvant(15) },
    { id: 3, nom: 'Leather Belt', categorie: 'Accessoires', prix: 85.000, stock: 60, totalVentes: 120, dateDerniereVente: getDateJoursAvant(3) },
    { id: 4, nom: 'Daily Denim Tote', categorie: 'Accessoires', prix: 89.000, stock: 200, totalVentes: 90, dateDerniereVente: getDateJoursAvant(45) },
    { id: 5, nom: 'Fayruz Scarf ', categorie: 'Foulards', prix: 52.000, stock: 40, totalVentes: 35, dateDerniereVente: getDateJoursAvant(10) },
    { id: 6, nom: 'Ocean Whisper', categorie: 'Foulards', prix: 49.000, stock: 100, totalVentes: 85, dateDerniereVente: getDateJoursAvant(200) },
    { id: 7, nom: 'Luna Shirt', categorie: 'Vêtements', prix: 139.000, stock: 110, totalVentes: 60, dateDerniereVente: getDateJoursAvant(1) }, 
    { id: 8, nom: 'Seashell Linen Pants', categorie: 'Vêtements', prix: 105.000, stock: 70, totalVentes: 40, dateDerniereVente: getDateJoursAvant(30) },
];
const couleurs = ['#007bff','#28a745','#ffc107','#dc3545','rgba(180, 18, 195, 1)','#6610f2','#fd7e14','rgba(205, 56, 125, 1)'];
const formatteur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'TND', minimumFractionDigits: 3 }); //permet de formater les nombres en une monnaie selon la langue et le pays avec au minimum 3 décimales
let ventesChart = null, stockChart = null;
function initialiserDashboard() {
    remplirCategories();
    appliquerFiltres();
}
//parcourt tout les produits et récupére leurs catégories sans doublons et remplis le menu déroulant avec ses catégories
function remplirCategories() {
    const select = document.getElementById('categorieFiltre');
    //Vider le select avant de le remplir
    select.innerHTML = '';
    [...new Set(produits.map(p => p.categorie))].forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat; opt.textContent = cat;
        select.appendChild(opt);
    });
}
//retourne un timestamp( nbr de millisecondes)correspendant à la date limite selon la période choisie
function getLimite(periode) {
    const now = Date.now();
    switch(periode) {
        case '7j': return now - 7*86400000;
        case '30j': return now - 30*86400000;
        case 'annee': return new Date(new Date().getFullYear(), 0, 1).getTime();
        default: return 0;
    }
}
function appliquerFiltres() {
    const cat = document.getElementById('categorieFiltre').value;
    const per = document.getElementById('periodeFiltre').value;
    const limite = getLimite(per);
    //parcourt tous les produits et ne garde que ceux qui respectent les deux conditions 
    const data = produits.filter(p => 
        (cat === 'tous' || p.categorie === cat) &&
        (limite === 0 || p.dateDerniereVente >= limite)
    );
    //pour raffraichir l'affichage
    mettreAJourDashboard(data);
}
function mettreAJourDashboard(data) {
    //calcule le chiffre d'affaires total(qt-vendues*prix)
    const ca = data.reduce((s,p) => s + p.totalVentes * p.prix, 0);
    //somme tout le stock restant
    const stock = data.reduce((s,p) => s + p.stock, 0);
    //trouve le produit le plus vendu(celui avec le plus grand totalVentes)
    const top = data.length ? data.reduce((a,b) => a.totalVentes > b.totalVentes ? a : b) : null;
    //mise à jour des chiffres clés
    document.getElementById('totalVentes').textContent = formatteur.format(ca);
    document.getElementById('totalStock').textContent = stock + ' unités';
    document.getElementById('produitPopulaire').textContent = top ? top.nom : 'Non défini';
    //mise à jour du tableau html
    const tbody = document.getElementById('corpsTableauProduits');//tableau dynamique mis à jour instantanément
    tbody.innerHTML = data.length === 0 
        ? '<tr><td colspan="5" style="text-align:center;color:#dc3545;font-weight:500;">Aucun produit trouvé pour ce filtre.</td></tr>'
        : data.map(p => `<tr><td>${p.nom}</td><td>${p.categorie}</td><td>${formatteur.format(p.prix)}</td><td>${p.stock}</td><td>${p.totalVentes}</td></tr>`).join('');

    // Graphiques
    //répartition du stock par produit
    const caParCat = data.reduce((a,p) => { a[p.categorie] = (a[p.categorie]||0) + p.totalVentes*p.prix; return a; }, {}); //récupére le CA par catégorie
    const dataCA = { labels: Object.keys(caParCat), datasets: [{ data: Object.values(caParCat), backgroundColor: couleurs }] };
    if (!ventesChart) ventesChart = new Chart('ventesParCategorieChart', { type:'bar', data: dataCA, options:{responsive:true, maintainAspectRatio:false, scales:{y:{beginAtZero:true}}}});//creation et affichage du graphique pour la 1ere fois
    else { ventesChart.data = dataCA; ventesChart.update(); } //graphique existe déja on le récupére et le mis àjour avec .update 

    const dataStock = { labels: data.map(p=>p.nom), datasets: [{ data: data.map(p=>p.stock), backgroundColor: couleurs }] };
    if (!stockChart) stockChart = new Chart('stockParProduitChart', { type:'doughnut', data: dataStock, options:{responsive:true, aspectRatio:1, plugins:{legend:{position:'bottom'}}}});
    else { stockChart.data = dataStock; stockChart.update(); }
}
//pour rendre la dashboard interactif dés qu'on change une valeur tout se recalcule et se rafraichit automatiquement
document.getElementById('periodeFiltre').addEventListener('change', appliquerFiltres);
document.getElementById('categorieFiltre').addEventListener('change', appliquerFiltres);
           





