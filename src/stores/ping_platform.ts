import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';
import { useDatabaseStore } from "@/stores/db"
import { PlataformasService } from "@/services/PlataformasService"

type DiccionarioDePlataformas = {
    [key: string]: {
        id: number,
        nombre: string,
        descripcion: string,
        ruta_api: string,
        licencia: string,
        activa: boolean,
    },
}
export const usePingPlatformStore = defineStore('ping_platform', () => {
    const dbStore = useDatabaseStore();
    const plataformaService = new PlataformasService(dbStore);
    const estado: Ref<DiccionarioDePlataformas> = ref({});


    const inicializarPlataformas = async () => {
        const plataformas = await plataformaService.obtenerPlataformas();
        for (const plataforma of plataformas) {
            estado.value[plataforma.id] = {
                activa: false,
                ruta_api: plataforma.ruta_api,
                id: plataforma.id,
                nombre: plataforma.nombre,
                descripcion: plataforma.descripcion,
                licencia: plataforma.licencia,
            }
        }
        actualizarEstadoDeTodasLasPlataformas();
    }

    const consultarEstadoDePlataforma = async (url: string) => {
        try {
            const httpResponse = await fetch(url + "/version");
            const respuesta = await httpResponse.json();
            return respuesta.version === "3.2.1";
        } catch (e) {
            return false;
        }
    }
    async function actualizarEstadoDeTodasLasPlataformas() {
        for (const [clave, valor] of Object.entries(estado.value)) {
            estado.value[clave].activa = await consultarEstadoDePlataforma(valor.ruta_api);
        }
        setTimeout(actualizarEstadoDeTodasLasPlataformas, 1000);
    }
    inicializarPlataformas();
    return { estado };
});