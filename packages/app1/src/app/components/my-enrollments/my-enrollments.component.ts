import { Component, OnInit } from '@angular/core';
import { 
  EnrollmentWithDetails, 
  ApiService 
} from '@software-company-npm-based/utils-common';
import { 
  TableComponent, 
  TableColumn, 
  TableAction,
  ButtonComponent 
} from '@software-company-npm-based/ui-shared';

@Component({
  selector: 'app-my-enrollments',
  imports: [TableComponent, ButtonComponent],
  templateUrl: './my-enrollments.component.html',
  styleUrl: './my-enrollments.component.css'
})
export class MyEnrollmentsComponent implements OnInit {
  enrollments: EnrollmentWithDetails[] = [];
  loading = true;
  error: string | null = null;

  // Configuración de la tabla
  tableColumns: TableColumn[] = [
    { key: 'course.title', label: 'Curso', sortable: true },
    { key: 'course.teacher', label: 'Profesor', sortable: true },
    { key: 'date', label: 'Fecha de Inscripción', sortable: true },
    { key: 'course.description', label: 'Descripción' }
  ];

  tableActions: TableAction[] = [
    {
      label: 'Cancelar',
      variant: 'danger',
      onClick: (enrollment: EnrollmentWithDetails) => this.cancelEnrollment(enrollment)
    }
  ];

  // Simulamos un estudiante fijo para el ejemplo
  private readonly CURRENT_STUDENT_ID = '1';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getStudentEnrollmentsWithDetails(this.CURRENT_STUDENT_ID).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        this.error = 'No se pudieron cargar tus inscripciones. Verifica que el servidor esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  cancelEnrollment(enrollment: EnrollmentWithDetails): void {
    const courseName = enrollment.course?.title || 'el curso';
    
    if (confirm(`¿Estás seguro de que quieres cancelar tu inscripción en "${courseName}"?`)) {
      this.apiService.deleteEnrollment(enrollment.id).subscribe({
        next: () => {
          alert('Inscripción cancelada exitosamente');
          this.loadEnrollments(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error canceling enrollment:', error);
          alert('Error al cancelar la inscripción. Inténtalo de nuevo.');
        }
      });
    }
  }
}
