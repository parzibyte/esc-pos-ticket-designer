import { defineStore } from 'pinia'
import { useDatabaseStore } from "@/stores/db"

export const useDesignsStore = defineStore('designsStore', () => {
	const dbStore = useDatabaseStore();
	const insertarDiseño = async (idPlataforma: number | string, nombre: string, impresora: string) => {
		const ahora = new Date().getTime();
		await dbStore.exec(`INSERT INTO diseños
		(id_plataforma, nombre, fecha_modificacion, impresora)
		VALUES
		(?, ?, ?, ?)`,
			[idPlataforma, nombre, ahora, impresora],
		);
	}
	const actualizarDiseño = async (idPlataforma: number | string, nombre: string, impresora: string, id: number | string) => {
		await dbStore.exec(`UPDATE diseños SET 
		id_plataforma = ?,
		nombre = ?,
		fecha_modificacion = ?,
		impresora = ?
		WHERE id = ?  `,
			[idPlataforma, nombre, new Date().getTime(), impresora, id],
		);
	}

	const obtenerDiseñoPorId = async (id: number | string) => {
		const diseñosCoincidentesConId = await dbStore.exec(`select d.id,
	d.nombre,
	d.fecha_modificacion,
	d.impresora,
	p.id AS id_plataforma,
	p.nombre AS plataforma,
	p.licencia,
	p.ruta_api
from diseños d
	inner join plataformas p on d.id_plataforma = p.id
  WHERE d.id = ?`, [id]);
		return diseñosCoincidentesConId[0];
	}

	return { obtenerDiseñoPorId, actualizarDiseño, insertarDiseño };
});