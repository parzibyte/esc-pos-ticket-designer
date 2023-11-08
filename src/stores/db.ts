import { defineStore } from 'pinia'
import DbWorker from "@/DBHelper?worker"
import * as Comlink from "comlink"
import type { OperacionSerializada } from '@/types/Tipos';
const worker = new DbWorker();
const DbHelper = Comlink.wrap(worker);
const helper = await new DbHelper();
await helper.iniciar()

export const useDatabaseStore = defineStore('database', () => {
    async function exec(consulta: string, argumentos: any[] = []) {
        return await helper.exec({
            sql: consulta,
            bind: argumentos,
            returnValue: "resultRows",
            rowMode: "object",
        });
    }
    async function obtenerOperacionesDeDiseño(id: number): Promise<OperacionSerializada[]> {
        return await exec("SELECT id, clave, argumentos, orden FROM operaciones_diseños WHERE id_diseño = ? ORDER BY orden ASC", [id]);
    }
    return { exec, obtenerOperacionesDeDiseño };
});