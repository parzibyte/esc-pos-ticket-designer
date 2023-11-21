import { defineStore } from 'pinia'
import { useDatabaseStore } from "@/stores/db"

export const useSettingsStore = defineStore('settingsStore', () => {
    const dbStore = useDatabaseStore();
    const obtenerAjustes = async () => {
        const filas = await dbStore.exec(`SELECT 
        modo_programador
        FROM ajustes`);
        return filas[0];
    }

    const guardarAjustes = async (modo_programador: number) => {
        return await dbStore.exec(`UPDATE ajustes SET
        modo_programador = ?`, [modo_programador]);
    }
    return { obtenerAjustes, guardarAjustes };
});