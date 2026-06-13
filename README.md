# ⚡ Breaking Training Pro App (Underconstruction)⚡

**Breaking Training Pro** es una plataforma web premium e innovadora diseñada para la gestión, reserva y optimización del entrenamiento físico de bailarines y atletas de alto rendimiento. 

Originada desde mis más grandes pasiones, el entrenamiento de Break Dance y los Powermoves , esta aplicación fue completamente personalizada y refactorizada para alinearse con la disciplina del Breaking, integrando una arquitectura moderna, modular y escalable.

---

## 🚀 Características Principales

*   **Sistema de Autenticación Seguro:** Registro e inicio de sesión integrados con Firebase Authentication (Soporte nativo para credenciales tradicionales y Login con Google).
*   **Diseño Moderno y Responsive:** Interfaz móvil optimizada (Mobile-First) utilizando Tailwind CSS v4 para una experiencia fluida e intuitiva.
*   **Arquitectura Escalable:** Separación limpia de componentes, hooks personalizados para el manejo del estado global de autenticación, y servicios de backend aislados.

---

## 🛠️ Stack Tecnológico

El proyecto utiliza las herramientas más modernas y eficientes del desarrollo web actual:

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Compilador/Empaquetador:** [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (Compilación incremental ultra rápida basada en Rust)
*   **Biblioteca de UI:** [React 19](https://react.dev/)
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Backend as a Service (BaaS):** [Firebase v12](https://firebase.google.com/) (Auth, Firestore, Storage)
*   **Lenguaje:** [TypeScript](https://www.typescript.org/)

---
Deploy App : https://breaking-trainning-pro.netlify.app/

## 📂 Estructura del Proyecto

La arquitectura del proyecto sigue las mejores prácticas de Next.js, manteniendo la modularidad en cada nivel:

```text
src/
├── app/                  # Rutas de la aplicación (App Router)
│   ├── layout.tsx        # Layout global y proveedores de contexto
│   └── page.tsx          # Pantalla principal (Formulario de Acceso/Registro)
├── context/              # Proveedores de contexto global (React Context)
│   └── Providers.tsx     # Envoltorio de estados globales de la app
├── hook/                 # Hooks personalizados (useAuthActions, etc.)
└── lib/                  # Inicialización y configuración de servicios de terceros
    └── firebase.ts       # Inicialización modular de Firebase (Auth, DB, Storage)
