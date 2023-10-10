import type { Component } from "vue";
export type OperacionDelDiseñador = {
    nombre: string;
    descripcion: string;
    valor?: string;
    componente?: string;
    argumentos?: any,
}