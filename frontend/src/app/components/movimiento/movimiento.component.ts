import { Component, OnInit } from '@angular/core';
import { Movimiento, MovimientoService } from '../../services/movimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css'] 
})
export class MovimientoComponent implements OnInit {
  movimientos: Movimiento[] = [];
  movimientoForm: FormGroup;
  editando: boolean = false;
  movimientoIdEditando: number | null = null;
  filtro: string = '';
  mostrarFormulario: boolean = false;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private movimientoService: MovimientoService,
    private fb: FormBuilder
  ) {
    this.movimientoForm = this.fb.group({
      numeroCuenta: ['', Validators.required],
      tipoMovimiento: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.movimientoService.getMovimientos().subscribe(data => {
      this.movimientos = data;
    });
  }
  mostrarMensaje(texto: string, error: boolean = false): void {
    this.mensaje = texto;
    this.esError = error;
    setTimeout(() => this.mensaje = '', 5000); // limpia el mensaje luego de 5s
  }

  submit(): void {
    if (this.movimientoForm.valid) {
      const formValue = this.movimientoForm.value;

      const movimiento: Movimiento = {
        tipoMovimiento: formValue.tipoMovimiento,
        valor: formValue.valor,
        cuenta: { numeroCuenta: formValue.numeroCuenta }  // 👈 clave aquí
      };

      if (this.editando && this.movimientoIdEditando !== null) {
        this.movimientoService.update(this.movimientoIdEditando, movimiento).subscribe(actualizado => {
          const index = this.movimientos.findIndex(m => m.id === this.movimientoIdEditando);
          if (index !== -1) this.movimientos[index] = actualizado;
          this.resetForm();
        });
      } else {
        this.movimientoService.registrarMovimiento(formValue.numeroCuenta, movimiento).subscribe({
          next: nuevo => {
            this.movimientos.push(nuevo);
            this.mostrarMensaje('Movimiento registrado exitosamente');
            this.resetForm();
          },
          error: () =>{
            this.mostrarMensaje('Ocurrió un error al guardar el movimiento', true);
          }
        });
      }
    }
  }
  resetForm(): void {
    this.movimientoForm.reset();
    this.editando = false;
    this.movimientoIdEditando = null;
  }


  editar(mov: Movimiento): void {
    this.editando = true;
    this.movimientoIdEditando = mov.id;
    this.movimientoForm.patchValue({
      numeroCuenta: mov.cuenta.numeroCuenta,
      tipoMovimiento: mov.tipoMovimiento,
      valor: mov.valor
    });
  }
  nuevo(): void {
    this.resetForm();
    this.mostrarFormulario = true;
  }

}
