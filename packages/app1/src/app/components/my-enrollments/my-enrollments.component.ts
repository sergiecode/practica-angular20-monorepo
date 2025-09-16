import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { SimpleUserService } from '../../app';

@Component({
  selector: 'app-my-enrollments',
  imports: [TableComponent, ButtonComponent],
  templateUrl: './my-enrollments.component.html',
  styleUrl: './my-enrollments.component.css'
})
export class MyEnrollmentsComponent implements OnInit, OnDestroy {
  enrollments: EnrollmentWithDetails[] = [];
  loading = true;
  error: string | null = null;
  
  private unsubscribe?: () => void;

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
      onClick: (enrollment: unknown) => this.cancelEnrollment(enrollment as EnrollmentWithDetails)
    }
  ];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadEnrollments();
    
    // Suscribirse a cambios de usuario
    this.unsubscribe = SimpleUserService.subscribe(() => {
      // Cuando cambia el usuario, recargar las inscripciones
      this.loadEnrollments();
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private getCurrentStudentId(): string {
    return SimpleUserService.getCurrentUserId();
  }

  loadEnrollments(): void {
    this.loading = true;
    this.error = null;
    const currentStudentId = this.getCurrentStudentId();

    this.apiService.getStudentEnrollmentsWithDetails(currentStudentId).subscribe({
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
