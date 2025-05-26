import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'movimientos', component: MovimientoComponent },
  { path: 'reportes', component: ReporteComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
