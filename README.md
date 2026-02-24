# devsecops-app-nodejs

API CRUD de inventario de bicicletas en Node.js. Incluye pipeline CI/CD.

## Sin instalar Node (solo Docker)

No hace falta tener Node.js instalado. Todo se ejecuta dentro de contenedores:

```bash
# Construir y levantar la API
docker compose up --build

# La API queda en http://localhost:5001 (puerto 5001 → 5000 del contenedor)
```

**Ejecutar tests dentro de Docker:**

```bash
docker compose run --rm bicycle-app node --test tests/
```

**Con Node instalado localmente** (opcional): `npm install`, `npm start`, `npm test`.
