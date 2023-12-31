import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';
import { usePlatformStore } from './platform';

type DiccionarioDePlataformas = {
    [key: string]: {
        id: number,
        nombre: string,
        descripcion: string,
        ruta_api: string,
        licencia: string,
        detalles: {
            version: string,
            plataforma: string,
            sistemaOperativo: string,
            activa: boolean,
        },
    },
}
export const usePingPlatformStore = defineStore('ping_platform', () => {
    const estado: Ref<DiccionarioDePlataformas> = ref({});
    const platformsStore = usePlatformStore();

    const inicializarPlataformas = async () => {
        const plataformas = await platformsStore.obtenerPlataformas();
        for (const plataforma of plataformas) {
            estado.value[plataforma.id] = {
                detalles: {
                    version: "",
                    plataforma: "",
                    sistemaOperativo: "",
                    activa: false,
                },
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
            respuesta.activa = true;
            return respuesta;
        } catch (e) {
            return false;
        }
    }
    async function actualizarEstadoDeTodasLasPlataformas() {
        for (const [clave, valor] of Object.entries(estado.value)) {
            estado.value[clave].detalles = await consultarEstadoDePlataforma(valor.ruta_api);
        }
        setTimeout(actualizarEstadoDeTodasLasPlataformas, 1000);
    }
    inicializarPlataformas();
    return { estado };
});