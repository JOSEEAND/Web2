import { Episodios } from "./Episodios";
import info from "./info";

export interface EpisodiosResponse {

    info: info;
    results: Episodios[];
}