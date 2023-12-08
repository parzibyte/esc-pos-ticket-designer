import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
const formateadoresPorIdioma: Record<string, Intl.DateTimeFormat> = {
	"es": new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' }),
	"en": new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'medium' }),
};
export const useFiltersStore = defineStore('filtersStore', () => {
	const { locale } = useI18n();
	const date = (ms: number) => {
		if (!ms) {
			return "";
		}
		const date = new Date(ms);
		if (!date) {
			return "";
		}
		return formateadoresPorIdioma[locale.value].format(date);
	}
	return { date };
});