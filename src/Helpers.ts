import type { Operacion } from "./types/Operacion";
import { OperacionFactory } from "./types/OperacionFactory";
import type { ArgumentosParaDefinirTabla, EncabezadoDeTabla, ImpresoraAndroid, OperacionSerializada, Payload, PlataformaRecuperadaDeBaseDeDatos } from "./types/Tipos";
export const debounce = (callback: Function, wait: number) => {
    let timerId: number;
    return (...args: any) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
};
export const separarCadenaEnArregloSiSuperaLongitud = (cadena: string, maximaLongitud: number) => {
    const resultado = [];
    let indice = 0;
    while (indice < cadena.length) {
        const pedazo = cadena.substring(indice, indice + maximaLongitud);
        indice += maximaLongitud;
        resultado.push(pedazo);
    }
    return resultado;
}

export const dividirCadenasYEncontrarMayorConteoDeBloques = function (contenidosConMaximaLongitud: { contenido: string, maximaLongitud: number }[]): [{ separadas: string[], maximaLongitud: number }[], number] {
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


export const tabularDatos = (cadenas: { contenido: string, maximaLongitud: number }[], relleno: string, separadorColumnas: string) => {
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
export const obtenerSeparador = (caracterSeparadorFilas: string, caracterSeparadorColumnasEnSeparadorDeFilas: string, cantidadColumnas: number, ajustesEncabezados: EncabezadoDeTabla[]) => {
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
export const cantidadFilas = (argumentos: ArgumentosParaDefinirTabla) => {
    return argumentos.tabla.length;
}
export const cantidadColumnas = (argumentos: ArgumentosParaDefinirTabla) => {
    let cantidad = 0;
    if (cantidadFilas(argumentos) > 0) {
        cantidad = argumentos.tabla[0].length;
    }
    return cantidad;
}
export const obtenerPayload = (plataforma: string, operaciones: Operacion[], impresora: string, serial: string): Payload => {
    const operacionesParaPayload = [];
    for (const operacion of operaciones) {
        operacionesParaPayload.push(...(operacion.obtenerArgumentosPorPlataforma(plataforma)));
    }
    return {
        nombreImpresora: impresora,
        serial,
        operaciones: operacionesParaPayload,
    };
}

export const convertirOperacionesSerializadasAReactivas = (operacionesSerializadas: OperacionSerializada[]) => {
    const operacionesReactivas: Operacion[] = [];
    for (const operacionSerializada of operacionesSerializadas) {
        const operacion = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(
            operacionSerializada.id,
            operacionSerializada.clave,
            operacionSerializada.argumentos,
            operacionSerializada.orden,
        );
        operacionesReactivas.push(operacion);
    }
    return operacionesReactivas;
}
export const obtenerPayloadComoJson = (plataforma: string, operaciones: Operacion[], impresora: string, serial: string) => {
    return JSON.stringify(obtenerPayload(plataforma, operaciones, impresora, serial));
}



export const plataformaEsAndroid = (plataformaSeleccionada: PlataformaRecuperadaDeBaseDeDatos) => {
    return plataformaSeleccionada.nombre === "Android";
}

export const obtenerNombreDeImpresoraComoCadena = (plataformaSeleccionada: PlataformaRecuperadaDeBaseDeDatos, impresoraSeleccionada: any): string => {
    let verdaderoNombreImpresora: string = "";
    if (plataformaEsAndroid(plataformaSeleccionada)) {
        const impresoraComoAndroid = impresoraSeleccionada as ImpresoraAndroid;
        verdaderoNombreImpresora = impresoraComoAndroid.mac;
    } else {
        verdaderoNombreImpresora = impresoraSeleccionada as string;
    }
    return verdaderoNombreImpresora;
}