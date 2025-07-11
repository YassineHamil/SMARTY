# 🏭 Application de Monitoring de Capteurs Industriels

## 📋 Description

Application Node.js modulaire basée sur les principes **Domain-Driven Design (DDD)** pour le monitoring de capteurs industriels en temps réel.

## 🏗️ Architecture

L'application suit une architecture hexagonale avec séparation claire des responsabilités :

```
Backend/
├── src/
│   ├── app.js                           # Point d'entrée principal
│   ├── domain/                          # Couche Domaine (Logique Métier)
│   │   ├── user/
│   │   │   ├── entities/User.js
│   │   │   ├── repositories/UserRepository.js
│   │   │   └── services/UserService.js
│   │   ├── sensor/
│   │   │   ├── entities/
│   │   │   │   ├── Sensor.js
│   │   │   │   └── SensorData.js
│   │   │   ├── repositories/
│   │   │   └── services/
│   │   ├── machine/
│   │   │   ├── entities/Machine.js
│   │   │   └── services/
│   │   ├── alert/
│   │   │   ├── entities/Alert.js
│   │   │   └── services/
│   │   └── company/
│   ├── application/                     # Couche Application (Cas d'Usage)
│   │   ├── services/
│   │   │   ├── SensorDataService.js
│   │   │   ├── AlertService.js
│   │   │   └── ...
│   │   └── dto/
│   ├── infrastructure/                  # Couche Infrastructure
│   │   ├── database/
│   │   │   ├── mongodb.js
│   │   │   └── models/
│   │   │       ├── UserModel.js
│   │   │       ├── SensorModel.js
│   │   │       └── ...

│   │   ├── websocket/
│   │   │   └── socket.js
│   │   ├── logging/
│   │   │   └── logger.js
│   │   ├── jobs/
│   │   │   └── cronManager.js
│   │   └── web/
│   │       ├── routes/
│   │       └── middlewares/
│   └── interfaces/                      # Couche Interface (Contrôleurs)
│       └── web/
│           └── controllers/
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🎯 Fonctionnalités Principales

### 📊 Monitoring en Temps Réel
- Réception de données de capteurs (température, humidité, pression, mouvement)
- Surveillance de l'état des machines
- Notifications en temps réel via WebSocket

### 🚨 Système d'Alertes
- Détection automatique d'inactivité des machines
- Alertes d'erreurs machine
- Notifications de fin de production
- Système de gravité des alertes (low, medium, high, critical)

### 👥 Gestion Multi-Entreprises
- Gestion des utilisateurs et entreprises
- Rôles administrateurs par entreprise
- Isolation des données par entreprise


## 🛠️ Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Docker** - Containerisation

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Docker et Docker Compose

### Installation et Lancement

```bash
# Cloner le projet
git clone <repo-url>
cd Backend

# Démarrer avec Docker Compose en mode Développement 
npm run docker:devn












