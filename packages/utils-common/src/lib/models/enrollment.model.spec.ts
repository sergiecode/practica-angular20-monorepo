// Tests para los modelos de Enrollment
// Estos tests verifican que las interfaces de inscripciones funcionen correctamente

import { 
  Enrollment, 
  CreateEnrollmentRequest, 
  EnrollmentWithDetails 
} from './enrollment.model';

describe('Enrollment Models', () => {
  describe('Enrollment Interface', () => {
    it('debería crear un objeto Enrollment válido con todas las propiedades requeridas', () => {
      // Arrange: Preparamos los datos de una inscripción
      const enrollment: Enrollment = {
        id: 'enrollment-1',
        studentId: 'student-123',
        courseId: 'course-456',
        date: '2025-09-15'
      };

      // Assert: Verificamos que el objeto tenga las propiedades correctas
      expect(enrollment.id).toBe('enrollment-1');
      expect(enrollment.studentId).toBe('student-123');
      expect(enrollment.courseId).toBe('course-456');
      expect(enrollment.date).toBe('2025-09-15');
    });

    it('debería aceptar diferentes formatos de fecha como string', () => {
      // Arrange: Creamos inscripciones con diferentes formatos de fecha
      const enrollment1: Enrollment = {
        id: '1',
        studentId: 'student-1',
        courseId: 'course-1',
        date: '2025-09-15T10:30:00Z'
      };

      const enrollment2: Enrollment = {
        id: '2',
        studentId: 'student-2', 
        courseId: 'course-2',
        date: '15/09/2025'
      };

      // Assert: Verificamos que acepta diferentes formatos
      expect(typeof enrollment1.date).toBe('string');
      expect(typeof enrollment2.date).toBe('string');
      expect(enrollment1.date).toContain('2025');
      expect(enrollment2.date).toContain('2025');
    });
  });

  describe('CreateEnrollmentRequest Interface', () => {
    it('debería crear una solicitud válida para inscribir un estudiante', () => {
      // Arrange: Preparamos los datos para crear una inscripción
      const createRequest: CreateEnrollmentRequest = {
        studentId: 'student-789',
        courseId: 'course-101',
        date: '2025-09-15'
      };

      // Assert: Verificamos que tenga solo las propiedades necesarias
      expect(createRequest.studentId).toBe('student-789');
      expect(createRequest.courseId).toBe('course-101');
      expect(createRequest.date).toBe('2025-09-15');
      expect('id' in createRequest).toBe(false); // No debe incluir id
    });

    it('debería aceptar fecha actual para inscripciones inmediatas', () => {
      // Arrange: Creamos una inscripción con fecha actual
      const today = new Date().toISOString().split('T')[0];
      const createRequest: CreateEnrollmentRequest = {
        studentId: 'student-current',
        courseId: 'course-current',
        date: today
      };

      // Assert: Verificamos que acepta fecha actual
      expect(createRequest.date).toBe(today);
      expect(createRequest.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('EnrollmentWithDetails Interface', () => {
    it('debería extender Enrollment con detalles opcionales del estudiante', () => {
      // Arrange: Preparamos una inscripción con detalles del estudiante
      const enrollmentWithDetails: EnrollmentWithDetails = {
        id: 'enrollment-detail-1',
        studentId: 'student-123',
        courseId: 'course-456',
        date: '2025-09-15',
        student: {
          id: 'student-123',
          name: 'María González',
          email: 'maria.gonzalez@email.com'
        }
      };

      // Assert: Verificamos que tenga propiedades base y detalles
      expect(enrollmentWithDetails.id).toBe('enrollment-detail-1');
      expect(enrollmentWithDetails.student?.name).toBe('María González');
      expect(enrollmentWithDetails.student?.email).toBe('maria.gonzalez@email.com');
      expect(enrollmentWithDetails.course).toBeUndefined();
    });

    it('debería extender Enrollment con detalles opcionales del curso', () => {
      // Arrange: Preparamos una inscripción con detalles del curso
      const enrollmentWithDetails: EnrollmentWithDetails = {
        id: 'enrollment-detail-2',
        studentId: 'student-456',
        courseId: 'course-789',
        date: '2025-09-15',
        course: {
          id: 'course-789',
          title: 'JavaScript Avanzado',
          description: 'Curso avanzado de JavaScript ES6+',
          teacher: 'Prof. Carlos Ruiz'
        }
      };

      // Assert: Verificamos que tenga detalles del curso
      expect(enrollmentWithDetails.course?.title).toBe('JavaScript Avanzado');
      expect(enrollmentWithDetails.course?.teacher).toBe('Prof. Carlos Ruiz');
      expect(enrollmentWithDetails.student).toBeUndefined();
    });

    it('debería funcionar con ambos detalles (estudiante y curso)', () => {
      // Arrange: Preparamos inscripción completa con todos los detalles
      const fullEnrollment: EnrollmentWithDetails = {
        id: 'enrollment-full',
        studentId: 'student-full',
        courseId: 'course-full',
        date: '2025-09-15',
        student: {
          id: 'student-full',
          name: 'Diego Martín',
          email: 'diego.martin@email.com'
        },
        course: {
          id: 'course-full',
          title: 'Python para Data Science',
          description: 'Análisis de datos con Python',
          teacher: 'Dra. Elena Vásquez'
        }
      };

      // Assert: Verificamos que tenga todos los detalles
      expect(fullEnrollment.student?.name).toBe('Diego Martín');
      expect(fullEnrollment.course?.title).toBe('Python para Data Science');
      expect(fullEnrollment.course?.teacher).toBe('Dra. Elena Vásquez');
    });

    it('debería funcionar sin detalles opcionales (solo datos base)', () => {
      // Arrange: Preparamos inscripción sin detalles opcionales
      const basicEnrollment: EnrollmentWithDetails = {
        id: 'enrollment-basic',
        studentId: 'student-basic',
        courseId: 'course-basic',
        date: '2025-09-15'
      };

      // Assert: Verificamos que funciona sin detalles opcionales
      expect(basicEnrollment.id).toBe('enrollment-basic');
      expect(basicEnrollment.student).toBeUndefined();
      expect(basicEnrollment.course).toBeUndefined();
    });
  });
});