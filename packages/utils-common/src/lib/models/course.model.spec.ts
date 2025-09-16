// Tests para los modelos de Course
// Estos tests verifican que las interfaces y tipos funcionen correctamente

import { Course, CreateCourseRequest, UpdateCourseRequest } from './course.model';

describe('Course Models', () => {
  describe('Course Interface', () => {
    it('debería crear un objeto Course válido con todas las propiedades requeridas', () => {
      // Arrange: Preparamos los datos de prueba
      const course: Course = {
        id: '1',
        title: 'Angular Básico',
        description: 'Curso introductorio de Angular',
        teacher: 'Juan Pérez'
      };

      // Assert: Verificamos que el objeto tenga las propiedades correctas
      expect(course.id).toBe('1');
      expect(course.title).toBe('Angular Básico');
      expect(course.description).toBe('Curso introductorio de Angular');
      expect(course.teacher).toBe('Juan Pérez');
    });

    it('debería permitir valores de string para todas las propiedades', () => {
      // Arrange: Creamos un curso con strings vacíos para probar flexibilidad
      const course: Course = {
        id: '',
        title: '',
        description: '',
        teacher: ''
      };

      // Assert: Verificamos que acepta strings vacíos
      expect(typeof course.id).toBe('string');
      expect(typeof course.title).toBe('string');
      expect(typeof course.description).toBe('string');
      expect(typeof course.teacher).toBe('string');
    });
  });

  describe('CreateCourseRequest Interface', () => {
    it('debería crear una solicitud válida para crear un curso', () => {
      // Arrange: Preparamos los datos para crear un curso
      const createRequest: CreateCourseRequest = {
        title: 'React Avanzado',
        description: 'Curso avanzado de React con hooks',
        teacher: 'María García'
      };

      // Assert: Verificamos que tenga solo las propiedades necesarias (sin id)
      expect(createRequest.title).toBe('React Avanzado');
      expect(createRequest.description).toBe('Curso avanzado de React con hooks');
      expect(createRequest.teacher).toBe('María García');
      expect('id' in createRequest).toBe(false); // No debe tener id
    });
  });

  describe('UpdateCourseRequest Interface', () => {
    it('debería permitir actualizar solo el título del curso', () => {
      // Arrange: Preparamos una actualización parcial
      const updateRequest: UpdateCourseRequest = {
        title: 'Angular Intermedio'
      };

      // Assert: Verificamos que acepta propiedades opcionales
      expect(updateRequest.title).toBe('Angular Intermedio');
      expect(updateRequest.description).toBeUndefined();
      expect(updateRequest.teacher).toBeUndefined();
    });

    it('debería permitir actualizar todas las propiedades', () => {
      // Arrange: Preparamos una actualización completa
      const updateRequest: UpdateCourseRequest = {
        title: 'Vue.js Completo',
        description: 'Curso completo de Vue.js con Vuex',
        teacher: 'Carlos López'
      };

      // Assert: Verificamos que acepta todas las propiedades
      expect(updateRequest.title).toBe('Vue.js Completo');
      expect(updateRequest.description).toBe('Curso completo de Vue.js con Vuex');
      expect(updateRequest.teacher).toBe('Carlos López');
    });

    it('debería permitir un objeto vacío para no actualizar nada', () => {
      // Arrange: Preparamos una actualización vacía
      const updateRequest: UpdateCourseRequest = {};

      // Assert: Verificamos que acepta objeto vacío
      expect(Object.keys(updateRequest)).toHaveLength(0);
    });
  });
});