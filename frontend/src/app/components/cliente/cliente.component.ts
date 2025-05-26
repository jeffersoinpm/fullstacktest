import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'] 
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  filtro: string = '';
  editando: boolean = false;
  clienteIdEditando: number | null = null;
  mostrarFormulario: boolean = false;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      clienteId: ['', Validators.required],
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', Validators.required],
      estado: [true]
    });
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
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
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;

      if (this.editando && this.clienteIdEditando !== null) {
        this.clienteService.update(this.clienteIdEditando, cliente).subscribe(actualizado => {
          const index = this.clientes.findIndex(c => c.clienteId === this.clienteIdEditando);
          if (index !== -1) this.clientes[index] = actualizado;
          this.resetForm();
        });
      } else {
        this.clienteService.create(cliente).subscribe({
            next: (nuevo) => {
              this.clientes.push(nuevo);
              this.mostrarMensaje('Cliente registrado exitosamente');
              this.resetForm();
            },
            error: () => {
              this.mostrarMensaje('Ocurrió un error al guardar el cliente', true);
            }
          });
      }
    }
  }

  resetForm(): void {
    this.clienteForm.reset({ estado: true });
    this.editando = false;
    this.clienteIdEditando = null;
    this.mostrarFormulario = false;
  }


  editar(cliente: Cliente): void {
    this.editando = true;
    this.clienteIdEditando = cliente.clienteId;
    this.clienteForm.patchValue(cliente);
    this.mostrarFormulario = true;
  }

  eliminar(id: number): void {
    this.clienteService.delete(id).subscribe(() => {
    this.clientes = this.clientes.filter(c => c.clienteId !== id);
  });
}


}
