import { Component, OnInit, Pipe } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Episodios } from 'src/app/shared/models/Episodios';
import { EpisodiosResponse } from 'src/app/shared/models/EpisodiosResponse';
import { EpisodiosService } from 'src/app/shared/services/episodios.service';
import { DatePipe } from '@angular/common';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss']
})
export class EpisodiosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'airdate', 'episode', 'created'];
  dataSource = new MatTableDataSource<Episodios>();

  constructor(
    private srvEpisodios: EpisodiosService)
  //private datePipe: DatePipe) 
  {
  }

  ngOnInit() {
    this.srvEpisodios.getEpisodes().subscribe((datos: EpisodiosResponse) => {
      this.dataSource.data = datos.results;
    })
  }

  /*formatFecha(fecha: Date | null): string {
    if (fecha) {
      return this.datePipe.transform(fecha, 'yyyy-MM') || '';
    }
    return '';
  }
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
