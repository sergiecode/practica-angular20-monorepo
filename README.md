# Tutorial Angular 20 Monorepo con NX

🚀 **Tutorial completo de Nx + Angular (2025)**

Este tutorial cubre las dos principales estrategias para trabajar con Nx + Angular en un monorepo moderno y escalable.

## 📋 Tabla de Contenidos

- [Estrategias de Monorepo](#estrategias-de-monorepo)
- [Opción 1: Package-based Monorepo](#opción-1-package-based-monorepo)
- [Opción 2: Angular Standalone Monorepo](#opción-2-angular-standalone-monorepo)
- [Comparación de Estrategias](#comparación-de-estrategias)
- [Mejores Prácticas](#mejores-prácticas)
- [Build, Versionado y Deployment](#build-versionado-y-deployment)
- [Acerca del Autor](#acerca-del-autor)

## Estrategias de Monorepo

### 🏗️ Package-based Monorepo
Apps y librerías organizadas dentro de `packages/` - ideal para proyectos multi-tecnología.

### 🎯 Angular Standalone Monorepo  
Enfocado exclusivamente en Angular, con la aplicación principal en `src/`.

> ⚠️ **Importante**: Siempre especifica la carpeta (`packages/` o `src/`) al crear proyectos para mantener una organización limpia.

## Opción 1: Package-based Monorepo

> 💡 **Ideal para**: Proyectos que necesitan combinar Angular con otras tecnologías (React, Node.js, librerías TypeScript puras, etc.)

### 🚀 Configuración Inicial

#### 1. Crear el workspace
```bash
npx create-nx-workspace@latest software-company --preset=npm
cd software-company
```

#### 2. Agregar el plugin de Angular
```bash
npx nx add @nx/angular
```

### 📱 Creación de Aplicaciones

#### 3. Primera aplicación
```bash
npx nx g @nx/angular:application packages/app1 --standalone --routing --style=css
```

**Ejecutar la aplicación:**
```bash
npx nx serve app1 --port=4200
```

#### 4. Segunda aplicación
```bash
npx nx g @nx/angular:application packages/app2 --standalone --routing --style=css
npx nx serve app2 --port=4201
```

### 📚 Creación de Librerías

#### 5. Librería Angular (componentes/servicios)
```bash
npx nx g @nx/angular:library packages/ui-shared --standalone
```
> Selecciona **jest** como test runner cuando se solicite.

#### 6. Librería TypeScript pura (utils, modelos, helpers)
```bash
npx nx g @nx/js:lib packages/utils-common --bundler=tsc --linter=eslint --unitTestRunner=jest
```

#### 7. Visualizar dependencias
```bash
npx nx graph
```

### 📁 Estructura del Proyecto
```
software-company/
├── nx.json
├── package.json
└── packages/
    ├── app1/
    ├── app2/
    ├── ui-shared/
    └── utils-common/
```

## 🟦 Agregar React con TypeScript al monorepo Nx

### 1. Instalar plugin de React

Primero necesitás el plugin oficial de React de Nx:

```bash
npx nx add @nx/react
```

Esto habilita los generadores (g) de aplicaciones y librerías en React.

### 2. Crear una aplicación React + TypeScript

Vamos a crearla dentro de `packages/` para mantener la estructura ordenada:

```bash
npx nx g @nx/react:application packages/react-app --style=css --bundler=vite --routing
```

👉 **Explicación de flags:**

- `--style=css` → estilos con CSS plano.
- `--bundler=vite` → más rápido que webpack, recomendado.
- `--routing` → agrega React Router configurado.

Ahora podés correrla con:

```bash
npx nx serve react-app --port=4300
```

### 3. Crear un helper compartido

Vamos a crear un helper en TypeScript que tanto Angular como React puedan usar. Por ejemplo una librería `utils-helpers`:

```bash
npx nx g @nx/js:lib packages/utils-helpers --bundler=tsc --unitTestRunner=jest
```

Esto te genera una librería en `packages/utils-helpers`.

Dentro de `packages/utils-helpers/src/lib/format-date.ts` podés poner algo simple:

```typescript
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
```

### 4. Usar el helper en React

En `packages/react-app/src/app/app.tsx`:

```typescript
import { formatDate } from '@software-company/utils-helpers';

export function App() {
  const today = new Date();
  return (
    <div>
      <h1>React App usando helper compartido</h1>
      <p>Hoy es: {formatDate(today)}</p>
    </div>
  );
}
```

### 5. Usar el helper en Angular

En `packages/app1/src/app/app.ts`:

```typescript
import { Component } from '@angular/core';
import { formatDate } from '@software-company/utils-helpers';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Angular App usando helper compartido</h1>
    <p>Hoy es: {{ today }}</p>
  `,
})
export class AppComponent {
  today = formatDate(new Date());
}
```

### 6. Visualizar dependencias

Para comprobar cómo Nx entiende la relación entre los proyectos:

```bash
npx nx graph
```

Vas a ver las apps Angular + React conectadas con la librería `utils-helpers`. 🎯

## Opción 2: Angular Standalone Monorepo

> 💡 **Ideal para**: Proyectos 100% Angular con una aplicación principal tipo shell

### 🚀 Configuración Inicial

#### 1. Crear el workspace
```bash
npx create-nx-workspace@latest
```

**Configuración recomendada:**
- **Stack**: `angular`
- **Tipo**: `standalone`
- **Bundler**: `esbuild`
- **Styles**: `css`
- **SSR/SSG**: `No`
- **Unit test**: `jest`
- **E2E**: `none`
- **CI**: `github`

**Resultado:**
- `src/` contiene la aplicación principal
- CI configurado en `.github/workflows/ci.yml`
- Nx Cloud conectado automáticamente

### 📱 Aplicaciones Adicionales

#### 2. Crear aplicaciones dentro de src/
```bash
# Primera aplicación adicional
npx nx g @nx/angular:application src/app1 --standalone --routing --style=css

# Segunda aplicación adicional  
npx nx g @nx/angular:application src/app2 --standalone --routing --style=css
```

**Ejecutar aplicaciones:**
```bash
npx nx serve app1 --port=4200
npx nx serve app2 --port=4201
```

### � Creación de Librerías

#### 3. Librerías especializadas
```bash
# Librería Angular (componentes UI)
npx nx g @nx/angular:library src/ui-shared --standalone

# Librería TypeScript pura (utilidades)
npx nx g @nx/js:lib src/utils-common --bundler=tsc --linter=eslint --unitTestRunner=jest
```

### 🔗 Importación de Librerías

#### 4. Ejemplo de uso en app1
```typescript
import { myHelper } from 'utils-common';
import { UiSharedComponent } from 'ui-shared';
```

#### 5. Visualizar dependencias
```bash
npx nx graph
```

### 📁 Estructura del Proyecto
```
software-company/
├── nx.json
├── package.json
└── src/
    ├── app/            # aplicación principal
    ├── app1/
    ├── app2/
    ├── ui-shared/
    └── utils-common/
```

## Comparación de Estrategias

| 📊 Aspecto | Package-based | Angular Standalone |
|------------|---------------|-------------------|
| **Carpeta sugerida** | `packages/` | `src/` |
| **App inicial** | Ninguna | Sí, Angular shell |
| **Organización** | Manual, flexible | Automática con `src/` |
| **Uso ideal** | Monorepo multi-stack | Monorepo 100% Angular |
| **Flexibilidad** | Alta (múltiples tecnologías) | Media (enfocado en Angular) |

## Mejores Prácticas

### ✅ Recomendaciones Generales

1. **Organización consistente**: 
   - Usa siempre `packages/` en package-based
   - Usa siempre `src/` en standalone

2. **Naming conventions**:
   - Apps: nombres descriptivos y cortos
   - Libs: prefijos por dominio (`ui-`, `data-`, `utils-`)

3. **Estructura de dependencias**:
   - Mantén las dependencias unidireccionales
   - Evita dependencias circulares
   - Usa el graph de Nx para visualizar

### 🎯 Decisión de Estrategia

**Elige Package-based si:**
- Necesitas múltiples tecnologías (React + Angular + Node.js)
- Quieres máxima flexibilidad de organización
- Tienes equipos especializados por tecnología

**Elige Angular Standalone si:**
- Tu proyecto es 100% Angular
- Quieres una configuración más simple
- Prefieres convenciones predefinidas

---

## Build, Versionado y Deployment

### 🛠️ Construcción de Aplicaciones y Librerías

#### **¿Se construyen por separado?**

**✅ Sí**, cada aplicación y librería se construye de forma independiente debido a:

- 🎯 **Dependencias específicas**: Cada proyecto maneja sus propias dependencias y configuraciones
- ⚡ **Optimización**: Aprovecha la caché de Nx para evitar reconstrucciones innecesarias
- 📈 **Escalabilidad**: Facilita la gestión de proyectos grandes y complejos

**Comandos de construcción:**
```bash
# Construir una aplicación específica
npx nx build app1

# Construir una librería específica
npx nx build ui-shared

# Construir múltiples proyectos
npx nx run-many --target=build --projects=app1,app2,ui-shared
```

#### **¿Se versionan por separado?**

**✅ Sí**, es recomendable versionar cada proyecto independientemente usando **Nx Release**:

**Beneficios del versionado independiente:**
- 📋 **Commits convencionales**: Automatiza el versionado basado en mensajes de commit
- 📝 **Changelog automático**: Genera changelogs automáticamente
- 🚀 **Publicación independiente**: Facilita releases por proyecto

**Configuración de Nx Release:**
```bash
# Configurar Nx Release
npx nx g @nx/js:release-configuration

# Generar una nueva release
npx nx release
```

> 📖 **Documentación oficial**: [Nx Release](https://nx.dev/features/manage-releases)

#### **¿Se despliegan por separado?**

**✅ Sí**, cada proyecto se despliega independientemente:

**Proceso de deployment:**

1. **Construir el proyecto**:
   ```bash
   npx nx build <nombre-del-proyecto>
   ```

2. **Generar archivos con dependencias**:
   ```bash
   npx nx build <nombre-del-proyecto> --with-deps
   ```

3. **Desplegar usando tu plataforma preferida**:
   - ☁️ **AWS S3/CloudFront**
   - 🌐 **Netlify/Vercel**
   - 🔵 **Azure Static Web Apps**
   - 🐳 **Docker containers**

### ☁️ Integración con Nx Cloud

**Nx Cloud** proporciona capacidades avanzadas de optimización:

#### **🚀 Características Principales**

- 📦 **Caché distribuida**: Reutiliza resultados entre desarrolladores y CI/CD
- ⚡ **Ejecución distribuida**: Ejecuta tareas en paralelo en múltiples agentes
- 📊 **Monitoreo avanzado**: Visualización de performance y bottlenecks
- 🔧 **CI/CD optimizado**: Reduce significativamente los tiempos de build

#### **⚙️ Configuración**

```bash
# Conectar workspace a Nx Cloud
npx nx connect-to-nx-cloud

# Verificar configuración
npx nx show project <nombre-proyecto> --web
```

#### **📈 Beneficios de Performance**

```bash
# Sin Nx Cloud
Build Time: ~15 minutos

# Con Nx Cloud (cache hit)
Build Time: ~2 minutos (87% reducción)
```

> 📖 **Más información**: [Nx Cloud Documentation](https://nx.dev/nx-cloud)

### ✅ Resumen de Estrategias

| 🏗️ **Aspecto** | 📦 **Enfoque** | 🎯 **Beneficio** |
|-----------------|----------------|-------------------|
| **Construcción** | Independiente por proyecto | Optimización y caché eficiente |
| **Versionado** | Semantic versioning individual | Control granular de releases |
| **Deployment** | Por aplicación/librería | Despliegues focalizados y rápidos |
| **CI/CD** | Nx Cloud + pipelines optimizados | Reducción drástica de tiempos |

---

## Acerca del Autor

### 👨‍💻 Sergie Code
*Software Engineer especializado en enseñanza de programación*

**Sígueme en:**
- � [YouTube](https://www.youtube.com/@SergieCode)
- 💼 [LinkedIn](https://www.linkedin.com/in/sergiecode/)
- 🐙 [GitHub](https://github.com/sergiecode)
- 📸 [Instagram](https://www.instagram.com/sergiecode)
- � [Twitter](https://twitter.com/sergiecode)
- 🧵 [Threads](https://www.threads.net/@sergiecode)
- � [TikTok](https://www.tiktok.com/@sergiecode)
- � [Facebook](https://www.facebook.com/sergiecodeok)
