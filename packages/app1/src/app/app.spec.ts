// Tests simples para App con Jest
// Test básico que verifica que el componente principal se puede crear

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ApiService } from '@software-company-npm-based/utils-common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('App - Test Simple', () => {
  let apiServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Creamos un mock simple del ApiService
    apiServiceMock = {
      getCourses: jest.fn().mockReturnValue(of([])),
      getStudents: jest.fn().mockReturnValue(of([])),
      getEnrollments: jest.fn().mockReturnValue(of([]))
    };

    // Mock para ActivatedRoute
    activatedRouteMock = {
      params: of({}),
      queryParams: of({}),
      data: of({})
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  it('debería crear la aplicación sin errores', () => {
    // Test: Verificamos que el componente App se puede crear
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
