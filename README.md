Rapport de Projet
Développement d’un Dashboard Administratif – ShopFlow E-Commerce

**Description du Projet :

Ce projet consiste en la création d’un tableau de bord administratif complet pour la boutique en ligne ShopFlow. Il permet à l’administrateur de suivre en temps réel les performances commerciales : chiffre d’affaires, état des stocks et popularité des produits. L’accès est sécurisé par une page de connexion, et toutes les données s’actualisent instantanément selon les filtres choisis. Le dashboard propose des indicateurs clés (KPIs), deux graphiques interactifs, un tableau dynamique et une interface moderne, entièrement réalisée en HTML, CSS et JavaScript (sans backend).

**Technologies Utilisées :

o HTML5 : structure claire et sémantique

o CSS3 : design moderne avec Flexbox, ombres douces, palette bleu/jaune, approche mobile-first et responsivité complète

o JavaScript : logique dynamique, gestion des événements, calculs en temps réel

o Chart.js : graphiques interactifs (barres et doughnut)

o localStorage : persistance de la session utilisateur

o Intl.NumberFormat : affichage professionnel des montants en dinars tunisiens (TND) avec 3 décimales

**Fonctionnalités Principales :

o Authentification sécurisée (identifiants : basmalah / basmalah123) 

o KPIs mis à jour en direct : CA total, stock restant, produit vedette

o Filtres combinés : par catégorie et par période (7 jours, 30 jours, année en cours)

o Graphiques dynamiques : ventes par catégorie (barres) et répartition du stock (doughnut)

o Tableau intelligent : affiche les produits filtrés avec message « Aucun résultat » si vide

o Navigation fluide entre login et dashboard avec déconnexion

**Principales Difficultés Rencontrées et Solutions :

o Gestion et traitement des données

Difficulté : Toutes les données sont stockées dans un tableau JavaScript donc recalculs fréquents

Solution : Utilisation efficace de .filter(), .reduce() et new Set() pour des opérations rapides et lisibles.

o Mise à jour fluide des graphiques

Difficulté : Recréer les graphiques à chaque filtre provoquait des clignotements.

Solution : Initialisation unique des instances Chart.js + mise à jour via .update() → rendu instantané et sans saccades.

o Filtrage combiné (catégorie + période)

Difficulté : Gérer deux critères simultanément et générer dynamiquement la liste des catégories.

Solution : Fonction dédiée avec calcul de timestamp + Set pour éviter les doublons d'où filtrage précis et instantané.

o Persistance de la connexion

Difficulté : Rester connecté après rafraîchissement sans serveur.

Solution : Utilisation de localStorage avec un flag d’authentification d'où expérience utilisateur continue.

o Désalignement des filtres

Difficulté : Les deux sélecteurs étaient mal alignés sur certaines résolutions.

Solution : Création d’un conteneur Flexbox (.filtres-groupes) d'où alignement horizontal parfait 
et responsive.

o Désalignement vertical des graphiques sur mobile/tablette

Difficulté : Les deux graphiques n’avaient pas la même hauteur d'où aspect désordonné.

Solution : Hauteur fixe (350px) forcée en CSS + maintainAspectRatio: false dans Chart.js d'où alignement impeccable sur tous les écrans.

=>Le dashboard final est fonctionnel, esthétique, rapide et entièrement responsive.







