import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transferencia } from '../models/transferencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {
  private api = 'http://localhost:8080/transferencias';

  constructor(private http: HttpClient) {}

  listar(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.api);
  }

  agendar(t: Transferencia): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.api, t);
  }
}
