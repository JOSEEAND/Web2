import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CursosForm } from 'src/app/shared/formsModels/cursosForm';
import { EstudiantesForm } from 'src/app/shared/formsModels/estudiantesForm';
import { MatriculasForm } from 'src/app/shared/formsModels/matriculasForm';
import { Cursos } from 'src/app/shared/models/curso';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { Matriculas } from 'src/app/shared/models/matricula';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';
import { MatriculasService } from 'src/app/shared/services/matriculas.service';

@Component({
  selector: 'app-admin-matriculas',
  templateUrl: './admin-matriculas.component.html',
  styleUrls: ['./admin-matriculas.component.scss']
})
export class AdminMatriculasComponent {

  estudiantes: Estudiante[] = [];
  cursos: Cursos[] = [];

  constructor(
    public dialogRef: MatDialogRef<AdminMatriculasComponent>,
    private srvMatriculas: MatriculasService,
    private srvEstudiantes: EstudiantesService,
    private srvCursos: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: { matricula?: Matriculas },
    public matriculaForm: MatriculasForm,
    public cursosForm: CursosForm,
    public estudiantesForm: EstudiantesForm,
    private msj: ToastrService
  ) { }

  ngOnInit() {
    this.loadEstudiantes();
    this.loadCursos();

    if (this.data.matricula) {
      this.estudiantesForm.baseForm.patchValue(this.data.matricula);
      const cursosIds = this.data.matricula.IDCurso.map(curso => curso.IDCurso);
      cursosIds.forEach(id => {
        if (this.cursosForm.baseForm.controls[id]) {
          this.cursosForm.baseForm.controls[id].setValue(true);
        }
      });
    }
  }

  loadEstudiantes() {
    this.srvEstudiantes.getAll().subscribe(estudiantes => {
      this.estudiantes = estudiantes;
    });
  }

  loadCursos() {
    this.srvCursos.getAll().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  guardarMatricula() {
    if (this.matriculaForm.baseForm.valid) {
      const matricula = this.matriculaForm.baseForm.value;
      const selectedCursos = this.getSelectedCursos();
      matricula.cursos = selectedCursos;

      this.srvMatriculas.create(matricula).subscribe((dato) => {
        console.log(dato);
        this.msj.success('Matricula creada correctamente');
        this.dialogRef.close(true);
      }, (error) => {
        this.msj.error('No se pudo insertar la matricula');
        console.log(error);
      });
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  getSelectedCursos() {
    return this.cursos.filter(curso => this.cursosForm.baseForm.controls[curso.IDCurso.toString()].value);
  }

  toggleCurso(cursoID: number) {
    this.cursosForm.baseForm.controls[cursoID].setValue(!this.cursosForm.baseForm.controls[cursoID].value);
  }
}
