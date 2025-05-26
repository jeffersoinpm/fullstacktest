import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ReporteMovimientoDTO {
  fecha: string;
  cliente: string;
  numeroCuenta: string;
  tipo: string;
  saldoInicial: number;
  estado: boolean;
  movimiento: number;
  saldoDisponible: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private baseUrl = `${environment.apiUrl}/reportes`;;

  constructor(private http: HttpClient) {}

  getReporteJson(clienteId: number, desde: string, hasta: string): Observable<ReporteMovimientoDTO[]> {
    return this.http.get<ReporteMovimientoDTO[]>(`${this.baseUrl}/json`, {
      params: { clienteId, desde, hasta }
    });
  }

  getReportePdf(clienteId: number, desde: string, hasta: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/pdf`, {
      params: { clienteId, desde, hasta },
      responseType: 'text'
    });
  }
}
