# devsecops-app-nodejs

API CRUD de inventario de bicicletas en Node.js. Incluye pipeline CI/CD.

## Sin instalar Node (solo Docker)

No hace falta tener Node.js instalado. Todo se ejecuta dentro de contenedores:

```bash
# Construir y levantar la API
docker compose up --build

# La API queda en http://localhost:5001 (puerto 5001 → 5000 del contenedor)
```

**Ejecutar tests (lint + pruebas unitarias + coverage 80%) sin instalar Node:**

```bash
docker compose run test
```

Verás en la terminal todos los logs: ESLint, resultados de cada test y el reporte de cobertura. Si algo falla, el comando termina con error.

Alternativa (tests durante el build, menos legible):  
`docker build --target test . --progress=plain`

**Con Node instalado localmente** (opcional): `npm install`, `npm start`, `npm test`, `npm run test:coverage`.
