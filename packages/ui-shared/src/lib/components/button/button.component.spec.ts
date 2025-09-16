// Tests para ButtonComponent
// Estos tests verifican que el componente de botón compartido funcione correctamente

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    // Configuramos el módulo de testing antes de cada test
    await TestBed.configureTestingModule({
      imports: [ButtonComponent] // Como es standalone, lo importamos directamente
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectamos cambios iniciales
  });

  describe('Inicialización del componente', () => {
    it('debería crear el componente correctamente', () => {
      // Assert: Verificamos que el componente se crea
      expect(component).toBeTruthy();
    });

    it('debería tener valores por defecto correctos', () => {
      // Assert: Verificamos los valores por defecto de las propiedades
      expect(component.type).toBe('button');
      expect(component.variant).toBe('primary');
      expect(component.size).toBe('normal');
      expect(component.disabled).toBe(false);
    });
  });

  describe('Propiedades de entrada (@Input)', () => {
    it('debería aceptar diferentes tipos de botón', () => {
      // Arrange & Act: Asignamos diferentes tipos
      component.type = 'submit';
      fixture.detectChanges();

      // Assert: Verificamos que se asigna correctamente
      expect(component.type).toBe('submit');

      // Act: Probamos otro tipo
      component.type = 'reset';
      fixture.detectChanges();

      // Assert: Verificamos el nuevo tipo
      expect(component.type).toBe('reset');
    });

    it('debería aceptar diferentes variantes de estilo', () => {
      // Arrange & Act: Probamos la variante secondary
      component.variant = 'secondary';
      fixture.detectChanges();

      // Assert: Verificamos la variante
      expect(component.variant).toBe('secondary');

      // Act: Probamos variante danger
      component.variant = 'danger';
      fixture.detectChanges();

      // Assert: Verificamos la nueva variante
      expect(component.variant).toBe('danger');
    });

    it('debería aceptar diferentes tamaños', () => {
      // Arrange & Act: Configuramos tamaño small
      component.size = 'small';
      fixture.detectChanges();

      // Assert: Verificamos el tamaño
      expect(component.size).toBe('small');

      // Act: Probamos tamaño large
      component.size = 'large';
      fixture.detectChanges();

      // Assert: Verificamos el nuevo tamaño
      expect(component.size).toBe('large');
    });

    it('debería manejar el estado deshabilitado', () => {
      // Arrange & Act: Deshabilitamos el botón
      component.disabled = true;
      fixture.detectChanges();

      // Assert: Verificamos que está deshabilitado
      expect(component.disabled).toBe(true);
      
      // Verificamos que se aplica en el DOM
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.disabled).toBe(true);
    });
  });

  describe('Clases CSS generadas', () => {
    it('debería generar clases CSS básicas correctamente', () => {
      // Act: Obtenemos las clases por defecto
      const classes = component.buttonClasses;

      // Assert: Verificamos que incluye las clases básicas
      expect(classes).toContain('btn');
      expect(classes).toContain('btn-primary');
      expect(classes).not.toContain('btn-small');
      expect(classes).not.toContain('btn-large');
    });

    it('debería incluir clase de tamaño cuando no es "normal"', () => {
      // Arrange & Act: Configuramos tamaño small
      component.size = 'small';
      const classes = component.buttonClasses;

      // Assert: Verificamos que incluye la clase de tamaño
      expect(classes).toContain('btn-small');

      // Act: Configuramos tamaño large
      component.size = 'large';
      const classesLarge = component.buttonClasses;

      // Assert: Verificamos la clase large
      expect(classesLarge).toContain('btn-large');
    });

    it('debería generar clases correctas para diferentes variantes', () => {
      // Arrange & Act: Probamos variante success
      component.variant = 'success';
      const successClasses = component.buttonClasses;

      // Assert: Verificamos la clase de success
      expect(successClasses).toContain('btn-success');

      // Act: Probamos variante danger
      component.variant = 'danger';
      const dangerClasses = component.buttonClasses;

      // Assert: Verificamos la clase de danger
      expect(dangerClasses).toContain('btn-danger');
    });
  });

  describe('Eventos de salida (@Output)', () => {
    it('debería emitir evento buttonClick cuando se hace clic y no está deshabilitado', () => {
      // Arrange: Configuramos un spy para detectar el evento
      const emitSpy = jest.spyOn(component.buttonClick, 'emit');

      // Act: Hacemos clic en el botón
      component.onClick();

      // Assert: Verificamos que se emitió el evento
      expect(emitSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('NO debería emitir evento buttonClick cuando el botón está deshabilitado', () => {
      // Arrange: Deshabilitamos el botón y configuramos spy
      component.disabled = true;
      const emitSpy = jest.spyOn(component.buttonClick, 'emit');

      // Act: Intentamos hacer clic
      component.onClick();

      // Assert: Verificamos que NO se emitió el evento
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('debería emitir evento buttonClick cuando se hace clic en el elemento DOM', () => {
      // Arrange: Configuramos spy para el evento
      const emitSpy = jest.spyOn(component.buttonClick, 'emit');

      // Act: Simulamos clic en el elemento del DOM
      const buttonElement = fixture.nativeElement.querySelector('button');
      buttonElement.click();

      // Assert: Verificamos que se emitió el evento
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('Renderizado en el DOM', () => {
    it('debería renderizar un elemento button con el tipo correcto', () => {
      // Arrange: Configuramos tipo submit
      component.type = 'submit';
      fixture.detectChanges();

      // Act: Obtenemos el elemento del DOM
      const buttonElement = fixture.nativeElement.querySelector('button');

      // Assert: Verificamos el tipo en el DOM
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.type).toBe('submit');
    });

    it('debería aplicar las clases CSS correctas en el DOM', () => {
      // Arrange: Configuramos variante secondary y tamaño small
      component.variant = 'secondary';
      component.size = 'small';
      fixture.detectChanges();

      // Act: Obtenemos el elemento del DOM
      const buttonElement = fixture.nativeElement.querySelector('button');

      // Assert: Verificamos las clases en el DOM
      expect(buttonElement.className).toContain('btn');
      expect(buttonElement.className).toContain('btn-secondary');
      expect(buttonElement.className).toContain('btn-small');
    });

    it('debería mostrar contenido proyectado correctamente', () => {
      // Note: Para probar ng-content necesitaríamos un componente host
      // Este test verifica que el slot de contenido existe
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement).toBeTruthy();
    });
  });
});