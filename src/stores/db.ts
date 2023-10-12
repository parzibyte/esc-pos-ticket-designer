import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import DbWorker from "@/DBHelper?worker"
import * as Comlink from "comlink"
const worker = new DbWorker();
const DbHelper = Comlink.wrap(worker);
const helper = await new DbHelper();
await helper.iniciar()
console.log("iniciado");

export const useDatabaseStore = defineStore('database', () => {
    async function exec(consulta: string, argumentos: any[]) {
        return await helper.exec({
            sql: consulta,
            bind: argumentos,
            returnValue: "resultRows",
            rowMode: "object",
        });
    }
    return { exec };
});