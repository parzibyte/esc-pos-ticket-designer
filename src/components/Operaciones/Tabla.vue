<script setup lang="ts">
import type { ArgumentosParaDefinirTabla } from '@/types/Tipos';


type Propiedades = {
    modelValue: ArgumentosParaDefinirTabla,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            tabla: [],
            ajustesEncabezados: [],
            caracterSeparadorColumnasDatos: "|",
            caracterSeparadorColumnasEnSeparadorDeFilas: "+",
            caracterSeparadorFilas: "-",
            relleno: " ",
        };
    }
})

const LONGITUD_MAXIMA_POR_DEFECTO = 5;

const separarCadenaEnArregloSiSuperaLongitud = (cadena, maximaLongitud) => {
    const resultado = [];
    let indice = 0;
    while (indice < cadena.length) {
        const pedazo = cadena.substring(indice, indice + maximaLongitud);
        indice += maximaLongitud;
        resultado.push(pedazo);
    }
    return resultado;
}

const dividirCadenasYEncontrarMayorConteoDeBloques = (contenidosConMaximaLongitud) => {
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


const tabularDatos = (cadenas, relleno, separadorColumnas) => {
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

const xd = () => {
    let contenido = "";
    let { caracterSeparadorColumnasDatos, caracterSeparadorColumnasEnSeparadorDeFilas, caracterSeparadorFilas, relleno } = propiedades.modelValue;
    for (let indiceColumna = 0; indiceColumna < cantidadColumnas(); indiceColumna++) {
        contenido += tabularDatos(
            [{ contenido: caracterSeparadorFilas, maximaLongitud: propiedades.modelValue.ajustesEncabezados[indiceColumna].longitudMaxima }], caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas)
            .join(""); // Lo unimos con una cadena vacía porque siempre nos va a devolver un arreglo de longitud 1, básicamente estamos convirtiendo el array a cadena, la unión no importa
    }
    contenido += "\n";
    for (const fila of propiedades.modelValue.tabla) {
        contenido += tabularDatos(fila.map((cadena, indiceColumna) => {
            return {
                contenido: cadena,
                maximaLongitud: propiedades.modelValue.ajustesEncabezados[indiceColumna].longitudMaxima,
            };
        }),
            relleno, caracterSeparadorColumnasDatos).join("\n");
        contenido += "\n";
        for (let indiceColumna = 0; indiceColumna < fila.length; indiceColumna++) {
            contenido += tabularDatos(
                [{ contenido: caracterSeparadorFilas, maximaLongitud: propiedades.modelValue.ajustesEncabezados[indiceColumna].longitudMaxima }], caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas)
                .join(""); // Lo unimos con una cadena vacía porque siempre nos va a devolver un arreglo de longitud 1, básicamente estamos convirtiendo el array a cadena, la unión no importa
        }
        contenido += "\n"
    }
    return contenido;
}

const cantidadFilas = () => {
    return propiedades.modelValue.tabla.length;
}
const cantidadColumnas = () => {
    let cantidad = 0;
    if (cantidadFilas() > 0) {
        cantidad = propiedades.modelValue.tabla[0].length;
    }
    return cantidad;
}
const agregarColumna = () => {
    if (cantidadFilas() <= 0) {
        agregarFila();
        // Regresamos porque agregarFila agregará una columna si no hay ninguna
        return;
    }
    for (const fila of propiedades.modelValue.tabla) {
        fila.push("");
    }
    propiedades.modelValue.ajustesEncabezados.push({ longitudMaxima: LONGITUD_MAXIMA_POR_DEFECTO });
}
const agregarFila = () => {
    const fila = [];
    for (let i = 0; i < cantidadColumnas(); i++) {
        fila.push("");
    }
    propiedades.modelValue.tabla.push(fila);
    if (cantidadColumnas() <= 0) {
        agregarColumna();
    }
}

const quitarColumna = (indice: number) => {
    for (let i = 0; i < propiedades.modelValue.tabla.length; i++) {
        propiedades.modelValue.tabla[i].splice(indice, 1);
    }
    propiedades.modelValue.ajustesEncabezados.splice(indice, 1);
}

const quitarFila = (indice: number) => {
    propiedades.modelValue.tabla.splice(indice, 1);
}
</script>
<template>
    <pre>{{ xd() }}</pre>
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasDatos" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorFilas" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasEnSeparadorDeFilas" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.relleno" maxlength="1">

    <table class="border border-gray-200">
        <thead>
            <tr>
                <th v-for="ajuste in propiedades.modelValue.ajustesEncabezados">
                    <input type="number" v-model.number="ajuste.longitudMaxima">
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border border-gray-200" v-for="(fila, indiceFila) in propiedades.modelValue.tabla">
                <td class="border border-gray-200" v-for="(celda, indiceColumna) in fila">
                    <input type="text"
                        class="outline-none rounded-md border border-gray-200 focus:border-2 focus:border-blue-500 p-2"
                        v-model="propiedades.modelValue.tabla[indiceFila][indiceColumna]">
                </td>
                <td>
                    <button @click="quitarFila(indiceFila)">Quitar fila</button>
                </td>
            </tr>
            <tr>
                <td class="border border-gray-200" v-for="indice in cantidadColumnas()">
                    <button @click="quitarColumna(indice - 1)">Quitar columna</button>
                </td>
                <td>Nada</td>
            </tr>
        </tbody>
    </table>
    <button @click="agregarFila()">Agregar fila</button>
    <button @click="agregarColumna()">Agregar columna</button>
</template>