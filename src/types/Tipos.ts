export type ArgumentosParaDefinirCaracterPersonalizado = {
    matrizDeBits: Array<Array<string>>,
    caracterQueReemplaza: string,
}
export enum Alineacion {
    Izquierda = 0,
    Centro,
    Derecha,
}

export enum TamañoImagen {
    Normal = 0,
    DobleAncho,
    DobleLargo,
    DobleAnchoYLargo,
}
export type ArgumentosParaDefinirCorte = {
    lineas: number,
}

export type ArgumentosParaDefinirTexto = {
    texto: string,
    ancho: number,
    alto: number,
    enfatizado: boolean,
    alineacion: Alineacion,
    subrayado: boolean,
    alReves: boolean,
    inverso: boolean,
    rotacion90: boolean,
}

export type ArgumentosParaDefinirImagen = {
    alineacion: Alineacion,
    ancho: number,
    alto: number,
    tamaño: TamañoImagen,
    maximoAncho: number,
    contenidoEnBase64: string,
}

export type EncabezadoDeTabla = {
    longitudMaxima: number,
}
export type ArgumentosParaDefinirTabla = {
    tabla: Array<Array<string>>,
    ajustesEncabezados: Array<EncabezadoDeTabla>,
    caracterSeparadorColumnasDatos: string,
    caracterSeparadorFilas: string,
    caracterSeparadorColumnasEnSeparadorDeFilas: string,
    relleno: string,
}

type Plataforma = Record<string, (thisArg: Operacion) => any>;

export class Operacion {
    public argumentos: Record<string, any>;
    public clave: string;
    public nombre: string;
    public descripcion: string;
    public plataformas: Plataforma;
    public id: number;
    constructor(id: number, argumentos: Record<string, any>, clave: string, nombre?: string, descripcion?: string, plataformas?: Plataforma) {
        this.id = id;
        this.argumentos = argumentos;
        this.clave = clave;
        this.nombre = nombre || "";
        this.descripcion = descripcion || "";
        this.plataformas = plataformas || {};
    }
    obtenerArgumentosPorPlataforma(plataforma: string) {
        return this.plataformas[plataforma](this);
    }
    obtenerArgumentosRealesSerializados() {
        return JSON.stringify(this.argumentos);
    }
    clonar(): Operacion {
        return new Operacion(this.id, Object.assign({}, this.argumentos), this.clave, this.nombre, this.descripcion, this.plataformas);
    }
}

export class OperacionFactory {
    static mapa: { [key: string]: { nombre: string, descripcion: string, plataformas: Plataforma } } = {
        "": {
            nombre: "",
            descripcion: "",
            plataformas: {},
        },
        "Corte": {
            nombre: "Corte",
            descripcion: `Avanza el papel especificado por el número de líneas y después lo corta`,
            plataformas: {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirCorte;
                    return [{
                        nombre: "Corte",
                        argumentos: [argumentos.lineas],
                    }];
                },
            },
        },
        "DefinirCaracterPersonalizado": {
            nombre: "DefinirCaracterPersonalizado",
            descripcion: `Define un char`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirCaracterPersonalizado;
                    const matrizComoCadena = argumentos.matrizDeBits.map(fila => fila.join("")).join("\n");
                    return [
                        {
                            nombre: "HabilitarCaracteresPersonalizados",
                            argumentos: [],
                        },
                        {
                            nombre: "DefinirCaracterPersonalizado",
                            argumentos: [argumentos.caracterQueReemplaza, matrizComoCadena],
                        },

                    ];
                },
            },

        },
        "Texto": {
            nombre: "Texto",
            descripcion: `Imprimir cualquier texto`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirTexto;
                    const argumentosParaDevolver = [
                        {
                            nombre: "Feed",
                            argumentos: [1],
                        },
                        {
                            nombre: "EstablecerTamañoFuente",
                            argumentos: [argumentos.ancho, argumentos.alto],
                        },
                        {
                            nombre: "EstablecerEnfatizado",
                            argumentos: [argumentos.enfatizado],
                        },
                        {
                            nombre: "EstablecerAlineacion",
                            argumentos: [argumentos.alineacion],
                        },
                        {
                            nombre: "EstablecerSubrayado",
                            argumentos: [argumentos.subrayado],
                        },
                        {
                            nombre: "EstablecerImpresionAlReves",
                            argumentos: [argumentos.alReves],
                        },
                        {
                            nombre: "EstablecerImpresionBlancoYNegroInversa",
                            argumentos: [argumentos.inverso],
                        },
                        {
                            nombre: "EstablecerRotacionDe90Grados",
                            argumentos: [argumentos.rotacion90],
                        },
                        {
                            nombre: "EscribirTexto",
                            argumentos: [argumentos.texto],
                        },
                        {
                            nombre: "Feed",
                            argumentos: [1],
                        },
                    ];
                    return argumentosParaDevolver;
                },
            },

        },
        "Imagen": {
            nombre: "Imagen",
            descripcion: `Imprimir una imagen del dispositivo`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagen;
                    const argumentosParaDevolver = [
                        {
                            nombre: "EstablecerAlineacion",
                            argumentos: [argumentos.alineacion],
                        },
                        {
                            nombre: "ImprimirImagenEnBase64",
                            argumentos: [argumentos.contenidoEnBase64, argumentos.tamaño, argumentos.maximoAncho],
                        }
                    ];
                    return argumentosParaDevolver;
                },
            },

        },

        "Tabla": {
            nombre: "Texto como tabla",
            descripcion: `Imprimir texto tabulado`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirTabla;
                    const argumentosParaDevolver = [
                        {
                            nombre: "EscribirTexto",
                            argumentos: [argumentos.tabla[0][0]],
                        },
                    ];
                    return argumentosParaDevolver;
                },
            },

        },
    };

    static crearAPartirDeClaveYArgumentosSerializados(id: number, clave: string, argumentos: string): Operacion {
        const argumentosDeserializados = JSON.parse(argumentos);
        console.log(argumentosDeserializados);

        return OperacionFactory.crearAPartirDeClaveYArgumentos(id, clave, argumentosDeserializados);
    }
    static crearAPartirDeClaveYArgumentos(id: number, clave: string, argumentos: Record<string, any>): Operacion {
        const valoresQueMeFaltan = OperacionFactory.mapa[clave];
        return new Operacion(id, argumentos, clave, valoresQueMeFaltan.nombre, valoresQueMeFaltan.descripcion, valoresQueMeFaltan.plataformas);
    }
}



export type Diseño = {
    id: number,
    nombre: string,
    fechaModificacion: string,
}