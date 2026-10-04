# ArtesaniasPeru – Frontend (Capa de Presentación)

Angular 20 (standalone + signals). Consume la API REST de WildFly (PC2).

## Estructura
- `src/catalog/` – contexto del catálogo (domain / application / infrastructure / presentation)
- `src/shared/` – i18n, navbar y utilidades comunes
- `src/locales/` – es.json / en.json

## Ejecutar
```bash
npm install
npm start          # http://localhost:4200  (proxy /api -> WildFly en Azure)
npm run build:prod # genera dist/ArtesaniasPeru/browser
```

## Endpoints usados
GET/POST `/api/categorias`, DELETE `/api/categorias/{id}`.
Productos y pedidos usan datos locales hasta que existan `/api/productos` y `/api/pedidos`.

## Despliegue en Nginx (VM de Presentación)
Copiar `dist/ArtesaniasPeru/browser/*` a `/var/www/html` y agregar en el server block:
```
location / { try_files $uri $uri/ /index.html; }
location /api/ { proxy_pass http://20.97.241.69:8080/artesanias-test/api/; }
```
