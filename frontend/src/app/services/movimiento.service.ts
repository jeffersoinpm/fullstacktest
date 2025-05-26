import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Movimiento {
  id?: number;
  fecha?: string;
  tipoMovimiento: string;
  valor: number;
  saldo?: number;
  cuenta: {
    numeroCuenta: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private baseUrl = `${environment.apiUrl}/movimientos`;;

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.baseUrl);
  }

  registrarMovimiento(numeroCuenta: string, movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(`${this.baseUrl}/${numeroCuenta}`, movimiento);
  }
  update(id: number, mov: Movimiento): Observable<Movimiento> {
    return this.http.put<Movimiento>(`http://localhost:8080/movimientos/${id}`, mov);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/movimientos/${id}`);
  }

}
