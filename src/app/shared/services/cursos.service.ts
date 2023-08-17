import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';
import { Observable, catchError } from 'rxjs';
import { Cursos } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>('http://localhost:3000/Cursos').
      pipe(catchError(this.handler.handlerError));
  }
}
