// Tests para los modelos de Student
// Estos tests verifican que las interfaces funcionen correctamente para estudiantes

import { Student, CreateStudentRequest, UpdateStudentRequest } from './student.model';

describe('Student Models', () => {
  describe('Student Interface', () => {
    it('debería crear un objeto Student válido con todas las propiedades requeridas', () => {
      // Arrange: Preparamos los datos de un estudiante
      const student: Student = {
        id: 'student-1',
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com'
      };

      // Assert: Verificamos que el objeto tenga las propiedades correctas
      expect(student.id).toBe('student-1');
      expect(student.name).toBe('Ana Martínez');
      expect(student.email).toBe('ana.martinez@email.com');
    });

    it('debería aceptar diferentes formatos de email válidos', () => {
      // Arrange: Creamos estudiantes con diferentes emails
      const student1: Student = {
        id: '1',
        name: 'Pedro Gómez',
        email: 'pedro@universidad.edu'
      };

      const student2: Student = {
        id: '2', 
        name: 'Laura Sánchez',
        email: 'laura.sanchez+curso@gmail.com'
      };

      // Assert: Verificamos que acepta diferentes formatos
      expect(student1.email).toContain('@');
      expect(student2.email).toContain('@');
      expect(typeof student1.email).toBe('string');
      expect(typeof student2.email).toBe('string');
    });
  });

  describe('CreateStudentRequest Interface', () => {
    it('debería crear una solicitud válida para registrar un estudiante', () => {
      // Arrange: Preparamos los datos para crear un estudiante
      const createRequest: CreateStudentRequest = {
        name: 'Roberto Silva',
        email: 'roberto.silva@email.com'
      };

      // Assert: Verificamos que tenga solo las propiedades necesarias
      expect(createRequest.name).toBe('Roberto Silva');
      expect(createRequest.email).toBe('roberto.silva@email.com');
      expect('id' in createRequest).toBe(false); // No debe incluir id
    });

    it('debería aceptar nombres con espacios y caracteres especiales', () => {
      // Arrange: Creamos un estudiante con nombre complejo
      const createRequest: CreateStudentRequest = {
        name: 'José María Hernández-López',
        email: 'jose.maria@universidad.es'
      };

      // Assert: Verificamos que acepta caracteres especiales
      expect(createRequest.name).toContain(' ');
      expect(createRequest.name).toContain('-');
      expect(createRequest.name).toContain('é');
    });
  });

  describe('UpdateStudentRequest Interface', () => {
    it('debería permitir actualizar solo el nombre del estudiante', () => {
      // Arrange: Preparamos una actualización parcial
      const updateRequest: UpdateStudentRequest = {
        name: 'Ana María Martínez'
      };

      // Assert: Verificamos que acepta propiedades opcionales
      expect(updateRequest.name).toBe('Ana María Martínez');
      expect(updateRequest.email).toBeUndefined();
    });

    it('debería permitir actualizar solo el email del estudiante', () => {
      // Arrange: Preparamos actualización de email
      const updateRequest: UpdateStudentRequest = {
        email: 'nuevo.email@universidad.com'
      };

      // Assert: Verificamos que acepta email opcional
      expect(updateRequest.email).toBe('nuevo.email@universidad.com');
      expect(updateRequest.name).toBeUndefined();
    });

    it('debería permitir actualizar ambas propiedades', () => {
      // Arrange: Preparamos una actualización completa
      const updateRequest: UpdateStudentRequest = {
        name: 'Carmen Rodríguez',
        email: 'carmen.rodriguez@nuevoemail.com'
      };

      // Assert: Verificamos que acepta ambas propiedades
      expect(updateRequest.name).toBe('Carmen Rodríguez');
      expect(updateRequest.email).toBe('carmen.rodriguez@nuevoemail.com');
    });

    it('debería permitir un objeto vacío para no actualizar nada', () => {
      // Arrange: Preparamos una actualización vacía
      const updateRequest: UpdateStudentRequest = {};

      // Assert: Verificamos que acepta objeto vacío
      expect(Object.keys(updateRequest)).toHaveLength(0);
    });
  });
});