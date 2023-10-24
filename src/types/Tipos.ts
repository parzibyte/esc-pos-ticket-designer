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

// El valor debe coincidir con la función que se llama
export enum TipoDeCodigoDeBarras {
    Codabar = "ImprimirCodigoDeBarrasCodabar",
    Code128 = "ImprimirCodigoDeBarrasCode128",
    Code39 = "ImprimirCodigoDeBarrasCode39",
    Code93 = "ImprimirCodigoDeBarrasCode93",
    Ean = "ImprimirCodigoDeBarrasEan",
    Ean8 = "ImprimirCodigoDeBarrasEan8",
    Pdf417 = "ImprimirCodigoDeBarrasPdf417",
    TwoOffFiveITF = "ImprimirCodigoDeBarrasTwoOfFiveITF",
    UpcA = "ImprimirCodigoDeBarrasUpcA",
    UpcE = "ImprimirCodigoDeBarrasUpcE",
}
export type ArgumentosParaDefinirCodigoDeBarras = {
    tipo: TipoDeCodigoDeBarras,
    contenido: string,
    ancho: number,
    alto: number,
    tamaño: TamañoImagen,
    alineacion: Alineacion,
    incluirSumaDeVerificacion?: boolean,
    modoAsciiCompleto?: boolean,
    intercalado?: boolean,
    nivelDeSeguridad?: number,
    imprimirContenido: boolean,
}

export enum RecuperacionQr {
    Bajo = 0,
    Medio,
    Alto,
    ElMasAlto,
}

export type ArgumentosParaDefinirCodigoQr = {
    contenido: string,
    ancho: number,
    tamaño: TamañoImagen,
    alineacion: Alineacion,
    nivelDeRecuperacion: RecuperacionQr,
    imprimirContenido: boolean,
}

const separarCadenaEnArregloSiSuperaLongitud = (cadena: string, maximaLongitud: number) => {
    const resultado = [];
    let indice = 0;
    while (indice < cadena.length) {
        const pedazo = cadena.substring(indice, indice + maximaLongitud);
        indice += maximaLongitud;
        resultado.push(pedazo);
    }
    return resultado;
}

const dividirCadenasYEncontrarMayorConteoDeBloques = function (contenidosConMaximaLongitud: { contenido: string, maximaLongitud: number }[]): [{ separadas: string[], maximaLongitud: number }[], number] {
    let mayorConteoDeCadenasSeparadas = 0;
    const cadenasSeparadas = [];
    for (const contenido of contenidosConMaximaLongitud) {
        const separadas = separarCadenaEnArregloSiSuperaLongitud(contenido.contenido, contenido.maximaLongitud);
        cadenasSeparadas.push({ separadas, maximaLongitud: contenido.maximaLongitud });
        if (separadas.length > mayorConteoDeCadenasSeparadas) {
            mayorConteoDeCadenasSeparadas = separadas.length;
        }
    }
    return [cadenasSeparadas, mayorConteoDeCadenasSeparadas];
}


