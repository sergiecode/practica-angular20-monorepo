// Tests para utilidades comunes
// Estos tests verifican que las funciones utilitarias funcionen correctamente

import { utilsCommon } from './utils-common';

describe('utilsCommon', () => {
  it('debería retornar el string "utils-common" correctamente', () => {
    // Arrange: No necesitamos preparar datos para esta función simple
    
    // Act: Ejecutamos la función
    const result = utilsCommon();
    
    // Assert: Verificamos que retorna el valor esperado
    expect(result).toEqual('utils-common');
    expect(typeof result).toBe('string');
  });

  it('debería retornar siempre el mismo valor en múltiples llamadas', () => {
    // Arrange & Act: Ejecutamos la función múltiples veces
    const result1 = utilsCommon();
    const result2 = utilsCommon();
    const result3 = utilsCommon();
    
    // Assert: Verificamos que siempre retorna lo mismo (función pura)
    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe('utils-common');
  });
});
