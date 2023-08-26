import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class MatriculasForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            IDMatricula: [0, [Validators.required]],
            Estado: [true],
            Cursos: [0, Validators.required],
            Estudiantes: [0, [Validators.required]],
            //IDCurso IDEstudiante 0 o []
        })
    }
}