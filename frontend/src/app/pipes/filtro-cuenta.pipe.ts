import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from '../services/cuenta.service';

@Pipe({ name: 'filtroCuenta' })
export class FiltroCuentaPipe implements PipeTransform {
  transform(cuentas: Cuenta[], texto: string): Cuenta[] {
    if (!texto) return cuentas;
    return cuentas.filter(c =>
      c.numeroCuenta.toLowerCase().includes(texto.toLowerCase()) ||
      c.tipoCuenta.toLowerCase().includes(texto.toLowerCase())
    );
  }
}
