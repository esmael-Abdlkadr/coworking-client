FROM node:20
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install 
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev"]