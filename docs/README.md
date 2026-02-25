# Documentación

## Arquitectura del Pipeline CI

El archivo **`arquitectura-pipeline.drawio`** describe el flujo del pipeline de CI/CD (GitHub Actions).

### Cómo abrirlo

- **draw.io Desktop:** [https://github.com/jgraph/drawio-desktop/releases](https://github.com/jgraph/drawio-desktop/releases)
- **Web (diagrams.net):** [https://app.diagrams.net/](https://app.diagrams.net/) → Abrir → seleccionar `arquitectura-pipeline.drawio`
- **VS Code:** extensión "Draw.io Integration" y abrir el `.drawio`

### Contenido del diagrama

1. **Trigger:** push a `Feature/**` o `Bugfix/**`, o pull request a `main`.
2. **Análisis estático y SCA:** ESLint + npm audit (vulnerabilidades en dependencias).
3. **Pruebas unitarias y coverage 80%:** tests con c8, artefacto `coverage-report`.
4. **Docker Build y Trivy:** build de la imagen y escaneo de vulnerabilidades (OS y librerías).
5. **DAST (OWASP ZAP Baseline):** análisis dinámico contra la API en ejecución, artefacto `zap-dast-report`.

Las flechas indican el orden y las dependencias (`needs`) entre jobs.

---

## Pipeline CD (despliegue)

El workflow **`.github/workflows/cd.yml`** se ejecuta **solo de forma manual** (Actions → CD Pipeline → Run workflow).

### Qué hace

1. **Build y push a Docker Hub:** construye la imagen, la etiqueta con el SHA del commit (`<sha>` y `sha-<short_sha>`) y la sube a `docker.io/<DOCKERHUB_USERNAME>/devsecops-app-nodejs`.
2. **Actualizar manifiesto Kubernetes:** modifica `k8s/deployment.yaml` con la nueva imagen (tag = SHA del commit), hace commit y push para que ArgoCD sincronice el despliegue.

### Secrets necesarios

En el repositorio (Settings → Secrets and variables → Actions) configura:

| Secret               | Descripción                                      |
|----------------------|--------------------------------------------------|
| `DOCKERHUB_USERNAME` | Usuario de Docker Hub                           |
| `DOCKERHUB_TOKEN`    | Token de acceso (Docker Hub → Account → Security)|
