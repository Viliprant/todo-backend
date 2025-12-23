# Todo Backend

## Description
Projet backend en **Node.js + TypeScript + Express**, implémentant un système de gestion de TODOs.  
Ce projet est conçu pour montrer la structuration d’une API REST moderne, avec séparation **Controller / Service**, tests unitaires et d’intégration, et configuration TypeScript propre.

## Stack technique
- Node.js 18+  
- TypeScript  
- Express  
- Jest pour les tests unitaires  
- Supertest pour les tests d’intégration  
- ESLint + Prettier pour le formatage et la qualité du code

## Installation

```bash
# Cloner le repo
git clone https://github.com/Viliprant/todo-backend.git

# Se déplacer dans le dossier
cd todo-backend

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
# En mode développement (avec ts-node-dev)
npm run dev

# Compiler en JS (dist/)
npm run build
npm start
```

L’API sera disponible sur http://localhost:3000.

## Endpoints principaux

| Méthode | Route   | Description                                      |
| ------- | ------- | ------------------------------------------------ |
| GET     | /health | Vérifie que le serveur est en ligne              |
| GET     | /todos  | Récupère la liste des todos                      |
| POST    | /todos  | Crée un nouveau todo (body: `{ title: string }`) |

## Tests
### Tests unitaires

```bash
npm run test 
```
- Tests du service Todo (src/services/todo.service.ts)
- Vérifie la logique métier indépendante d’Express

### Tests d'intégrations
- Utilisation de Supertest pour tester les routes /todos
- Vérifie les réponses HTTP et le flux complet controller → service

## Structure du projet

```bash
src/
├─ controllers/    # Gestion des requêtes HTTP
├─ routes/         # Définition des routes
├─ services/       # Logique métier
├─ models/         # Interfaces / modèles de données
├─ utils/          # Fonctions utilitaires (ex: gestion erreurs)
├─ app.ts          # Configuration de l’API
└─ server.ts       # Point d’entrée serveur
```

## Prochaines améliorations possibles

- Ajout d’une base de données (Prisma + PostgreSQL)
- Authentification (JWT)
- Middleware global pour la gestion centralisée des erreurs


