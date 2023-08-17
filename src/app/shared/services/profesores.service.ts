import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';
import { Profesor } from '../models/profesor';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>('http://localhost:3000/Profesores').
      pipe(catchError(this.handler.handlerError));
  }
}
