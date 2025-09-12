import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  ApiService, 
  Student 
} from '@software-company-npm-based/utils-common';

// Servicio simple para manejar el usuario actual
export class SimpleUserService {
  private static currentUserId = '1';
  private static listeners: ((id: string) => void)[] = [];
  
  static getCurrentUserId(): string {
    return this.currentUserId;
  }
  
  static setCurrentUserId(id: string): void {
    this.currentUserId = id;
    // Notificar a todos los listeners
    this.listeners.forEach(listener => listener(id));
  }

  static subscribe(listener: (id: string) => void): () => void {
    this.listeners.push(listener);
    // Retornar función para desuscribirse
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'Plataforma de Estudiantes';
  students: Student[] = [];
  currentStudentId = '1'; // Valor por defecto simple

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.apiService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        // Si hay estudiantes, seleccionar el primero por defecto
        if (students.length > 0) {
          this.currentStudentId = students[0].id;
          SimpleUserService.setCurrentUserId(this.currentStudentId);
        }
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  onStudentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.currentStudentId = target.value;
    SimpleUserService.setCurrentUserId(this.currentStudentId);
  }
}
