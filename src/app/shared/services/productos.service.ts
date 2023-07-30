import { Injectable } from '@angular/core';
import { Productos } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>("http://localhost:3000/Productos");
  }
  guardar(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>("http://localhost:3000/Productos", producto).
      pipe(catchError(this.handlerError));
  }
  modificar(producto: Productos): Observable<Productos> {
    return this.http.patch<Productos>("http://localhost:3000/Productos", producto).
      pipe(catchError(this.handlerError));
  }
  eliminar(id: number): Observable<Productos> {
    return this.http.delete<Productos>("http://localhost:3000/Productos/" + id).
      pipe(catchError(this.handlerError));
  }
  handlerError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}
