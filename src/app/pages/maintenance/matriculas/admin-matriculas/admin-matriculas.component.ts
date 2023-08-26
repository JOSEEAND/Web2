import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatriculasForm } from 'src/app/shared/formsModels/matriculasForm';
import { Cursos } from 'src/app/shared/models/curso';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';
import { MatriculasService } from 'src/app/shared/services/matriculas.service';

@Component({
  selector: 'app-admin-matriculas',
  templateUrl: './admin-matriculas.component.html',
  styleUrls: ['./admin-matriculas.component.scss']
})
export class AdminMatriculasComponent {

  listaEstudiantes: Estudiante[] = [];
  listaCursos: Cursos[] = [];

  constructor(private msj: ToastrService,
    private srvCursos: CursosService,
    private srvEstudiantes: EstudiantesService,
    private srvMatriculas: MatriculasService,
    public matriculaForm: MatriculasForm,
    @Inject(MAT_DIALOG_DATA) public data: { matricula: any }) { }

  ngOnInit() {
    this.cargarCursos();
    this.cargarEstudiantes();
  }

  crearMatricula(): void {
    this.matriculaForm.baseForm.patchValue({
      Estado: true,
      Cursos: this.data.matricula.Cursos,
      Estudiantes: this.data.matricula.Estudiantes
    });
  }

  guardarMatricula(): void {
    if (this.matriculaForm.baseForm.valid) {
      this.srvMatriculas.create(this.matriculaForm.baseForm.value).
        subscribe((dato) => {
          this.matriculaForm.baseForm.reset();
          this.msj.success('Matricula almacenada!');
        }, (error) => {
          console.log(error);
          this.msj.error('No se pudo almacenar la matricula');
        });
    }
  }

  cargarEstudiantes(): void {
    this.srvEstudiantes.getAll().subscribe((dato) => {
      this.listaEstudiantes = dato;
    }, (error) => {
      console.log(error);
      this.msj.warning('No hay estudiantes');
    });
  }

  cargarCursos(): void {
    this.srvCursos.getAll().subscribe((dato) => {
      this.listaCursos = dato;
    }, (error) => {
      console.log(error);
      this.msj.warning('No hay cursos');
    });
  }
}
