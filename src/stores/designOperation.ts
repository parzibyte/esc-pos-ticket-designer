import { defineStore } from 'pinia'
import { useDatabaseStore } from "@/stores/db"

import type { OperacionSerializada } from '@/types/Tipos';
export const useDesignsOperationStore = defineStore('designsOperationStore', () => {
	const dbStore = useDatabaseStore();
	const actualizarArgumentosDeOperacion = async (argumentos: string, id: number) => {
		return await dbStore.exec(`UPDATE operaciones_diseños SET argumentos = ? WHERE id = ?`, [argumentos, id]);
	}
	const cambiarOrdenDeOperacion = async (id: number, orden: number) => {
		return await dbStore.exec(`UPDATE operaciones_diseños SET orden = ? WHERE id = ?`, [orden, id]);
	}

	const agregarOperacion = async (idDiseño: number, clave: string, argumentos: string) => {
		const consulta = `INSERT INTO
    operaciones_diseños
	(id_diseño, clave, argumentos, orden)
VALUES
    (
        ?,
        ?,
        ?,
        (
            SELECT
                COALESCE(
                    (
                        SELECT
                            orden
                        FROM
                            operaciones_diseños
                        WHERE
                            id_diseño = ?
                        ORDER BY
                            orden DESC
                        LIMIT
                            1
                    ), 0
                )
        ) + 1
    ) RETURNING *`;
		return await dbStore.exec(consulta, [idDiseño, clave, argumentos, idDiseño]);
	}
	const eliminarOperacion = async (id: number) => {
		return await dbStore.exec(`DELETE FROM operaciones_diseños WHERE id = ?`, [id]);
	}
	const obtenerOperacionesDeDiseño = async (id: number): Promise<OperacionSerializada[]> => {
		return await dbStore.exec(`SELECT
		id, clave, argumentos, orden
		FROM operaciones_diseños
		WHERE id_diseño = ?
		ORDER BY orden ASC`,
			[id]);
	}
	return { actualizarArgumentosDeOperacion, cambiarOrdenDeOperacion, agregarOperacion, eliminarOperacion, obtenerOperacionesDeDiseño };
});