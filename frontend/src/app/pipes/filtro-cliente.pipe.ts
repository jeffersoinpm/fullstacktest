import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../services/cliente.service';

@Pipe({ name: 'filtroCliente' })
export class FiltroClientePipe implements PipeTransform {
  transform(clientes: Cliente[], texto: string): Cliente[] {
    if (!texto) return clientes;
    return clientes.filter(c =>
      c.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      c.identificacion.includes(texto)
    );
  }
}
