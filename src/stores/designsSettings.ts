import { defineStore } from 'pinia'
import { useDatabaseStore } from "@/stores/db"

export const useDesignsSettingsStore = defineStore('designsSettingsStore', () => {
    const dbStore = useDatabaseStore();
    const obtenerAjustesDiseño = async (id: string) => {
        return await dbStore.exec(`SELECT indice_lenguaje_programacion
FROM ajustes_diseños
	WHERE id_diseño = ?`, [id]);
    }
    return { obtenerAjustesDiseño };
});