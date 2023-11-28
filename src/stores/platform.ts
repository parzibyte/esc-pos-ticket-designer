import { defineStore } from 'pinia'
import { useDatabaseStore } from "@/stores/db"
import type { PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';

export const usePlatformStore = defineStore('platformStore', () => {
	const dbStore = useDatabaseStore();
	const obtenerPlataformas = async (): Promise<PlataformaRecuperadaDeBaseDeDatos[]> => {
		return await dbStore.exec("SELECT id, nombre, descripcion, ruta_api, licencia FROM plataformas");
	}
	const actualizarPlataforma = async (plataforma: PlataformaRecuperadaDeBaseDeDatos) => {
		return await dbStore.exec(
			"UPDATE plataformas SET ruta_api = ?, licencia = ? WHERE id = ?",
			[plataforma.ruta_api, plataforma.licencia, plataforma.id]
		);
	}
	const obtenerPlataformaPorId = async (id: string | number): Promise<PlataformaRecuperadaDeBaseDeDatos> => {
		const plataformasCoincidentes = await dbStore.exec("SELECT id, nombre, descripcion, ruta_api, licencia FROM plataformas WHERE id = ?", [id]);
		return plataformasCoincidentes[0];
	}
	return { obtenerPlataformas, actualizarPlataforma, obtenerPlataformaPorId };
});