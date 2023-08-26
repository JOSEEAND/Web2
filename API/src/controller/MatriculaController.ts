import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Matricula } from "../entity/Matricula";
import { validate } from "class-validator";
import { Estudiante } from "../entity/Estudiante";

export class MatriculasController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const matriculasRepo = AppDataSource.getRepository(Matricula);
            const matriculas = await matriculasRepo.find({
                where: { Estado: true }, relations: { Cursos: true, Estudiantes: true }
            });
            if (matriculas.length === 0) return res.status(404).json({ message: 'No hay matriculas' });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const { IDMatricula, IDCurso, IDEstudiante } = req.body;
            const matriculasRepo = AppDataSource.getRepository(Matricula);
            /*let matriculaExis = await matriculasRepo.findOne({
                where: { Estado: true, IDMatricula: IDMatricula }
            });
            if (matriculaExis) return res.status(400).json({ message: 'Matricula existente' });*/
            let nuevaMatricula = new Matricula();
            //nuevaMatricula.IDMatricula = IDMatricula;
            nuevaMatricula.Cursos = IDCurso;
            nuevaMatricula.Estudiantes = IDEstudiante;
            nuevaMatricula.Estado = true;
            const errors = await validate(nuevaMatricula,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await matriculasRepo.save(nuevaMatricula);
                return res.status(201).json({ message: 'Matricula insertada' });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo insertar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { IDMatricula, IDCurso, IDEstudiante } = req.body;
            const matriculasRepo = AppDataSource.getRepository(Matricula);
            let nuevaMatricula: Matricula;
            try {
                nuevaMatricula = await matriculasRepo.findOneOrFail({
                    where: { IDMatricula, Estado: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Matricula inexistente' });
            }
            nuevaMatricula.Cursos = IDCurso;
            nuevaMatricula.Estudiantes = IDEstudiante;
            nuevaMatricula.Estado = true;
            const errors = await validate(nuevaMatricula,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await matriculasRepo.save(nuevaMatricula);
                return res.status(200).json({ message: 'Matricula actualizada' });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo actualizar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}
export default MatriculasController;