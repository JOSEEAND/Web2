import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';
import { Estudiante } from '../models/estudiante';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>('http://localhost:3000/Estudiantes').
      pipe(catchError(this.handler.handlerError));
  }

  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>('http://localhost:3000/Estudiantes/' + id).
      pipe(catchError(this.handler.handlerError));
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>('http://localhost:3000/Estudiantes', estudiante).
      pipe(catchError(this.handler.handlerError));
  }
}
