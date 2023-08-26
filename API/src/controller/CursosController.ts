import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Cursos } from "../entity/Cursos";


export class CursosController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repoCursos = AppDataSource.getRepository(Cursos);
            const listaCursos = await repoCursos.find({
                where: { Estado: true },
            });
            if (listaCursos.length === 0) return res.status(404).json({ message: 'No hay cursos' });
            return res.status(200).json(listaCursos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const IDCurso = parseInt(req.params['id']);
            const repoCursos = AppDataSource.getRepository(Cursos);
            let curso;
            try {
                curso = await repoCursos.findOneOrFail({
                    where: { IDCurso, Estado: true },
                });
            } catch (error) {
                return res.status(404).json({ message: 'Curso inexistente' });
            }
            return res.status(200).json(curso);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const { IDCurso, NombreCurso, Sede } = req.body;
            const repoCursos = AppDataSource.getRepository(Cursos);
            let cur = await repoCursos.findOne({ where: { IDCurso, Estado: true } });
            if (cur) return res.status(400).json({ message: 'Curso existente' });
            let curso = new Cursos();
            curso.IDCurso = IDCurso;
            curso.NombreCurso = NombreCurso;
            curso.Sede = Sede;
            curso.Estado = true;
            const errors = await validate(curso,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoCursos.save(curso);
                return res.status(201).json({ message: 'Curso insertado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { IDCurso, NombreCurso, Sede } = req.body;
            const repoCursos = AppDataSource.getRepository(Cursos);
            let curso: Cursos;
            try {
                curso = await repoCursos.findOneOrFail({
                    where: { IDCurso, Estado: true },
                });
            } catch (error) {
                return res.status(404).json({ message: 'Curso inexistente' });
            }
            curso.NombreCurso = NombreCurso;
            curso.Sede = Sede;
            curso.Estado = true;
            const errors = await validate(curso,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoCursos.save(curso);
                return res.status(200).json({ message: 'Curso actualizado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const IDCurso = parseInt(req.params['id']);
            const repoCursos = AppDataSource.getRepository(Cursos);
            let curso: Cursos;
            try {
                curso = await repoCursos.findOneOrFail({
                    where: { IDCurso, Estado: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Curso inexistente' });
            }
            curso.Estado = false;
            try {
                await repoCursos.save(curso);
                return res.status(200).json({ message: 'Curso eliminado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}
export default CursosController;