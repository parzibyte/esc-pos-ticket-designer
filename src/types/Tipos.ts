import { Operacion } from "./Operacion"
export type ArgumentosParaDefinirImagenLocal = {
    ruta: string,
    alineacion: AlineacionConNombreYValor,
    algoritmoImagen: AlgoritmoDeImpresionDeImagenConNombre,
    maximoAncho: number,
    aplicarDithering: boolean,
}
export type ArgumentosParaDefinirCaracterPersonalizado = {
    matrizDeBits: Array<Array<string>>,
    caracterQueReemplaza: string,
}
export enum Alineacion {
    Izquierda = 0,
    Centro,
    Derecha,
}

export enum AlgoritmoImpresionImagen {
    RasterBitImage = 0,
    BitImageColumnFormat,
    NVGraphics,
}

export const ALGORITMO_IMPRESION_POR_DEFECTO: AlgoritmoDeImpresionDeImagenConNombre = {
    nombre: "Raster",
    valor: AlgoritmoImpresionImagen.RasterBitImage,
}
/**
 * En mi impresora térmica de 58mm en la verdadera medida es 47mm, lo máximo que soporta para una
 * imagen completa en su ancho es 384. Entonces ocupa 0.122mm por pixel, así que en una de 80mm que
 * puede tener una medida de 69, la máxima sería 566 de ancho. Si suponemos que no tiene márgenes, sería de 655
 * pixeles de ancho, redondeado al anterior múltiplo de 8 es 648
 */
export const MAXIMO_ANCHO_IMAGEN_58_MM = 384;
export const MAXIMO_ANCHO_IMAGEN_80_MM = 648;
export enum TamañoImagen {
    Normal = 0,
    DobleAncho,
    DobleLargo,
    DobleAnchoYLargo,
}
export type ArgumentosParaDefinirCorte = {
    lineas: number,
}
export type ArgumentosParaDefinirPulso = {
    pin: number,
    tiempoEncendido: number,
    tiempoApagado: number,
}
export type ArgumentosParaDefinirFeed = {
    lineas: number,
}
export type ArgumentosParaDefinirImagenEnBase64 = {
    alineacion: AlineacionConNombreYValor,
    algoritmoImagen: AlgoritmoDeImpresionDeImagenConNombre,
    maximoAncho: number,
    contenidoEnBase64: string,
    aplicarDithering: boolean,
}
export type ArgumentosParaDefinirTextoSimple = {
    contenido: string,
}
export type ArgumentosParaDefinirTextoSegunPaginaDeCodigos = {
    texto: string,
    numeroPagina: number,
    pagina: string,
}

export type ArgumentosParaDefinirCorteParcial = {
}
export type ArgumentosParaDefinirImagenDeInternet = {
    alineacion: AlineacionConNombreYValor,
    algoritmoImagen: AlgoritmoDeImpresionDeImagenConNombre,
    maximoAncho: number,
    url: string,
    aplicarDithering: boolean,
}

export type ArgumentosParaDefinirTexto = {
    texto: string,
    ancho: number,
    alto: number,
    enfatizado: boolean,
    alineacion: AlineacionConNombreYValor,
    subrayado: boolean,
    alReves: boolean,
    inverso: boolean,
    rotacion90: boolean,
}

