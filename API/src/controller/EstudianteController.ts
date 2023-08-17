import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Estudiante } from "../entity/Estudiante";
import { validate } from "class-validator";


export class EstudianteController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const listaEstudiantes = await repoEstudiantes.find({
                where: { Estado: true },
                relations: { Cursos: true }
            });
            if (listaEstudiantes.length === 0) return res.status(404).json({ message: 'No hay estudiantes' });
            return res.status(200).json(listaEstudiantes);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const IDEstudiante = parseInt(req.params['id']);
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            let estudiante;
            try {
                estudiante = await repoEstudiantes.findOneOrFail({
                    where: { IDEstudiante, Estado: true }, relations: { Cursos: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Estudiante inexistente' });
            }
            return res.status(200).json(estudiante);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const { IDEstudiante, Nombre, Apellidos, IDCurso } = req.body;
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            let est = await repoEstudiantes.findOne({ where: { IDEstudiante, Estado: true } });
            if (est) return res.status(400).json({ message: 'Estudiante existente' });
            let estudiante = new Estudiante();
            estudiante.IDEstudiante = IDEstudiante;
            estudiante.Nombre = Nombre;
            estudiante.Apellidos = Apellidos;
            estudiante.Cursos = IDCurso;
            estudiante.Estado = true;
            const errors = await validate(estudiante,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoEstudiantes.save(estudiante);
                return res.status(201).json({ message: 'Estudiante insertado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { IDEstudiante, Nombre, Apellidos, IDCurso } = req.body;
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            let estudiante: Estudiante;
            try {
                estudiante = await repoEstudiantes.findOneOrFail({
                    where: { IDEstudiante, Estado: true }, relations: { Cursos: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Estudiante inexistente' });
            }
            estudiante.Nombre = Nombre;
            estudiante.Apellidos = Apellidos;
            estudiante.Cursos = IDCurso;
            estudiante.Estado = true;
            const errors = await validate(estudiante,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoEstudiantes.save(estudiante);
                return res.status(200).json({ message: 'Estudiante actualizado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const IDEstudiante = parseInt(req.params['id']);
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            let estudiante: Estudiante;
            try {
                estudiante = await repoEstudiantes.findOneOrFail({
                    where: { IDEstudiante, Estado: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Estudiante inexistente' });
            }
            estudiante.Estado = false;
            try {
                await repoEstudiantes.save(estudiante);
                return res.status(200).json({ message: 'Estudiante eliminado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}
export default EstudianteController;