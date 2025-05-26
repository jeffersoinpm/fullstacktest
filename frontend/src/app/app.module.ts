import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { ReporteComponent } from './components/reporte/reporte.component';

import { FiltroClientePipe } from './pipes/filtro-cliente.pipe';
import { FiltroCuentaPipe } from './pipes/filtro-cuenta.pipe';
import { FiltroMovimientoPipe } from './pipes/filtro-movimiento.pipe';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    CuentaComponent,
    MovimientoComponent,
    ReporteComponent,
    FiltroClientePipe,
    FiltroCuentaPipe,
    FiltroMovimientoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([
      { path: 'clientes', component: ClienteComponent },
      { path: 'movimientos', component: MovimientoComponent },
      { path: 'cuentas', component: CuentaComponent },
      { path: 'reportes', component: ReporteComponent },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
