export interface Personajes {
    //los atributos llevan el mismo nombre como se
    //indica en el API de Rick And Morty

    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: Date;
}