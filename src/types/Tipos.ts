export enum TiposParaArgumento {
    Number,
    String,
    LongString,
}
export type Operacion = {
    nombre: string,
};
export type ArgumentoDeFuncion = {
    tipo: TiposParaArgumento,
    nombre: string,
    descripcion: string,
    valor: any,
}

export type FuncionParaDiseñador = {
    nombre: string,
    argumentos: ArgumentoDeFuncion[]
}

export type OperacionDelDiseñador = {
    nombre: string,
    descripcion: string,
    funcion: FuncionParaDiseñador,
}