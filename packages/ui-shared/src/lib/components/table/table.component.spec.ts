// Tests para TableComponent
// Estos tests verifican que el componente de tabla compartido funcione correctamente

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent, TableColumn, TableAction } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  // Datos de prueba
  const mockColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
    { key: 'status', label: 'Estado' }
  ];

  const mockData = [
    { id: '1', name: 'Juan Pérez', email: 'juan@email.com', status: 'Activo' },
    { id: '2', name: 'Ana García', email: 'ana@email.com', status: 'Inactivo' },
    { id: '3', name: 'Carlos López', email: 'carlos@email.com', status: 'Activo' }
  ];

  const mockActions: TableAction[] = [
    { 
      label: 'Editar', 
      variant: 'primary', 
      onClick: (item) => console.log('Editar', item) 
    },
    { 
      label: 'Eliminar', 
      variant: 'danger', 
      onClick: (item) => console.log('Eliminar', item) 
    }
  ];

  beforeEach(async () => {
    // Configuramos el módulo de testing
    await TestBed.configureTestingModule({
      imports: [TableComponent] // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    
    // Asignamos datos requeridos
    component.data = mockData;
    component.columns = mockColumns;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crear el componente correctamente', () => {
      // Assert: Verificamos que el componente se crea
      expect(component).toBeTruthy();
    });

    it('debería tener valores por defecto correctos', () => {
      // Assert: Verificamos valores por defecto
      expect(component.noDataMessage).toBe('No hay datos disponibles');
      expect(component.sortColumn).toBeNull();
      expect(component.sortDirection).toBe('asc');
    });

    it('debería requerir data y columns como propiedades obligatorias', () => {
      // Assert: Verificamos que las propiedades requeridas están asignadas
      expect(component.data).toBeTruthy();
      expect(component.columns).toBeTruthy();
      expect(component.data.length).toBeGreaterThan(0);
      expect(component.columns.length).toBeGreaterThan(0);
    });
  });

  describe('Propiedades de entrada (@Input)', () => {
    it('debería aceptar un array de datos', () => {
      // Arrange: Preparamos nuevos datos
      const newData = [
        { id: '4', name: 'María Rodríguez', email: 'maria@email.com', status: 'Activo' }
      ];

      // Act: Asignamos los nuevos datos
      component.data = newData;
      fixture.detectChanges();

      // Assert: Verificamos que se asignaron correctamente
      expect(component.data).toEqual(newData);
      expect(component.data.length).toBe(1);
    });

    it('debería aceptar un array de columnas con configuración', () => {
      // Arrange: Preparamos nuevas columnas
      const newColumns: TableColumn[] = [
        { key: 'title', label: 'Título', sortable: true },
        { key: 'description', label: 'Descripción' }
      ];

      // Act: Asignamos las nuevas columnas
      component.columns = newColumns;
      fixture.detectChanges();

      // Assert: Verificamos que se asignaron correctamente
      expect(component.columns).toEqual(newColumns);
      expect(component.columns[0].sortable).toBe(true);
      expect(component.columns[1].sortable).toBeUndefined();
    });

    it('debería aceptar acciones opcionales', () => {
      // Act: Asignamos acciones
      component.actions = mockActions;
      fixture.detectChanges();

      // Assert: Verificamos que se asignaron
      expect(component.actions).toEqual(mockActions);
      expect(component.actions?.length).toBe(2);
    });

    it('debería permitir personalizar el mensaje de "sin datos"', () => {
      // Act: Personalizamos el mensaje
      component.noDataMessage = 'No se encontraron registros';
      fixture.detectChanges();

      // Assert: Verificamos el mensaje personalizado
      expect(component.noDataMessage).toBe('No se encontraron registros');
    });
  });

  describe('Funcionalidad de ordenamiento', () => {
    it('debería ordenar datos cuando se hace clic en columna sortable', () => {
      // Arrange: Buscamos una columna sortable
      const sortableColumn = mockColumns.find(col => col.sortable);
      
      // Act: Hacemos clic para ordenar
      component.onSort(sortableColumn!);

      // Assert: Verificamos que se configuró el ordenamiento
      expect(component.sortColumn).toBe(sortableColumn!.key);
      expect(component.sortDirection).toBe('asc');
    });

    it('debería cambiar dirección de ordenamiento en clics sucesivos', () => {
      // Arrange: Configuramos ordenamiento inicial
      const column = mockColumns[0]; // ID column (sortable)
      component.onSort(column);

      // Act: Hacemos clic nuevamente en la misma columna
      component.onSort(column);

      // Assert: Verificamos que cambió a descendente
      expect(component.sortDirection).toBe('desc');

      // Act: Hacemos clic una tercera vez
      component.onSort(column);

      // Assert: Verificamos que volvió a ascendente
      expect(component.sortDirection).toBe('asc');
    });

    it('NO debería ordenar cuando la columna no es sortable', () => {
      // Arrange: Buscamos una columna no sortable
      const nonSortableColumn = mockColumns.find(col => !col.sortable);
      const originalSortColumn = component.sortColumn;

      // Act: Intentamos ordenar por columna no sortable
      component.onSort(nonSortableColumn!);

      // Assert: Verificamos que no cambió el ordenamiento
      expect(component.sortColumn).toBe(originalSortColumn);
    });

    it('debería emitir evento de ordenamiento', () => {
      // Arrange: Configuramos spy para el evento
      const sortSpy = jest.spyOn(component.sort, 'emit');
      const column = mockColumns[0];

      // Act: Ordenamos por la columna
      component.onSort(column);

      // Assert: Verificamos que se emitió el evento con datos correctos
      expect(sortSpy).toHaveBeenCalledWith({
        column: column.key,
        direction: 'asc'
      });
    });

    it('debería retornar datos ordenados correctamente', () => {
      // Arrange: Configuramos ordenamiento por nombre
      component.sortColumn = 'name';
      component.sortDirection = 'asc';

      // Act: Obtenemos datos ordenados
      const sortedData = component.sortedData;

      // Assert: Verificamos que están ordenados alfabéticamente
      expect(sortedData[0].name).toBe('Ana García');
      expect(sortedData[1].name).toBe('Carlos López');
      expect(sortedData[2].name).toBe('Juan Pérez');
    });

    it('debería retornar datos ordenados en orden descendente', () => {
      // Arrange: Configuramos ordenamiento descendente por nombre
      component.sortColumn = 'name';
      component.sortDirection = 'desc';

      // Act: Obtenemos datos ordenados
      const sortedData = component.sortedData;

      // Assert: Verificamos orden descendente
      expect(sortedData[0].name).toBe('Juan Pérez');
      expect(sortedData[1].name).toBe('Carlos López');
      expect(sortedData[2].name).toBe('Ana García');
    });
  });

  describe('Utilidades y métodos helper', () => {
    it('debería obtener valores anidados correctamente', () => {
      // Arrange: Preparamos objeto con propiedades anidadas
      const nestedObject = {
        user: {
          profile: {
            name: 'Test User'
          }
        }
      };

      // Act: Obtenemos valor anidado
      const value = component.getNestedValue(nestedObject, 'user.profile.name');

      // Assert: Verificamos que obtiene el valor correcto
      expect(value).toBe('Test User');
    });

    it('debería retornar string vacío para propiedades que no existen', () => {
      // Arrange: Preparamos objeto simple
      const simpleObject = { name: 'Test' };

      // Act: Intentamos obtener propiedad inexistente
      const value = component.getNestedValue(simpleObject, 'nonexistent.property');

      // Assert: Verificamos que retorna string vacío
      expect(value).toBe('');
    });

    it('debería generar trackBy usando id o index', () => {
      // Arrange: Preparamos item con id
      const itemWithId = { id: '123', name: 'Test' };
      const itemWithoutId = { name: 'Test Without ID' };

      // Act: Probamos trackBy
      const trackWithId = component.trackByFn(0, itemWithId);
      const trackWithoutId = component.trackByFn(1, itemWithoutId);

      // Assert: Verificamos que usa id cuando existe, index cuando no
      expect(trackWithId).toBe('123');
      expect(trackWithoutId).toBe(1);
    });
  });

  describe('Renderizado en el DOM', () => {
    it('debería renderizar encabezados de columnas correctamente', () => {
      // Act: Obtenemos encabezados del DOM
      const headers = fixture.nativeElement.querySelectorAll('th');

      // Assert: Verificamos que se renderizan todas las columnas
      expect(headers.length).toBe(mockColumns.length);
      expect(headers[0].textContent.trim()).toBe('ID');
      expect(headers[1].textContent.trim()).toBe('Nombre');
    });

    it('debería renderizar datos de las filas correctamente', () => {
      // Act: Obtenemos filas de datos del DOM
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');

      // Assert: Verificamos que se renderizan todas las filas
      expect(rows.length).toBe(mockData.length);
      
      // Verificamos contenido de la primera fila
      const firstRowCells = rows[0].querySelectorAll('td');
      expect(firstRowCells[0].textContent.trim()).toBe('1');
      expect(firstRowCells[1].textContent.trim()).toBe('Juan Pérez');
    });

    it('debería mostrar mensaje de "sin datos" cuando no hay datos', () => {
      // Arrange: Limpiamos los datos
      component.data = [];
      fixture.detectChanges();

      // Act: Buscamos el mensaje de sin datos
      const noDataElement = fixture.nativeElement.querySelector('.no-data');

      // Assert: Verificamos que muestra el mensaje
      expect(noDataElement).toBeTruthy();
      expect(noDataElement.textContent.trim()).toBe('No hay datos disponibles');
    });

    it('debería mostrar columna de acciones cuando hay acciones definidas', () => {
      // Arrange: Asignamos acciones
      component.actions = mockActions;
      fixture.detectChanges();

      // Act: Buscamos la columna de acciones
      const actionsHeader = fixture.nativeElement.querySelector('.actions-column');
      const actionButtons = fixture.nativeElement.querySelectorAll('.actions-cell button');

      // Assert: Verificamos que se muestra la columna y botones de acción
      expect(actionsHeader).toBeTruthy();
      expect(actionsHeader.textContent.trim()).toBe('Acciones');
      expect(actionButtons.length).toBeGreaterThan(0);
    });

    it('debería mostrar indicador de ordenamiento en columnas sortables', () => {
      // Arrange: Configuramos ordenamiento
      component.sortColumn = 'name';
      component.sortDirection = 'asc';
      fixture.detectChanges();

      // Act: Buscamos el indicador de ordenamiento
      const sortIndicator = fixture.nativeElement.querySelector('.sort-indicator');

      // Assert: Verificamos que muestra el indicador correcto
      expect(sortIndicator).toBeTruthy();
      expect(sortIndicator.textContent.trim()).toBe('↑');
    });
  });

  describe('Interacciones del usuario', () => {
    it('debería ejecutar acción cuando se hace clic en botón de acción', () => {
      // Arrange: Configuramos acciones con spy
      const mockAction: TableAction = {
        label: 'Test Action',
        onClick: jest.fn()
      };
      component.actions = [mockAction];
      fixture.detectChanges();

      // Act: Hacemos clic en el botón de acción
      const actionButton = fixture.nativeElement.querySelector('.actions-cell button');
      actionButton.click();

      // Assert: Verificamos que se ejecutó la acción
      expect(mockAction.onClick).toHaveBeenCalledWith(mockData[0]);
    });
  });
});