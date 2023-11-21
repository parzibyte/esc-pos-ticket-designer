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
    const guardarAjustesDeDiseño = async (id_diseño: number, indice_lenguaje_programacion: number) => {
        return await dbStore.exec(`REPLACE INTO ajustes_diseños(id_diseño, indice_lenguaje_programacion)
        VALUES (?, ?)`, [id_diseño, indice_lenguaje_programacion]);
    }
    const obtenerAjustesDeDiseño = async (id_diseño: number) => {
        const filas = await dbStore.exec(`SELECT id_diseño, indice_lenguaje_programacion FROM
        ajustes_diseños
        WHERE
        id_diseño = ?`, [id_diseño]);
        if (filas.length > 0) {
            return filas[0];
        } else {
            return {
                indice_lenguaje_programacion: 0,
            };
        }
    }
    return { obtenerAjustes, guardarAjustes, guardarAjustesDeDiseño,obtenerAjustesDeDiseño };
});