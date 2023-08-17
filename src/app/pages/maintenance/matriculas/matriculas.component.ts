import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Matriculas } from 'src/app/shared/models/matricula';
import { MatriculasService } from 'src/app/shared/services/matriculas.service';
import { AdminMatriculasComponent } from './admin-matriculas/admin-matriculas.component';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent {

  displayedColumns: string[] = ['IDMatricula', 'IDCurso', 'IDEstudiante'];
  dataSource = new MatTableDataSource();

  constructor(private srvMatriculas: MatriculasService,
    private msj: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.srvMatriculas.getAll().subscribe((datos) => {
      //console.log(datos);
      this.dataSource.data = datos
    }, (error) => {
      this.msj.error(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialog(): void {
    const dialogOpen = this.dialog.open(AdminMatriculasComponent, {
      width: '650px',
      height: '600px',
    });

    dialogOpen.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.cargarLista();
      }
    });
  }
}
