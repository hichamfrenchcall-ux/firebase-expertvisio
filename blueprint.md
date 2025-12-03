# Blueprint du Projet : SaaS pour Cabinets d'Expertise

## 1. Vue d'ensemble

L'objectif est de construire une application SaaS (Software as a Service) multi-tenant destinée aux cabinets d'expertise. La plateforme permettra de mener des expertises à distance via des appels vidéo sécurisés, d'enregistrer les sessions, de capturer la géolocalisation des participants et de gérer les dossiers de manière centralisée.

## 2. Architecture Technique

- **Frontend :** Next.js (React) avec TypeScript et Tailwind CSS pour une interface moderne et réactive.
- **Backend :** Des fonctions serverless (Next.js API Routes, ou Edge Functions) seront utilisées pour la logique métier côté serveur. Pour des tâches plus complexes, un serveur Node.js (Express ou NestJS) pourrait être envisagé.
- **Base de données & Services :** Supabase sera notre "backend-as-a-service".
    - **PostgreSQL :** Pour la persistance des données (cabinets, utilisateurs, RDV, etc.).
    - **Auth :** Pour la gestion de l'authentification et des utilisateurs.
    - **Storage :** Pour le stockage sécurisé des enregistrements vidéo.
    - **Realtime :** Pour les notifications en temps réel dans l'application.
- **Vidéo & WebRTC :** Jitsi Meet (auto-hébergé ou via leur service) sera utilisé pour les appels vidéo et l'enregistrement. `mediasoup` est une alternative plus complexe si nous avons besoin de plus de contrôle.
- **Déploiement :** L'application sera conteneurisée avec Docker et déployée sur un VPS Linux (Ubuntu), avec Certbot pour la gestion des certificats SSL.

## 3. Fonctionnalités

### MVP (Produit Minimum Viable)

1.  **Authentification & Multi-tenancy :**
    - Inscription et connexion des utilisateurs (experts).
    - Création de comptes "cabinets" (tenants).
    - Isolation des données entre les cabinets (Row Level Security dans Supabase).
2.  **Création de RDV :**
    - Un expert peut créer un nouveau RDV.
    - Génération d'un lien unique pour l'appel vidéo.
3.  **Session d'Expertise Vidéo :**
    - Appel vidéo 1-to-1 via le lien généré.
    - Demande de consentement pour l'enregistrement et la géolocalisation.
    - Capture de la géolocalisation (coordonnées GPS) via l'API HTML5.
4.  **Enregistrement & Stockage :**
    - Enregistrement de la session vidéo.
    - Upload automatique de l'enregistrement vers Supabase Storage, dans le bucket du cabinet.
5.  **Tableau de Bord Cabinet :**
    - Liste des RDV passés et à venir.
    - Accès aux enregistrements vidéo et possibilité de les télécharger.

### Améliorations Post-MVP

- **Transcription Automatique :** Transcription du contenu des appels en texte, avec recherche.
- **Widget d'Intégration :** Un `<iframe>` ou un plugin pour que les cabinets puissent intégrer la prise de RDV sur leur propre site.
- **Synchronisation Calendrier :** Intégration avec Google Calendar et Outlook.
- **Tags & Notes :** Possibilité d'ajouter des métadonnées (tags, notes) aux enregistrements.
- **Mode Offline :** Prise de notes hors ligne avec synchronisation ultérieure.
- **Interface d'Administration :** Gestion centralisée des cabinets, des paiements, et logs d'audit.
- **Modèle Freemium :** Un plan gratuit avec des fonctionnalités de base et des plans payants pour des options avancées.
- **Support Multi-langues :** Internationalisation de l'interface (FR, EN, AR).

## 4. Plan de Développement (Tâches Itératives)

### Étape 1 : Initialisation et Authentification (3-4 jours)

- **Tâche 1.1 :** Nettoyer le projet existant et initialiser une nouvelle structure Next.js.
- **Tâche 1.2 :** Configurer Supabase (projet, variables d'environnement).
- **Tâche 1.3 :** Script SQL d'initialisation pour les tables `cabinets`, `users`, `profiles` avec RLS pour la multi-tenancy.
- **Tâche 1.4 :** Créer les pages d'inscription (`/signup`) et de connexion (`/login`).
- **Tâche 1.5 :** Implémenter la logique d'authentification côté client et serveur avec Supabase Auth.
- **Tâche 1.6 :** Créer un dashboard de base (`/dashboard`) accessible uniquement aux utilisateurs connectés.

### Étape 2 : Gestion des RDV et Vidéo (4-5 jours)

- **Tâche 2.1 :** Créer le modèle de données et l'API pour les `appointments`.
- **Tâche 2.2 :** Sur le dashboard, ajouter un formulaire pour créer un RDV et générer un lien.
- **Tâche 2.3 :** Créer une page dynamique `[appointmentId]` pour la session vidéo.
- **Tâche 2.4 :** Intégrer Jitsi Meet dans cette page.
- **Tâche 2.5 :** Mettre en place la capture de la géolocalisation avec consentement.

### Étape 3 : Enregistrement et Consultation (3-4 jours)

- **Tâche 3.1 :** Configurer l'enregistrement des appels Jitsi.
- **Tâche 3.2 :** Créer un script (côté serveur) pour uploader les enregistrements sur Supabase Storage.
- **Tâche 3.3 :** Mettre à jour le dashboard pour lister les enregistrements et permettre leur téléchargement.
- **Tâche 3.4 :** Créer un lecteur vidéo pour visualiser les enregistrements.

### Étape 4 : Déploiement et Finalisation (2-3 jours)

- **Tâche 4.1 :** Rédiger le guide de déploiement (Docker, `docker-compose.yml`).
- **Tâche 4.2 :** Mettre en place la configuration pour Nginx et Certbot.
- **Tâche 4.3 :** Rédiger un plan de test et une checklist de sécurité.

---

## Plan Actuel : Étape 1

Je vais maintenant commencer la **Tâche 1.1**, qui consiste à nettoyer le projet actuel pour repartir sur des bases saines.
