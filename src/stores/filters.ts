import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filtersStore', () => {
	const formateador = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' });
	const date = (ms: number) => {
		if (!ms) {
			return "";
		}
		const date = new Date(ms);
		if (!date) {
			return "";
		}
		return formateador.format(date);
	}
	return { date };
});