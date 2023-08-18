import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';
import { Observable, catchError } from 'rxjs';
import { Matriculas } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>('http://localhost:3000/Matriculas?relations=Cursos,Estudiantes').
      pipe(catchError(this.handler.handlerError));

    //cualquier vara quitar desde _expand=IDCurso&_expand=IDEstudiante
  }

  create(matricula: Matriculas): Observable<Matriculas> {
    return this.http.post<Matriculas>('http://localhost:3000/Matriculas', matricula).
      pipe(catchError(this.handler.handlerError));
  }

  update(matricula: Matriculas): Observable<Matriculas> {
    return this.http.patch<Matriculas>('http://localhost:3000/Matriculas/', matricula).
      pipe(catchError(this.handler.handlerError));
  }
}
