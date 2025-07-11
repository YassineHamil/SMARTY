FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --omit=dev

# Copier le code source
COPY src/ ./src/

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Démarrer l'application en mode production
CMD ["npm", "start"] 