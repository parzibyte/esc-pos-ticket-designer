
export type ArgumentosParaDefinirCaracterPersonalizado = {
    matrizDeBits: Array<Array<string>>,
    caracterQueReemplaza: string,
}

export type ArgumentosParaDefinirCorte = {
    lineas: number,
}

type Plataforma = Record<string, (thisArg: Operacion) => any>;

export class Operacion {
    public argumentos: Record<string, any>;
    public clave: string;
    public nombre: string;
    public descripcion: string;
    public plataformas: Plataforma;
    constructor(argumentos: Record<string, any>, clave: string, nombre?: string, descripcion?: string, plataformas?: Plataforma) {
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
        return new Operacion(Object.assign({}, this.argumentos), this.clave, this.nombre, this.descripcion, this.plataformas);
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
                    return {
                        nombre: "Corte",
                        argumentos: [argumentos.lineas],
                    };
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
                    return {
                        nombre: "DefinirCaracterPersonalizado",
                        argumentos: [argumentos.caracterQueReemplaza, matrizComoCadena],
                    };
                },
            },

        },
    };

    static crearAPartirDeClaveYArgumentosSerializados(clave: string, argumentos: string): Operacion {
        const argumentosDeserializados = JSON.parse(argumentos);
        console.log(argumentosDeserializados);

        return OperacionFactory.crearAPartirDeClaveYArgumentos(clave, argumentosDeserializados);
    }
    static crearAPartirDeClaveYArgumentos(clave: string, argumentos: Record<string, any>): Operacion {
        const valoresQueMeFaltan = OperacionFactory.mapa[clave];
        return new Operacion(argumentos, clave, valoresQueMeFaltan.nombre, valoresQueMeFaltan.descripcion, valoresQueMeFaltan.plataformas);
    }
}