export type ArgumentosParaDefinirImagen = {
    alineacion: AlineacionConNombreYValor,
    ancho: number,
    alto: number,
    maximoAncho: number,
    maximoAlto: number,
    contenidoEnBase64: string,
    algoritmo: AlgoritmoDeImpresionDeImagenConNombre,
    aplicarDithering: boolean,
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
export type TipoDeCodigoDeBarrasConNombreYValor = {
    nombre: string,
    valor: TipoDeCodigoDeBarras,
}
export type ArgumentosParaDefinirCodigoDeBarras = {
    tipo: TipoDeCodigoDeBarrasConNombreYValor,
    contenido: string,
    ancho: number,
    alto: number,
    alineacion: AlineacionConNombreYValor,
    incluirSumaDeVerificacion?: boolean,
    modoAsciiCompleto?: boolean,
    intercalado?: boolean,
    nivelDeSeguridad?: number,
    imprimirContenido: boolean,
    algoritmoImpresionImagen: AlgoritmoDeImpresionDeImagenConNombre,
}
export type NivelDeRecuperacionConNombreYValor = {
    nombre: string,
    valor: RecuperacionQr,
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
    alineacion: AlineacionConNombreYValor,
    nivelDeRecuperacion: NivelDeRecuperacionConNombreYValor,
    imprimirContenido: boolean,
    algoritmoImagen: AlgoritmoDeImpresionDeImagenConNombre,
}


export type Plataforma = Record<string, (thisArg: Operacion) => any>;

export type Diseño = {
    id: number,
    nombre: string,
    fechaModificacion: string,
}

export const TAMAÑOS_IMAGEN = [
    {
        nombre: "Normal",
        valor: TamañoImagen.Normal,
    },
    {
        nombre: "Doble ancho",
        valor: TamañoImagen.DobleAncho,
    },
    {
        nombre: "Doble largo",
        valor: TamañoImagen.DobleLargo,
    },
    {
        nombre: "Doble ancho y largo",
        valor: TamañoImagen.DobleAnchoYLargo,
    },

];

export const ALINEACIONES_PARA_IMAGEN_O_TEXTO = [
    {
        nombre: "Izquierda",
        valor: Alineacion.Izquierda,
    },
    {
        nombre: "Centro",
        valor: Alineacion.Centro,
    },
    {
        nombre: "Derecha",
        valor: Alineacion.Derecha,
    },

]

export const ALGORITMOS_PARA_IMPRIMIR_IMAGEN: AlgoritmoDeImpresionDeImagenConNombre[] = [
    {
        nombre: "Raster",
        valor: AlgoritmoImpresionImagen.RasterBitImage,
    },
    {
        nombre: "Bit",
        valor: AlgoritmoImpresionImagen.BitImageColumnFormat,
    },

    {
        nombre: "NV",
        valor: AlgoritmoImpresionImagen.NVGraphics,
    },
]

export type AlgoritmoDeImpresionDeImagenConNombre = {
    nombre: string,
    valor: AlgoritmoImpresionImagen,
}
export type AlineacionConNombreYValor = {
    nombre: string,
    valor: Alineacion,
}
export type ArgumentosParaDefinirAlineacion = {
    alineacion: AlineacionConNombreYValor,
}
export type TamañoConNombreYValor = {
    nombre: string,
    valor: TamañoImagen,
}

export type ArgumentosParaDefinirEnfatizado = {
    enfatizado: boolean,
}
export type ArgumentosParaDefinirImpresionAlReves = {
    alReves: boolean,
}
export type ArgumentosParaDefinirImpresionBlancoYNegroInversa = {
    inversa: boolean,
}
export type ArgumentosParaDefinirRotacionDe90Grados = {
    rotar: boolean,
}
export type ArgumentosParaDefinirSubrayado = {
    subrayar: boolean,
}
export type ArgumentosParaDefinirTamañoFuente = {
    ancho: number,
    alto: number,
}

export enum Fuente {
    A = 0,
    B,
}

export type ArgumentosParaDefinirFuente = {
    fuente: FuenteConNombreYValor,
}
export type FuenteConNombreYValor = {
    nombre: string,
    valor: Fuente,
}
export type OperacionConIndice = {
    operacion: Operacion,
    indice: number,
}
export type OperacionSerializada = {
    id: number,
    clave: string,
    argumentos: string,
    orden: number,
}
export type DiseñoRecuperadoDeBaseDeDatos = {
    ruta_api: string,
    id: number,
    licencia: string,
    plataforma: string,
    impresora: string,
    id_plataforma: number,
    nombre: string,
    fecha_modificacion: number,
}
export type PlataformaRecuperadaDeBaseDeDatos = {
    ruta_api: string,
    licencia: string,
    id: number,
    nombre: string,
    descripcion: string,
}
export type Payload = {
    nombreImpresora: string,
    serial: string,
    operaciones: any[],
}

export type PayloadAndroid = {
    impresora: string,
    serial: string,
    operaciones: any[],
}
export type ImpresoraAndroid = {
    mac: string,
    type: string,
    name: string,
}
export type PropiedadesParaFragmentoDeCodigo = {
    json: Payload | PayloadAndroid,
    diseño: DiseñoRecuperadoDeBaseDeDatos,
    payloadEscapado: string,
};
/**
 * Representa una fila de una tabla SQLite.
 */
export type TablaSQLite = {
    /** Identificador único de la columna. */
    cid: number;
    /** Valor predeterminado de la columna. Su tipo depende del tipo de la columna */
    dflt_value: any;
    /** Nombre de la columna. */
    name: string;
    /** Indica si la columna no puede contener valores nulos (1 si es verdadero, 0 si es falso). */
    notnull: number;
    /** Indica si la columna es una clave primaria (1 si es verdadero, 0 si es falso). */
    pk: number;
    /** Tipo de dato de la columna. */
    type: string;
};