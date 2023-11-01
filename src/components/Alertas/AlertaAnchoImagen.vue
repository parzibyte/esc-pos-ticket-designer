<script lang="ts" setup>
import { computed } from "vue"
type PropiedadesDelComponente = {
    ancho: number,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    ancho: 0,
})
/**
 * En mi impresora térmica de 58mm en la verdadera medida es 47mm, lo máximo que soporta para una
 * imagen completa en su ancho es 384. Entonces ocupa 0.122mm por pixel, así que en una de 80mm que
 * puede tener una medida de 69, la máxima sería 566 de ancho. Si suponemos que no tiene márgenes, sería de 655
 * pixeles de ancho, redondeado al anterior múltiplo de 8 es 648
 */
const MAXIMO_ANCHO_IMAGEN_58_MM = 384;
const MAXIMO_ANCHO_IMAGEN_80_MM = 648;

const deberiaMostrarAlertaSobreMaximoAncho = computed(() => propiedades.ancho > MAXIMO_ANCHO_IMAGEN_58_MM);

</script>
<template>
    <div v-show="deberiaMostrarAlertaSobreMaximoAncho" class="bg-red-500 rounded-md text-white p-2 my-1">
        <strong>Nota: </strong>según pruebas, sin redimensionar la imagen al
        imprimir, el ancho máximo para las
        impresoras de 58mm es de {{ MAXIMO_ANCHO_IMAGEN_58_MM }} y de {{ MAXIMO_ANCHO_IMAGEN_80_MM }} para las de 80mm. El
        ancho actual es de {{ propiedades.ancho }}
    </div>
</template>