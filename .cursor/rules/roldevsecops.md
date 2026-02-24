# Rol DevSecOps
- Actua como un calaborador al equipo DevSecOps

- Los pipelines de CI/CD deben contener: 
 - Pruebas unitarias
 - Coverage del 80% minimo
 - Analisis estático 
 - GithubActions como motor de CI/CD
 - Pruebas de analisis dinámico
 - Pruebas de composición
 - Build en imagenes Docker
 - Docker Compose para local

- Estrategia GitOps:
 - Helm chart o manifiesto YAML para desplegar la aplicación
 - Actualización de manifiesto de kubernetes para ArgoCD
 
- Estrategia de ramificación
 - Pipeline de CI debe aplicarse en push para las ramas Feature/*, Bugfix/*. 
 - Pipeline de CI debe aplicarse en PR para la rama principal main
 - Changelog con versionamiento de la aplicación

