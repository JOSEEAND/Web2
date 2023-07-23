import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonajesResponse } from '../models/PersonajesResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }

  /*un metodo es observable cuando el llamado que
  esta realizando es asincronico, por que no sabe
  cuando devolvera un response este api*/

  /*si un metodo no devuelve nada, debe indicarsele
  con el void ejemplo: getPersonajes():void{}*/

  getPersonajes(): Observable<PersonajesResponse> {
    return this.http.get<PersonajesResponse>('https://rickandmortyapi.com/api/character');
  }
}
