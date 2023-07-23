import { Personajes } from "./Personaje";
import info from "./info";

export interface PersonajesResponse {

    info: info;
    results: Personajes[];
}