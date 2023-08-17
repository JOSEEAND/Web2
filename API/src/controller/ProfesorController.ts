import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Profesor } from "../entity/Profesor";


export class ProfesorController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repoProfesor = AppDataSource.getRepository(Profesor);
            const listaProfesor = await repoProfesor.find({
                where: { Estado: true },
                relations: { Cursos: true }
            });
            if (listaProfesor.length === 0) return res.status(404).json({ message: 'No hay profesores' });
            return res.status(200).json(listaProfesor);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const IDProfesor = parseInt(req.params['id']);
            const repoProfesor = AppDataSource.getRepository(Profesor);
            let profesor;
            try {
                profesor = await repoProfesor.findOneOrFail({
                    where: { IDProfesor, Estado: true }, relations: { Cursos: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Profesor inexistente' });
            }
            return res.status(200).json(profesor);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const { IDProfesor, Nombre, Apellidos, IDCurso } = req.body;
            const repoProfesor = AppDataSource.getRepository(Profesor);
            let pro = await repoProfesor.findOne({ where: { IDProfesor, Estado: true } });
            if (pro) return res.status(400).json({ message: 'Profesor existete' });
            let profesor = new Profesor();
            profesor.IDProfesor = IDProfesor;
            profesor.Nombre = Nombre;
            profesor.Apellidos = Apellidos;
            profesor.Cursos = IDCurso;
            profesor.Estado = true;
            const errors = await validate(profesor,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoProfesor.save(profesor);
                return res.status(201).json({ message: 'Profesor insertado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { IDProfesor, Nombre, Apellidos, IDCurso } = req.body;
            const repoProfesor = AppDataSource.getRepository(Profesor);
            let profesor: Profesor;
            try {
                profesor = await repoProfesor.findOneOrFail({
                    where: { IDProfesor, Estado: true }, relations: { Cursos: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Profesor inexistente' });
            }
            profesor.Nombre = Nombre;
            profesor.Apellidos = Apellidos;
            profesor.Cursos = IDCurso;
            profesor.Estado = true;
            const errors = await validate(profesor,
                { validationError: { target: false, value: false } });

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            try {
                await repoProfesor.save(profesor);
                return res.status(200).json({ message: 'Profesor actualizado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const IDProfesor = parseInt(req.params['id']);
            const repoProfesor = AppDataSource.getRepository(Profesor);
            let profesor: Profesor;
            try {
                profesor = await repoProfesor.findOneOrFail({
                    where: { IDProfesor, Estado: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Profesor inexistente' });
            }
            profesor.Estado = false;
            try {
                await repoProfesor.save(profesor);
                return res.status(200).json({ message: 'Profesor eliminado' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}
export default ProfesorController;