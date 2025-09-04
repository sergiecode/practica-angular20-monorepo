# Fundamentos de Monorepos y Nx con Angular

> 📚 **Documentación oficial**: [Angular Monorepo Tutorial (NX)](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial)

## 📋 Tabla de Contenidos

- [Conceptos Fundamentales](#conceptos-fundamentales)
- [¿Qué es un Monorepo?](#qué-es-un-monorepo)
- [¿Qué es Nx?](#qué-es-nx)
- [Arquitecturas de Software](#arquitecturas-de-software)
- [Ventajas del Ecosistema Nx](#ventajas-del-ecosistema-nx)
- [Tutorial Práctico](#tutorial-práctico)

---

## Conceptos Fundamentales

### 🏗️ ¿Qué es un Monorepo?

Un **monorepo** (monolithic repository) es una estrategia de desarrollo donde múltiples aplicaciones y librerías coexisten dentro de un único repositorio Git, manteniendo independencia funcional.

> 📖 **Recursos adicionales**: [Monorepo Tools](https://monorepo.tools/)

#### 🔄 Enfoque Tradicional: Repositorios Separados
```
📁 Organización Multi-Repo
├── 📦 app-ecommerce/
│   ├── package.json
│   ├── src/
│   └── .git/
├── 📦 app-admin/
│   ├── package.json
│   ├── src/
│   └── .git/
├── 📦 lib-ui-components/
│   ├── package.json
│   ├── src/
│   └── .git/
└── 📦 lib-utils/
    ├── package.json
    ├── src/
    └── .git/
```

**Desafíos:**
- ❌ Mantenimiento fragmentado
- ❌ Versionado complejo
- ❌ Duplicación de configuraciones
- ❌ CI/CD disperso

#### 🎯 Enfoque Monorepo: Centralizado y Organizado
```
📁 practica-angular-monorepo-nx/
├── 🚀 apps/
│   ├── ecommerce/
│   └── admin/
├── 📚 libs/
│   ├── ui-components/
│   └── utils/
├── ⚙️ nx.json
├── 📄 tsconfig.base.json
├── 📦 package.json
└── 🔧 .git/
```

**Beneficios:**
- ✅ Configuración centralizada
- ✅ Dependencias unificadas
- ✅ CI/CD optimizado
- ✅ Reutilización simplificada

---

## ⚡ ¿Qué es Nx?

**Nx** es una plataforma de desarrollo extensible que transforma cómo construimos aplicaciones modernas. No es solo una herramienta, es un ecosistema completo.

### 🎯 Filosofía de Nx

> *"Nx is a build system with first-class monorepo support and powerful integrations."*

### 🔧 Capacidades Principales

#### **1. Build System Inteligente**
- 🧠 **Computation Caching**: Evita rebuilds innecesarios
- 🔄 **Incremental Builds**: Solo compila lo que cambió
- ⚡ **Parallel Execution**: Múltiples tareas simultáneas

#### **2. Ecosystem de Plugins**
```typescript
// Tecnologías soportadas nativamente
const supportedTech = [
  'Angular', 'React', 'Vue', 'Node.js',
  'Next.js', 'Nest.js', 'Express',
  'Vite', 'Webpack', 'Jest', 'Cypress'
];
```

#### **3. Developer Experience**
- 📊 **Dependency Graph**: Visualización interactiva
- 🔍 **Code Generation**: Scaffolding automático
- 🛠️ **VS Code Extension**: Nx Console integrado

### 🚀 Arquitectura de Alto Rendimiento

#### **Local Computation Caching**
```bash
# Primera ejecución
nx build my-app  # 45 segundos

# Segunda ejecución (sin cambios)
nx build my-app  # < 1 segundo (desde cache)
```

#### **Distributed Task Execution (Nx Cloud)**
```bash
# Ejecuta tareas en paralelo en múltiples agentes
nx run-many --target=test --all --parallel=3
```

---

## 🏛️ Arquitecturas de Software Modernas

### 📊 Comparativa Detallada

| 🏗️ **Aspecto** | 🗿 **Monolito** | 🏢 **Monorepo** | 🌐 **Microservicios** |
|----------------|-----------------|------------------|----------------------|
| **Complejidad inicial** | 🟢 Baja | 🟡 Media | 🔴 Alta |
| **Escalabilidad de equipo** | 🔴 Limitada | 🟢 Excelente | 🟡 Media |
| **Tiempo de desarrollo** | 🟢 Rápido inicio | 🟡 Setup inicial | 🔴 Setup complejo |
| **Mantenimiento** | 🔴 Difícil a escala | 🟢 Centralizado | 🔴 Distribuido |
| **Testing** | 🟢 Simple | 🟢 Unificado | 🔴 Complejo |
| **Deployment** | 🟢 Simple | 🟡 Coordinado | 🔴 Orquestado |
| **Performance** | 🟡 Variable | 🟢 Optimizado | 🟡 Network overhead |

### 🎯 Estrategias de Versionado

#### **🗿 Monolito: Versionado Unificado**
```json
{
  "name": "mi-app-monolitica",
  "version": "2.1.0",
  "description": "Aplicación completa en un solo paquete"
}
```

#### **🏢 Monorepo: Versionado Coordinado**
```json
// Workspace root
{
  "name": "mi-workspace",
  "version": "1.0.0",
  "workspaces": ["apps/*", "libs/*"]
}

// Librería interna
{
  "name": "@workspace/ui-components",
  "version": "0.3.2"
}
```

#### **🌐 Microservicios: Versionado Independiente**
```bash
# Cada servicio evoluciona independientemente
user-service@2.1.0
product-service@1.8.3
payment-service@3.0.1
```

---

## 🎯 Ventajas del Ecosistema Nx

### 🚀 **Productividad del Desarrollador**

#### **Code Sharing & Reusabilidad**
```typescript
// Librería compartida
@workspace/ui-components
├── Button/
├── Modal/
├── DataTable/
└── Forms/

// Uso en múltiples apps
import { Button, Modal } from '@workspace/ui-components';
```

#### **Desarrollo Acelerado**
- 🎨 **Generators**: Scaffolding automático de código
- 🔄 **Hot Reload**: Desarrollo en tiempo real
- 🧩 **Plugin Ecosystem**: Integración con cualquier tech stack

### ⚡ **Optimización de Performance**

#### **Computation Caching**
```bash
# Cache local automático
✅ Task cache hit: nx build ui-components
✅ Task cache hit: nx test shared-utils
✅ Task cache hit: nx lint admin-app

# Resultado: 90% reducción en tiempo de build
```

#### **Affected Commands**
```bash
# Solo ejecuta lo que realmente cambió
nx affected:test     # Solo tests de proyectos afectados
nx affected:build    # Solo builds necesarios
nx affected:e2e      # Solo e2e de apps modificadas
```

### 🏢 **Escalabilidad Empresarial**

#### **Team Boundaries**
```json
// nx.json - Configuración de boundaries
{
  "implicitDependencies": {
    "apps/ecommerce": ["libs/cart", "libs/payment"],
    "apps/admin": ["libs/users", "libs/analytics"]
  }
}
```

#### **Distributed Caching (Nx Cloud)**
- ☁️ Cache compartido entre desarrolladores
- 🔄 CI/CD optimizado con cache remoto
- 📊 Analytics de performance del workspace

---

## 🛠️ Tutorial Práctico

> 💡 **Prerrequisitos**: Node.js 18+, npm/yarn, conocimientos básicos de Angular

### 🚀 Setup Inicial

#### **1. Crear Workspace**
```bash
npx create-nx-workspace@latest practica-angular-monorepo-nx
```

**Configuración interactiva:**
```bash
? What to create in the new workspace › Angular
? Application name › demo
? Which bundler would you like to use? › esbuild
? Default stylesheet format › CSS
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? › No
? Test runner to use for end to end (e2e) tests › none
? Set up CI with caching, distribution and test deflaking › github
```

#### **2. Explorar Estructura**
```
practica-angular-monorepo-nx/
├── 🎯 apps/
│   └── demo/                    # Aplicación principal
├── 📚 libs/                     # Librerías compartidas (vacío inicialmente)
├── ⚙️ tools/                    # Scripts y herramientas custom
├── 📄 nx.json                   # Configuración de Nx
├── 📄 tsconfig.base.json        # TypeScript base config
├── 📦 package.json              # Dependencias del workspace
└── 🔧 .github/workflows/        # CI/CD automático
```

### 🎨 **Creación de Librerías**

#### **3. Librería de UI Components**
```bash
npx nx g @nx/angular:library libs/ui-components --standalone
```

#### **4. Librería de Utilidades**
```bash
npx nx g @nx/js:lib libs/shared-utils --bundler=tsc
```

### 🔗 **Integración y Uso**

#### **5. Generar Componente en Librería**
```bash
npx nx g @nx/angular:component libs/ui-components/src/lib/hero --standalone
```

#### **6. Implementar en Aplicación**
```typescript
// apps/demo/src/app/app.component.ts
import { Component } from '@angular/core';
import { HeroComponent } from '@practica-angular-monorepo-nx/ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent],
  template: `
    <lib-hero
      title="Bienvenido al Monorepo"
      subtitle="Desarrollando con Nx y Angular"
      cta="Comenzar Tutorial"
    ></lib-hero>
  `
})
export class AppComponent {}
```

### 📊 **Comandos Esenciales**

#### **Development**
```bash
# Servir aplicación
nx serve demo                    # http://localhost:4200

# Desarrollo paralelo
nx serve demo --port=4200 &
nx serve admin --port=4201 &
```

#### **Testing & Quality**
```bash
# Testing específico
nx test demo
nx test ui-components

# Testing masivo
nx run-many --target=test --all

# Linting
nx lint demo
nx affected:lint
```

#### **Build & Deploy**
```bash
# Build optimizado
nx build demo --prod

# Build affected
nx affected:build
```

#### **Visualización**
```bash
# Dependency graph
nx graph

# Project details
nx show project demo --web
```

### 🎯 **Optimizaciones Avanzadas**

#### **Cache Configuration**
```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "cache": true,
      "inputs": ["production", "^production"]
    },
    "test": {
      "cache": true,
      "inputs": ["default", "^default", "{workspaceRoot}/jest.config.ts"]
    }
  }
}
```

#### **Task Dependencies**
```json
{
  "targets": {
    "build": {
      "dependsOn": ["^build"],
      "executor": "@nx/angular:webpack-browser"
    }
  }
}
```

---

## 🎓 Conclusiones

### ✅ **Cuándo Usar Monorepo + Nx**
- 🏢 Equipos medianos a grandes (5+ desarrolladores)
- 🔄 Múltiples aplicaciones con código compartido
- 🎯 Necesidad de mantenimiento centralizado
- ⚡ Requerimientos de CI/CD optimizado

### ❌ **Cuándo NO Usar**
- 👤 Proyectos individuales pequeños
- 🚀 Prototipos o MVPs rápidos
- 🔄 Equipos sin experiencia en tooling complejo

### 🚀 **Próximos Pasos**
1. 📖 Explorar [Nx Documentation](https://nx.dev)
2. 🎮 Experimentar con [Nx Playground](https://nx.dev/playground)
3. 🔌 Investigar plugins específicos de tu stack
4. ☁️ Configurar [Nx Cloud](https://cloud.nx.app) para CI/CD optimizado

---

💡 **¿Necesitas implementación específica?** Consulta el [README.md](./README.md) para guías paso a paso de Package-based y Standalone monorepos.
