// Tests para CourseEnrollmentsComponent
// Estos tests verifican que el componente de inscripciones por curso funcione correctamente

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CourseEnrollmentsComponent } from './course-enrollments.component';
import { ApiService } from '@software-company-npm-based/utils-common';

describe('CourseEnrollmentsComponent', () => {
  let component: CourseEnrollmentsComponent;
  let fixture: ComponentFixture<CourseEnrollmentsComponent>;

  beforeEach(async () => {
    // Creamos un spy object para ApiService
    const apiServiceSpy: Partial<ApiService> = {
      getCourses: jest.fn().mockReturnValue(of([])),
      getCourseEnrollmentsWithDetails: jest.fn().mockReturnValue(of([]))
    };

    // Configuramos el módulo de testing
    await TestBed.configureTestingModule({
      imports: [CourseEnrollmentsComponent, FormsModule], // Componente standalone y FormsModule
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEnrollmentsComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialización del componente', () => {
    it('debería crear el componente correctamente', () => {
      // Assert: Verificamos que el componente se crea
      expect(component).toBeTruthy();
    });

    it('debería tener valores iniciales correctos', () => {
      // Assert: Verificamos los valores iniciales
      expect(component.courses).toEqual([]);
      expect(component.enrollments).toEqual([]);
      expect(component.selectedCourseId).toBe('');
      expect(component.selectedCourse).toBeNull();
      expect(component.loadingCourses).toBe(true);
      expect(component.loadingEnrollments).toBe(false);
      expect(component.error).toBeNull();
    });

    it('debería configurar columnas de tabla correctamente', () => {
      // Assert: Verificamos la configuración de columnas para estudiantes
      expect(component.tableColumns).toBeDefined();
      expect(component.tableColumns.length).toBe(3);
      expect(component.tableColumns[0].key).toBe('student.name');
      expect(component.tableColumns[0].label).toBe('Nombre del Estudiante');
      expect(component.tableColumns[1].key).toBe('student.email');
      expect(component.tableColumns[2].key).toBe('date');
    });
  });

  describe('Métodos del componente', () => {
    it('debería tener método loadCourses', () => {
      // Assert: Verificamos que el método existe
      expect(component.loadCourses).toBeDefined();
      expect(typeof component.loadCourses).toBe('function');
    });

    it('debería tener método loadEnrollments', () => {
      // Assert: Verificamos que el método existe
      expect(component.loadEnrollments).toBeDefined();
      expect(typeof component.loadEnrollments).toBe('function');
    });

    it('debería tener método onCourseChange', () => {
      // Assert: Verificamos que el método existe
      expect(component.onCourseChange).toBeDefined();
      expect(typeof component.onCourseChange).toBe('function');
    });
  });

  describe('Ciclo de vida del componente', () => {
    it('debería llamar ngOnInit sin errores', () => {
      // Act: Simulamos la inicialización
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });
});