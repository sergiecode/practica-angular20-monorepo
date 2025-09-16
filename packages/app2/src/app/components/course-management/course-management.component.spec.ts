// Tests para CourseManagementComponent
// Estos tests verifican que el componente de gestión de cursos funcione correctamente

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CourseManagementComponent } from './course-management.component';
import { ApiService } from '@software-company-npm-based/utils-common';

describe('CourseManagementComponent', () => {
  let component: CourseManagementComponent;
  let fixture: ComponentFixture<CourseManagementComponent>;

  beforeEach(async () => {
    // Creamos un spy object para ApiService
    const apiServiceSpy: Partial<ApiService> = {
      getCourses: jest.fn().mockReturnValue(of([])),
      createCourse: jest.fn().mockReturnValue(of({})),
      updateCourse: jest.fn().mockReturnValue(of({})),
      deleteCourse: jest.fn().mockReturnValue(of({}))
    };

    // Configuramos el módulo de testing
    await TestBed.configureTestingModule({
      imports: [CourseManagementComponent, FormsModule], // Componente standalone y FormsModule
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseManagementComponent);
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
      expect(component.loading).toBe(true);
      expect(component.isSubmitting).toBe(false);
      expect(component.editingCourse).toBeNull();
      expect(component.error).toBeNull();
      expect(component.courseForm).toEqual({
        title: '',
        description: '',
        teacher: ''
      });
    });

    it('debería configurar columnas de tabla correctamente', () => {
      // Assert: Verificamos la configuración de columnas
      expect(component.tableColumns).toBeDefined();
      expect(component.tableColumns.length).toBe(3);
      expect(component.tableColumns[0].key).toBe('title');
      expect(component.tableColumns[0].label).toBe('Título');
      expect(component.tableColumns[1].key).toBe('teacher');
      expect(component.tableColumns[2].key).toBe('description');
    });

    it('debería configurar acciones de tabla correctamente', () => {
      // Assert: Verificamos la configuración de acciones
      expect(component.tableActions).toBeDefined();
      expect(component.tableActions.length).toBe(2);
      expect(component.tableActions[0].label).toBe('Editar');
      expect(component.tableActions[1].label).toBe('Eliminar');
    });
  });

  describe('Métodos del componente', () => {
    it('debería tener método loadCourses', () => {
      // Assert: Verificamos que el método existe
      expect(component.loadCourses).toBeDefined();
      expect(typeof component.loadCourses).toBe('function');
    });

    it('debería tener método saveCourse', () => {
      // Assert: Verificamos que el método existe
      expect(component.saveCourse).toBeDefined();
      expect(typeof component.saveCourse).toBe('function');
    });

    it('debería tener método editCourse', () => {
      // Assert: Verificamos que el método existe
      expect(component.editCourse).toBeDefined();
      expect(typeof component.editCourse).toBe('function');
    });

    it('debería tener método deleteCourse', () => {
      // Assert: Verificamos que el método existe
      expect(component.deleteCourse).toBeDefined();
      expect(typeof component.deleteCourse).toBe('function');
    });

    it('debería tener método cancelEdit', () => {
      // Assert: Verificamos que el método existe
      expect(component.cancelEdit).toBeDefined();
      expect(typeof component.cancelEdit).toBe('function');
    });
  });

  describe('Ciclo de vida del componente', () => {
    it('debería llamar ngOnInit sin errores', () => {
      // Act: Simulamos la inicialización
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('Validaciones del formulario', () => {
    it('debería tener método isFormValid', () => {
      // Assert: Verificamos que el método existe
      expect(component.isFormValid).toBeDefined();
      expect(typeof component.isFormValid).toBe('function');
    });

    it('debería reportar formulario inválido cuando está vacío', () => {
      // Arrange: Formulario vacío
      component.courseForm = { title: '', description: '', teacher: '' };
      
      // Act & Assert: Verificamos que no es válido
      expect(component.isFormValid()).toBe(false);
    });

    it('debería reportar formulario válido cuando tiene datos', () => {
      // Arrange: Formulario con datos
      component.courseForm = { 
        title: 'Test Course', 
        description: 'Test Description', 
        teacher: 'Test Teacher' 
      };
      
      // Act & Assert: Verificamos que es válido
      expect(component.isFormValid()).toBe(true);
    });
  });
});