import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatriculasService } from 'src/app/shared/services/matriculas.service';
import { AdminMatriculasComponent } from './admin-matriculas/admin-matriculas.component';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent {

  displayedColumns: string[] = ['IDMatricula', 'Cursos', 'Estudiantes'];
  dataSource = new MatTableDataSource();

  constructor(public dialog: MatDialog,
    private srvMatriculas: MatriculasService,
    private msj: ToastrService) { }

  ngOnInit() {
    this.cargarMatriculas();
  }

  cargarMatriculas(): void {
    this.srvMatriculas.getAll().subscribe((dato) => {
      console.log(dato);
      this.dataSource.data = dato
    }, (error) => {
      console.log(error);
      this.msj.warning('No hay matriculas');
    });
  }

  abrir(): void {
    const dialogRef = this.dialog.open(AdminMatriculasComponent, {
      height: '400px', width: '750px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