const tabularDatos = (cadenas: { contenido: string, maximaLongitud: number }[], relleno: string, separadorColumnas: string) => {
    const [arreglosDeContenidosConMaximaLongitudSeparadas, mayorConteoDeBloques] = dividirCadenasYEncontrarMayorConteoDeBloques(cadenas)
    let indice = 0;
    const lineas = [];
    while (indice < mayorConteoDeBloques) {
        let linea = "";
        for (const contenidos of arreglosDeContenidosConMaximaLongitudSeparadas) {
            let cadena = "";
            if (indice < contenidos.separadas.length) {
                cadena = contenidos.separadas[indice];
            }
            if (cadena.length < contenidos.maximaLongitud) {
                cadena = cadena + relleno.repeat(contenidos.maximaLongitud - cadena.length);
            }
            linea += cadena + separadorColumnas;
        }
        lineas.push(linea);
        indice++;
    }
    return lineas;
}
const obtenerSeparador = (caracterSeparadorFilas: string, caracterSeparadorColumnasEnSeparadorDeFilas: string, cantidadColumnas: number, ajustesEncabezados: EncabezadoDeTabla[]) => {
    let separador = "";
    for (let indiceColumna = 0; indiceColumna < cantidadColumnas; indiceColumna++) {
        separador += tabularDatos(
            [
                {
                    contenido: caracterSeparadorFilas,
                    maximaLongitud: ajustesEncabezados[indiceColumna].longitudMaxima
                }
            ],
            caracterSeparadorFilas,
            caracterSeparadorColumnasEnSeparadorDeFilas,
        )
            // Lo unimos con una cadena vacía porque siempre nos va a devolver un arreglo de longitud 1, básicamente estamos convirtiendo el array a cadena, la unión no importa
            .join("");
    }
    return separador + "\n";
}
const cantidadFilas = (argumentos: ArgumentosParaDefinirTabla) => {
    return argumentos.tabla.length;
}
const cantidadColumnas = (argumentos: ArgumentosParaDefinirTabla) => {
    let cantidad = 0;
    if (cantidadFilas(argumentos) > 0) {
        cantidad = argumentos.tabla[0].length;
    }
    return cantidad;
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
                    let contenido = "";
                    let { caracterSeparadorColumnasDatos, caracterSeparadorColumnasEnSeparadorDeFilas, caracterSeparadorFilas, relleno } = argumentos;
                    contenido += obtenerSeparador(caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas, cantidadColumnas(argumentos), argumentos.ajustesEncabezados)
                    for (const fila of argumentos.tabla) {
                        contenido += tabularDatos(fila.map((cadena, indiceColumna) => {
                            return {
                                contenido: cadena,
                                maximaLongitud: argumentos.ajustesEncabezados[indiceColumna].longitudMaxima,
                            };
                        }),
                            relleno, caracterSeparadorColumnasDatos).join("\n");
                        contenido += "\n";
                        contenido += obtenerSeparador(caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas, cantidadColumnas(argumentos), argumentos.ajustesEncabezados)
                    }
                    const argumentosParaDevolver = [
                        {
                            nombre: "EscribirTexto",
                            argumentos: [contenido],
                        },
                    ];
                    return argumentosParaDevolver;
                },
            },

        },
        "CodigoDeBarras": {
            nombre: "Código de barras",
            descripcion: `Código de barras`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirCodigoDeBarras;
                    const argumentosParaDevolver = <any>[
                        {
                            nombre: "EstablecerAlineacion",
                            argumentos: [argumentos.alineacion],
                        },
                    ];

                    if (
                        [
                            TipoDeCodigoDeBarras.Codabar,
                            TipoDeCodigoDeBarras.Code128,
                            TipoDeCodigoDeBarras.Code93,
                            TipoDeCodigoDeBarras.Ean,
                            TipoDeCodigoDeBarras.Ean8,
                            TipoDeCodigoDeBarras.UpcA,
                            TipoDeCodigoDeBarras.UpcE,
                        ].includes(argumentos.tipo)
                    ) {
                        argumentosParaDevolver.push({
                            nombre: argumentos.tipo,
                            argumentos: [argumentos.contenido, argumentos.alto, argumentos.ancho, argumentos.tamaño],
                        });
                    } else {
                        switch (argumentos.tipo) {
                            case TipoDeCodigoDeBarras.Code39:
                                argumentosParaDevolver.push({
                                    nombre: argumentos.tipo,
                                    argumentos: [argumentos.contenido, argumentos.incluirSumaDeVerificacion, argumentos.modoAsciiCompleto, argumentos.alto, argumentos.ancho, argumentos.tamaño],
                                });
                                break;

                            case TipoDeCodigoDeBarras.Pdf417:
                                argumentosParaDevolver.push({
                                    nombre: argumentos.tipo,
                                    argumentos: [argumentos.contenido, argumentos.nivelDeSeguridad, argumentos.alto, argumentos.ancho, argumentos.tamaño],
                                });
                                break;

                            case TipoDeCodigoDeBarras.TwoOffFiveITF:
                                argumentosParaDevolver.push({
                                    nombre: argumentos.tipo,
                                    argumentos: [argumentos.contenido, argumentos.intercalado, argumentos.alto, argumentos.ancho, argumentos.tamaño],
                                });
                                break;
                        }
                    }
                    if (argumentos.imprimirContenido) {
                        argumentosParaDevolver.push({
                            nombre: "EscribirTexto",
                            argumentos: [argumentos.contenido + "\n"],
                        });
                    }
                    return argumentosParaDevolver;
                },
            },

        },
        "CodigoQr": {
            nombre: "Código QR",
            descripcion: `Código QR`,
            plataformas:
            {
                "Desktop": (thisArg: Operacion) => {
                    const argumentos = thisArg.argumentos as ArgumentosParaDefinirCodigoQr;
                    const argumentosParaDevolver = <any>[
                        {
                            nombre: "EstablecerAlineacion",
                            argumentos: [argumentos.alineacion],
                        },
                        {
                            nombre: "ImprimirCodigoQr",
                            argumentos: [argumentos.contenido, argumentos.ancho, argumentos.nivelDeRecuperacion, argumentos.tamaño],
                        }
                    ];
                    if (argumentos.imprimirContenido) {
                        argumentosParaDevolver.push({
                            nombre: "EscribirTexto",
                            argumentos: [argumentos.contenido + "\n"],
                        });
                    }
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