
export type ArgumentosParaDefinirCaracterPersonalizado = {
    matrizDeBits: Array<Array<string>>,
    caracterQueReemplaza: string,
}

export type ArgumentosParaDefinirCorte = {
    lineas: number,
}


export type OperacionDelDiseñador = {
    argumentos: Record<string, any>;
    nombre: string,
    descripcion: string,
    plataformas: Record<string, Function>,
    clave: string,
}