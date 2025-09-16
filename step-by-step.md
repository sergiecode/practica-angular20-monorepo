# 🚀 Guía Paso a Paso: Construcción de la Aplicación Angular Monorepo

Esta guía documenta el proceso completo para construir la aplicación de gestión de cursos y estudiantes usando Nx Angular Monorepo desde cero.

## 📋 Tabla de Contenidos

1. [Configuración Inicial del Workspace](#1-configuración-inicial-del-workspace)
2. [Creación de Aplicaciones](#2-creación-de-aplicaciones)
3. [Creación de Librerías](#3-creación-de-librerías)
4. [Desarrollo de Modelos de Datos](#4-desarrollo-de-modelos-de-datos)
5. [Implementación de Servicios](#5-implementación-de-servicios)
6. [Desarrollo de Componentes UI Compartidos](#6-desarrollo-de-componentes-ui-compartidos)
7. [Creación de Componentes de Aplicación](#7-creación-de-componentes-de-aplicación)
8. [Configuración de Rutas](#8-configuración-de-rutas)
9. [Configuración de la UI](#9-configuración-de-la-ui)
10. [Testing y Validación](#10-testing-y-validación)

---

## 1. Configuración Inicial del Workspace

### 1.1 Crear el Workspace Nx

```bash
npx create-nx-workspace@latest software-company
```

**Opciones seleccionadas:**
- Preset: `npm` (Package-based monorepo)
- Enable remote caching: `No` (puedes habilitarlo después con Nx Cloud)

### 1.2 Navegar al directorio y agregar Angular

```bash
cd software-company
npx nx add @nx/angular
```

Esta configuración inicial prepara el workspace para ser un monorepo Package-based, ideal para proyectos multi-tecnología.

---

## 2. Creación de Aplicaciones

### 2.1 Primera Aplicación (App de Estudiantes)

```bash
npx nx g @nx/angular:application packages/app1 --standalone --routing --style=css
```

**Propósito**: Aplicación para estudiantes donde pueden:
- Ver cursos disponibles
- Inscribirse en cursos
- Ver sus inscripciones

### 2.2 Segunda Aplicación (App de Profesores/Administradores)

```bash
npx nx g @nx/angular:application packages/app2 --standalone --routing --style=css
```

**Propósito**: Aplicación para profesores/administradores donde pueden:
- Gestionar cursos (crear, editar, eliminar)
- Ver inscripciones por curso
- Administrar estudiantes

### 2.3 Verificar las aplicaciones

```bash
# Ejecutar app1 (estudiantes)
npx nx serve app1 --port=4200

# Ejecutar app2 (profesores)
npx nx serve app2 --port=4201
```

---

## 3. Creación de Librerías

### 3.1 Librería de Componentes UI Compartidos

```bash
npx nx g @nx/angular:library packages/ui-shared --standalone
```

**Propósito**: Contiene componentes reutilizables como:
- `CourseCardComponent`: Tarjeta para mostrar información de cursos
- `ButtonComponent`: Botón con estilos consistentes
- `TableComponent`: Tabla reutilizable para mostrar datos

### 3.2 Librería de Utilidades Comunes

```bash
npx nx g @nx/js:lib packages/utils-common --bundler=tsc --linter=eslint --unitTestRunner=jest
```

**Propósito**: Contiene:
- Modelos de datos TypeScript (interfaces)
- Servicios compartidos (ApiService)
- Utilidades comunes

---

## 4. Desarrollo de Modelos de Datos

### 4.1 Modelo Course

**Archivo**: `packages/utils-common/src/lib/models/course.model.ts`

```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  teacher: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}
```

### 4.2 Modelo Student

**Archivo**: `packages/utils-common/src/lib/models/student.model.ts`

```typescript
export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface CreateStudentRequest {
  name: string;
  email: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {}
```

### 4.3 Modelo Enrollment

**Archivo**: `packages/utils-common/src/lib/models/enrollment.model.ts`

```typescript
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
}

export interface CreateEnrollmentRequest {
  studentId: string;
  courseId: string;
}

export interface EnrollmentWithDetails extends Enrollment {
  studentName: string;
  courseTitle: string;
}
```

### 4.4 Exportar modelos

**Archivo**: `packages/utils-common/src/lib/models/index.ts`

```typescript
export * from './course.model';
export * from './student.model';
export * from './enrollment.model';
```

---

## 5. Implementación de Servicios

### 5.1 ApiService

**Archivo**: `packages/utils-common/src/lib/services/api.service.ts`

Implementa métodos para:

**Gestión de Cursos:**
- `getCourses()`: Obtener todos los cursos
- `getCourse(id)`: Obtener curso por ID
- `createCourse()`: Crear nuevo curso
- `updateCourse()`: Actualizar curso
- `deleteCourse()`: Eliminar curso

**Gestión de Estudiantes:**
- `getStudents()`: Obtener todos los estudiantes
- `getStudent(id)`: Obtener estudiante por ID
- `createStudent()`: Crear nuevo estudiante
- `updateStudent()`: Actualizar estudiante
- `deleteStudent()`: Eliminar estudiante

**Gestión de Inscripciones:**
- `getEnrollments()`: Obtener todas las inscripciones
- `createEnrollment()`: Crear nueva inscripción
- `deleteEnrollment()`: Eliminar inscripción
- `getEnrollmentsByStudent()`: Inscripciones por estudiante
- `getEnrollmentsByCourse()`: Inscripciones por curso

### 5.2 Exportar servicios

**Archivo**: `packages/utils-common/src/lib/services/index.ts`

```typescript
export * from './api.service';
```

### 5.3 Punto de entrada principal

**Archivo**: `packages/utils-common/src/index.ts`

```typescript
export * from './lib/models';
export * from './lib/services';
```

---

## 6. Desarrollo de Componentes UI Compartidos

### 6.1 CourseCardComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/ui-shared/src/lib/components/course-card --standalone
```

**Funcionalidad**: Muestra información de un curso en formato de tarjeta reutilizable.

### 6.2 ButtonComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/ui-shared/src/lib/components/button --standalone
```

**Funcionalidad**: Botón reutilizable con estilos consistentes.

### 6.3 TableComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/ui-shared/src/lib/components/table --standalone
```

**Funcionalidad**: Tabla genérica para mostrar datos de forma consistente.

### 6.4 Exportar componentes

**Archivo**: `packages/ui-shared/src/lib/components/index.ts`

```typescript
export * from './course-card/course-card.component';
export * from './button/button.component';
export * from './table/table.component';
```

**Archivo**: `packages/ui-shared/src/index.ts`

```typescript
export * from './lib/components';
```

---

## 7. Creación de Componentes de Aplicación

### 7.1 App1 - Componentes para Estudiantes

#### 7.1.1 CoursesComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/app1/src/app/components/courses --standalone
```

**Funcionalidad:**
- Muestra lista de cursos disponibles
- Permite inscribirse en cursos
- Utiliza `CourseCardComponent` y `ButtonComponent`

#### 7.1.2 MyEnrollmentsComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/app1/src/app/components/my-enrollments --standalone
```

**Funcionalidad:**
- Muestra inscripciones del estudiante actual
- Permite cancelar inscripciones
- Utiliza `TableComponent` para mostrar datos

### 7.2 App2 - Componentes para Profesores/Administradores

#### 7.2.1 CourseManagementComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/app2/src/app/components/course-management --standalone
```

**Funcionalidad:**
- CRUD completo de cursos
- Formularios para crear/editar cursos
- Lista de cursos con opciones de gestión

#### 7.2.2 CourseEnrollmentsComponent

**Comando de generación:**
```bash
npx nx g @nx/angular:component packages/app2/src/app/components/course-enrollments --standalone
```

**Funcionalidad:**
- Vista de inscripciones por curso
- Estadísticas de inscripciones
- Gestión de inscripciones

---

## 8. Configuración de Rutas

### 8.1 Rutas de App1 (Estudiantes)

**Archivo**: `packages/app1/src/app/app.routes.ts`

```typescript
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { 
    path: '', 
    redirectTo: '/courses', 
    pathMatch: 'full' 
  },
  { 
    path: 'courses', 
    loadComponent: () => import('./components/courses/courses.component').then(m => m.CoursesComponent)
  },
  { 
    path: 'my-enrollments', 
    loadComponent: () => import('./components/my-enrollments/my-enrollments.component').then(m => m.MyEnrollmentsComponent)
  }
];
```

### 8.2 Rutas de App2 (Profesores)

**Archivo**: `packages/app2/src/app/app.routes.ts`

```typescript
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { 
    path: '', 
    redirectTo: '/courses', 
    pathMatch: 'full' 
  },
  { 
    path: 'courses', 
    loadComponent: () => import('./components/course-management/course-management.component').then(m => m.CourseManagementComponent)
  },
  { 
    path: 'course-enrollments', 
    loadComponent: () => import('./components/course-enrollments/course-enrollments.component').then(m => m.CourseEnrollmentsComponent)
  }
];
```

---

## 9. Configuración de la UI

### 9.1 Navegación en App1

**Archivo**: `packages/app1/src/app/app.html`

```html
<nav>
  <a routerLink="/courses">Cursos Disponibles</a>
  <a routerLink="/my-enrollments">Mis Inscripciones</a>
</nav>

<main>
  <router-outlet></router-outlet>
</main>
```

### 9.2 Navegación en App2

**Archivo**: `packages/app2/src/app/app.html`

```html
<nav>
  <a routerLink="/courses">Gestión de Cursos</a>
  <a routerLink="/course-enrollments">Inscripciones por Curso</a>
</nav>

<main>
  <router-outlet></router-outlet>
</main>
```

### 9.3 Configuración de Providers

En ambas aplicaciones, configurar los providers necesarios en `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ],
};
```

---

## 10. Testing y Validación

### 10.1 Ejecutar tests unitarios

```bash
# Test de toda la aplicación
npx nx run-many --target=test --all

# Test de una librería específica
npx nx test utils-common
npx nx test ui-shared

# Test de una aplicación específica
npx nx test app1
npx nx test app2
```

### 10.2 Verificar dependencias

```bash
# Visualizar el grafo de dependencias
npx nx graph
```

### 10.3 Lint y formato de código

```bash
# Linting
npx nx run-many --target=lint --all

# Lint específico
npx nx lint app1
```

### 10.4 Build de producción

```bash
# Build todas las aplicaciones
npx nx run-many --target=build --all

# Build específico
npx nx build app1
npx nx build app2
```

---

## 🎯 Arquitectura Final

```
software-company/
├── nx.json                           # Configuración de Nx
├── package.json                      # Dependencias del workspace
├── tsconfig.base.json               # Configuración TypeScript base
└── packages/
    ├── app1/                        # App de Estudiantes
    │   ├── src/app/
    │   │   ├── components/
    │   │   │   ├── courses/         # Lista de cursos + inscripción
    │   │   │   └── my-enrollments/  # Inscripciones del estudiante
    │   │   ├── app.routes.ts        # Rutas de estudiantes
    │   │   └── app.config.ts        # Configuración de la app
    │   └── project.json             # Configuración del proyecto
    ├── app2/                        # App de Profesores/Admin
    │   ├── src/app/
    │   │   ├── components/
    │   │   │   ├── course-management/     # CRUD de cursos
    │   │   │   └── course-enrollments/    # Ver inscripciones
    │   │   ├── app.routes.ts              # Rutas de admin
    │   │   └── app.config.ts              # Configuración de la app
    │   └── project.json                   # Configuración del proyecto
    ├── ui-shared/                   # Componentes UI compartidos
    │   ├── src/lib/components/
    │   │   ├── course-card/         # Tarjeta de curso
    │   │   ├── button/              # Botón reutilizable
    │   │   └── table/               # Tabla genérica
    │   └── project.json
    └── utils-common/                # Utilidades y modelos compartidos
        ├── src/lib/
        │   ├── models/              # Interfaces TypeScript
        │   │   ├── course.model.ts
        │   │   ├── student.model.ts
        │   │   └── enrollment.model.ts
        │   └── services/
        │       └── api.service.ts   # Servicio de API
        └── project.json
```

---

## 🚀 Comandos de Desarrollo

### Desarrollo

```bash
# Ejecutar aplicaciones en paralelo
npx nx serve app1 --port=4200
npx nx serve app2 --port=4201

# Modo desarrollo con recarga automática
npx nx serve app1 --host=0.0.0.0 --port=4200
```

### Construcción

```bash
# Build optimizado para producción
npx nx build app1 --configuration=production
npx nx build app2 --configuration=production
```

### Testing

```bash
# Tests en modo watch
npx nx test app1 --watch
npx nx test utils-common --watch

# Coverage report
npx nx test app1 --coverage
```

---

## 📚 Próximos Pasos

1. **Backend API**: Implementar API REST con Express.js o NestJS
2. **Autenticación**: Agregar JWT authentication
3. **Estado Global**: Implementar NgRx para manejo de estado
4. **PWA**: Convertir las apps en Progressive Web Apps
5. **Deployment**: Configurar CI/CD con GitHub Actions
6. **Nx Cloud**: Habilitar caché distribuido para builds más rápidos

---

## 💡 Mejores Prácticas Implementadas

- ✅ **Separación de responsabilidades**: Apps separadas por tipo de usuario
- ✅ **Reutilización de código**: Componentes UI y modelos compartidos
- ✅ **Lazy Loading**: Carga de componentes bajo demanda
- ✅ **TypeScript estricto**: Tipado fuerte en toda la aplicación
- ✅ **Standalone Components**: Arquitectura moderna de Angular
- ✅ **Monorepo organizado**: Estructura clara y escalable
- ✅ **Testing configurado**: Jest para todas las librerías y apps

Esta arquitectura proporciona una base sólida para escalar la aplicación y agregar nuevas funcionalidades de manera ordenada y mantenible.
