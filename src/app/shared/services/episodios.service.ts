import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodiosResponse } from '../models/EpisodiosResponse';



@Injectable({
    providedIn: 'root'
})
export class EpisodiosService {

    constructor(private http: HttpClient) { }

    getEpisodes(): Observable<EpisodiosResponse> {
        return this.http.get<EpisodiosResponse>('https://rickandmortyapi.com/api/episode');
    }
}