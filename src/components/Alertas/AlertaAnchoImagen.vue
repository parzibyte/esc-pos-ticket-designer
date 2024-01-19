<script lang="ts" setup>
import { computed } from "vue"
import { MAXIMO_ANCHO_IMAGEN_58_MM, MAXIMO_ANCHO_IMAGEN_80_MM } from "@/types/Tipos"
type PropiedadesDelComponente = {
    ancho: number,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    ancho: 0,
})

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