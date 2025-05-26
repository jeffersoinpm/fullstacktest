import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService, Cuenta } from '../../services/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'] 
})
export class CuentaComponent implements OnInit {
  cuentas: Cuenta[] = [];
  cuentaForm: FormGroup;
  editando: boolean = false;
  cuentaIdEditando: string | null = null;
  filtro: string = '';  
  mostrarFormulario: boolean = false;
  mensaje: string = '';
  esError: boolean = false;

  constructor(private cuentaService: CuentaService, private fb: FormBuilder) {
    this.cuentaForm = this.fb.group({
      numeroCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      estado: [true],
      cliente: this.fb.group({
        clienteId: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.cuentaService.getCuentas().subscribe(data => {
      this.cuentas = data;
    });
  }
  nuevo(): void {
    this.resetForm();
    this.mostrarFormulario = true;
  }
  mostrarMensaje(texto: string, error: boolean = false): void {
    this.mensaje = texto;
    this.esError = error;
    setTimeout(() => this.mensaje = '', 5000); // limpia el mensaje luego de 5s
  }

  submit(): void {
    if (this.cuentaForm.valid) {
      const cuenta: Cuenta = this.cuentaForm.value;

      if (this.editando && this.cuentaIdEditando !== null) {
        this.cuentaService.update(this.cuentaIdEditando, cuenta).subscribe(actualizada => {
          const index = this.cuentas.findIndex(c => c.numeroCuenta === this.cuentaIdEditando);
          if (index !== -1) this.cuentas[index] = actualizada;
          this.resetForm();
        });
      } else {
        this.cuentaService.create(cuenta).subscribe({
          next: (nueva) => {
            this.cuentas.push(nueva);
            this.mostrarMensaje('Cuenta registrada exitosamente');
            this.resetForm();
          },
          error:() =>{
            this.mostrarMensaje('Ocurrió un error al guardar la cuenta', true);
          }  
        });
      }
    }
  }
  resetForm(): void {
    this.cuentaForm.reset({ estado: true });
    this.editando = false;
    this.cuentaIdEditando = null;
  }


  editar(cuenta: Cuenta): void {
    this.editando = true;
    this.cuentaIdEditando = cuenta.numeroCuenta;
    this.cuentaForm.patchValue(cuenta);
  }

  eliminar(id: string): void {
    this.cuentaService.delete(id).subscribe(() => {
      this.cuentas = this.cuentas.filter(c => c.numeroCuenta !== id);
    });
  }


}
