# 1. Базовый образ
FROM node:18-alpine AS builder

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем только package.json и lock-файлы
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем всё остальное
COPY . .

# 6. Собираем проект
RUN npm run build

# 7. Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем сборку из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Устанавливаем только production-зависимости
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
