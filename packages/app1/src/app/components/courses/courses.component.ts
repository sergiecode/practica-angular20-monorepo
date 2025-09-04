import { Component, OnInit } from '@angular/core';
import { 
  Course, 
  ApiService, 
  CreateEnrollmentRequest 
} from '@software-company-npm-based/utils-common';
import { 
  CourseCardComponent, 
  ButtonComponent 
} from '@software-company-npm-based/ui-shared';

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent, ButtonComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error: string | null = null;
  isEnrolling = false;

  // Simulamos un estudiante fijo para el ejemplo
  private readonly CURRENT_STUDENT_ID = '1';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.error = 'No se pudieron cargar los cursos. Verifica que el servidor esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  enrollInCourse(courseId: string): void {
    if (this.isEnrolling) return;

    this.isEnrolling = true;

    // Primero verificamos si el estudiante ya está inscrito
    this.apiService.isStudentEnrolledInCourse(this.CURRENT_STUDENT_ID, courseId).subscribe({
      next: (isEnrolled) => {
        if (isEnrolled) {
          alert('Ya estás inscrito en este curso');
          this.isEnrolling = false;
          return;
        }

        // Crear la inscripción
        const enrollmentRequest: CreateEnrollmentRequest = {
          studentId: this.CURRENT_STUDENT_ID,
          courseId: courseId,
          date: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        };

        this.apiService.createEnrollment(enrollmentRequest).subscribe({
          next: () => {
            alert('¡Te has inscrito exitosamente en el curso!');
            this.isEnrolling = false;
          },
          error: (error) => {
            console.error('Error enrolling in course:', error);
            alert('Error al inscribirse en el curso. Inténtalo de nuevo.');
            this.isEnrolling = false;
          }
        });
      },
      error: (error) => {
        console.error('Error checking enrollment:', error);
        alert('Error al verificar la inscripción. Inténtalo de nuevo.');
        this.isEnrolling = false;
      }
    });
  }
}
