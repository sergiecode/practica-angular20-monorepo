// Tests simples para CoursesComponent con Jest
// Estos tests verifican la funcionalidad básica del componente de cursos

import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { ApiService } from '@software-company-npm-based/utils-common';
import { of } from 'rxjs';

describe('CoursesComponent - Tests Simples', () => {
  let component: CoursesComponent;
  let fixture: any;
  let apiServiceMock: any;

  beforeEach(async () => {
    // Creamos un mock simple del ApiService
    apiServiceMock = {
      getCourses: jest.fn().mockReturnValue(of([])),
      isStudentEnrolledInCourse: jest.fn().mockReturnValue(of(false)),
      createEnrollment: jest.fn().mockReturnValue(of({}))
    };

    // Configuramos el módulo de testing
    await TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  describe('Pruebas básicas del componente', () => {
    it('debería crear el componente correctamente', () => {
      // Test: Verificamos que el componente se crea sin errores
      expect(component).toBeTruthy();
    });

    it('debería tener propiedades iniciales definidas', () => {
      // Test: Verificamos que las propiedades estén inicializadas
      expect(component.courses).toEqual([]);
      expect(component.loading).toBe(true);
      expect(component.error).toBe(null);
    });

    it('debería tener el constructor configurado', () => {
      // Test: Verificamos que el constructor funciona
      expect(component.isEnrolling).toBe(false);
      expect(component.enrollmentStatus).toEqual({});
    });
  });

  describe('Métodos del componente', () => {
    it('debería tener el método enrollInCourse', () => {
      // Test: Verificamos que el método existe
      expect(typeof component.enrollInCourse).toBe('function');
    });

    it('debería poder llamar enrollInCourse con un string', () => {
      // Test: Verificamos que podemos llamar el método con parámetros correctos
      expect(() => component.enrollInCourse('1')).not.toThrow();
    });

    it('debería tener el método ngOnInit', () => {
      // Test: Verificamos que implementa OnInit
      expect(typeof component.ngOnInit).toBe('function');
    });

    it('debería tener el método ngOnDestroy', () => {
      // Test: Verificamos que implementa OnDestroy
      expect(typeof component.ngOnDestroy).toBe('function');
    });
  });

  describe('Ciclo de vida del componente', () => {
    it('debería inicializar sin errores', () => {
      // Test: Verificamos que ngOnInit no causa errores
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería destruir sin errores', () => {
      // Test: Verificamos que ngOnDestroy no causa errores
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });
});