# URL Shortener

Application complète de raccourcissement d'URL : API NestJS + Prisma/PostgreSQL pour générer et stocker des liens courts, et interface React pour créer et lister les URLs.

## Architecture
- **Backend** : NestJS, Prisma client généré dans `backend/src/generated/prisma`, encodage base62, validation d'URL, redirection par `/:shortUrl`.
- **Base de données** : PostgreSQL (service `db` dans `docker-compose.yml`, volume `db_data`, port hôte 56432). Modèle `Url(id, url unique, shorten_url, count, last_update)`.
- **Frontend** : React + Vite (service `frontend`), formulaire pour créer une URL courte et tableau des URLs connues.
- **Orchestration** : `docker-compose.yml` (services `db`, `backend`, `frontend`).

## Fonctionnement
- `POST /` : crée un raccourci pour `url` (JSON `{ "url": "https://exemple.com" }`).
  - Valide l'URL, réutilise l'entrée existante si elle existe déjà, sinon génère `shorten_url` en base62.
- `GET /` : retourne la liste des URLs stockées.
- `GET /:shortUrl` : redirige vers l'URL originale.
- Le champ `count` est stocké mais n'est pas encore incrémenté lors des redirections (affiché côté frontend).

## Démarrage rapide (Docker)
1) Prérequis : Docker + Docker Compose.
2) À la racine du dépôt :
```bash
docker compose up --build
```
3) Accès :
   - Frontend : http://localhost:5173
   - API : http://localhost:3000
   - PostgreSQL (local) : port 56432, base `url_shortener`, user `postgres` / password `password`.
4) Les migrations Prisma sont appliquées au démarrage (`npx prisma migrate deploy`).



## Points à améliorer
- Ajouter une gestion d'erreurs plus riche côté API et UI.
- Ajouter des tests unitaires et d'intégration
- Ajouter un cronjob pour supprimer les URLs expirés
- Mise en place d'un reverse proxy Nginx pour la protection des routes
