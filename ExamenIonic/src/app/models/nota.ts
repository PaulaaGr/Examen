export interface Nota {
    fechaEntrega: string;
    descripcion: string;
    nota: number;
    observaciones?: string;
    corte: string;
    codigoMateria: string; // Agregar el campo 'codigoMateria' para asociar con la materia
  }
  