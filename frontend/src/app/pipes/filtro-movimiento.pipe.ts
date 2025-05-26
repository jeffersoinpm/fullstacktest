import { Pipe, PipeTransform } from '@angular/core';
import { Movimiento } from '../services/movimiento.service';

@Pipe({ name: 'filtroMovimiento' })
export class FiltroMovimientoPipe implements PipeTransform {
  transform(movs: Movimiento[], texto: string): Movimiento[] {
    if (!texto) return movs;
    return movs.filter(m =>
      m.tipoMovimiento.toLowerCase().includes(texto.toLowerCase()) ||
      m.valor.toString().includes(texto)
    );
  }
}
