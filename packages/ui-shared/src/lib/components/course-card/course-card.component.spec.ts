// Tests para CourseCardComponent
// Estos tests verifican que el componente de tarjeta de curso funcione correctamente

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '@software-company-npm-based/utils-common';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  // Datos de prueba para un curso
  const mockCourse: Course = {
    id: 'course-1',
    title: 'Angular Fundamentals',
    description: 'Aprende los conceptos básicos de Angular desde cero',
    teacher: 'Dr. María González'
  };

  beforeEach(async () => {
    // Configuramos el módulo de testing antes de cada test
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent] // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    
    // Asignamos el curso mock como dato requerido
    component.course = mockCourse;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crear el componente correctamente', () => {
      // Assert: Verificamos que el componente se crea
      expect(component).toBeTruthy();
    });

    it('debería tener showActions como true por defecto', () => {
      // Assert: Verificamos el valor por defecto
      expect(component.showActions).toBe(true);
    });

    it('debería requerir la propiedad course', () => {
      // Assert: Verificamos que course está asignado
      expect(component.course).toBeTruthy();
      expect(component.course).toEqual(mockCourse);
    });
  });

  describe('Propiedades de entrada (@Input)', () => {
    it('debería aceptar un objeto Course válido', () => {
      // Arrange: Preparamos un nuevo curso
      const newCourse: Course = {
        id: 'course-2',
        title: 'React Advanced',
        description: 'Curso avanzado de React con TypeScript',
        teacher: 'Prof. Carlos Ruiz'
      };

      // Act: Asignamos el nuevo curso
      component.course = newCourse;
      fixture.detectChanges();

      // Assert: Verificamos que se asignó correctamente
      expect(component.course).toEqual(newCourse);
      expect(component.course.title).toBe('React Advanced');
    });

    it('debería permitir ocultar las acciones con showActions=false', () => {
      // Arrange & Act: Ocultamos las acciones
      component.showActions = false;
      fixture.detectChanges();

      // Assert: Verificamos que showActions es false
      expect(component.showActions).toBe(false);
    });

    it('debería permitir mostrar las acciones con showActions=true', () => {
      // Arrange & Act: Aseguramos que las acciones estén visibles
      component.showActions = true;
      fixture.detectChanges();

      // Assert: Verificamos que showActions es true
      expect(component.showActions).toBe(true);
    });
  });

  describe('Renderizado en el DOM', () => {
    it('debería mostrar el título del curso correctamente', () => {
      // Act: Obtenemos el elemento del título
      const titleElement = fixture.nativeElement.querySelector('.course-title');

      // Assert: Verificamos que muestra el título correcto
      expect(titleElement).toBeTruthy();
      expect(titleElement.textContent.trim()).toBe(mockCourse.title);
    });

    it('debería mostrar el nombre del profesor correctamente', () => {
      // Act: Obtenemos el elemento del profesor
      const teacherElement = fixture.nativeElement.querySelector('.course-teacher');

      // Assert: Verificamos que muestra el profesor correcto
      expect(teacherElement).toBeTruthy();
      expect(teacherElement.textContent.trim()).toBe(mockCourse.teacher);
    });

    it('debería mostrar la descripción del curso correctamente', () => {
      // Act: Obtenemos el elemento de la descripción
      const descriptionElement = fixture.nativeElement.querySelector('.course-description');

      // Assert: Verificamos que muestra la descripción correcta
      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.textContent.trim()).toBe(mockCourse.description);
    });

    it('debería mostrar la sección de acciones cuando showActions=true', () => {
      // Arrange: Aseguramos que showActions sea true
      component.showActions = true;
      fixture.detectChanges();

      // Act: Buscamos la sección de acciones
      const actionsElement = fixture.nativeElement.querySelector('.course-actions');

      // Assert: Verificamos que la sección existe
      expect(actionsElement).toBeTruthy();
    });

    it('NO debería mostrar la sección de acciones cuando showActions=false', () => {
      // Arrange: Ocultamos las acciones
      component.showActions = false;
      fixture.detectChanges();

      // Act: Buscamos la sección de acciones
      const actionsElement = fixture.nativeElement.querySelector('.course-actions');

      // Assert: Verificamos que la sección no existe
      expect(actionsElement).toBeNull();
    });

    it('debería tener la estructura HTML correcta con todas las clases CSS', () => {
      // Act: Obtenemos los elementos principales
      const cardElement = fixture.nativeElement.querySelector('.course-card');
      const headerElement = fixture.nativeElement.querySelector('.course-header');
      const bodyElement = fixture.nativeElement.querySelector('.course-body');

      // Assert: Verificamos que todos los elementos existen
      expect(cardElement).toBeTruthy();
      expect(headerElement).toBeTruthy();
      expect(bodyElement).toBeTruthy();
    });
  });

  describe('Actualización de datos', () => {
    it('debería actualizar el contenido cuando cambia el curso', () => {
      // Arrange: Preparamos un curso diferente
      const updatedCourse: Course = {
        id: 'course-updated',
        title: 'Vue.js Masterclass',
        description: 'Domina Vue.js 3 con Composition API',
        teacher: 'Ing. Ana López'
      };

      // Act: Actualizamos el curso
      component.course = updatedCourse;
      fixture.detectChanges();

      // Assert: Verificamos que el DOM se actualiza
      const titleElement = fixture.nativeElement.querySelector('.course-title');
      const teacherElement = fixture.nativeElement.querySelector('.course-teacher');
      const descriptionElement = fixture.nativeElement.querySelector('.course-description');

      expect(titleElement.textContent.trim()).toBe('Vue.js Masterclass');
      expect(teacherElement.textContent.trim()).toBe('Ing. Ana López');
      expect(descriptionElement.textContent.trim()).toBe('Domina Vue.js 3 con Composition API');
    });

    it('debería manejar cursos con strings vacíos', () => {
      // Arrange: Preparamos un curso con datos vacíos
      const emptyCourse: Course = {
        id: 'empty-course',
        title: '',
        description: '',
        teacher: ''
      };

      // Act: Asignamos el curso vacío
      component.course = emptyCourse;
      fixture.detectChanges();

      // Assert: Verificamos que no hay errores y los elementos existen
      const titleElement = fixture.nativeElement.querySelector('.course-title');
      const teacherElement = fixture.nativeElement.querySelector('.course-teacher');
      const descriptionElement = fixture.nativeElement.querySelector('.course-description');

      expect(titleElement.textContent.trim()).toBe('');
      expect(teacherElement.textContent.trim()).toBe('');
      expect(descriptionElement.textContent.trim()).toBe('');
    });

    it('debería manejar cursos con textos largos', () => {
      // Arrange: Preparamos un curso con textos largos
      const longTextCourse: Course = {
        id: 'long-course',
        title: 'Desarrollo Full Stack con JavaScript, TypeScript, Node.js, React, Angular y Base de Datos',
        description: 'Este es un curso muy completo que abarca múltiples tecnologías del ecosistema JavaScript, incluyendo frameworks frontend, backend con Node.js, bases de datos relacionales y no relacionales, testing, deployment y mucho más.',
        teacher: 'Dr. Francisco Javier González-Martínez de la Universidad Politécnica'
      };

      // Act: Asignamos el curso con textos largos
      component.course = longTextCourse;
      fixture.detectChanges();

      // Assert: Verificamos que se muestran correctamente
      const titleElement = fixture.nativeElement.querySelector('.course-title');
      const teacherElement = fixture.nativeElement.querySelector('.course-teacher');
      const descriptionElement = fixture.nativeElement.querySelector('.course-description');

      expect(titleElement.textContent.trim()).toContain('Desarrollo Full Stack');
      expect(teacherElement.textContent.trim()).toContain('Dr. Francisco Javier');
      expect(descriptionElement.textContent.trim()).toContain('Este es un curso muy completo');
    });
  });
});