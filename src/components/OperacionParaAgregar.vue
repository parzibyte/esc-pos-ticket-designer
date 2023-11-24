<script lang="ts" setup>
import { Operacion } from '@/types/Operacion';
import ContentCut from "vue-material-design-icons/ContentCut.vue";
import Brush from "vue-material-design-icons/Brush.vue";
import TextBoxEdit from "vue-material-design-icons/TextBoxEdit.vue";
import Image from "vue-material-design-icons/Image.vue";
import Table from "vue-material-design-icons/Table.vue";
import Barcode from "vue-material-design-icons/Barcode.vue";
import Qr from "vue-material-design-icons/Qrcode.vue";
import FileImage from "vue-material-design-icons/FileImage.vue";
import ScissorsCutting from "vue-material-design-icons/ScissorsCutting.vue";
import CloudDownload from "vue-material-design-icons/CloudDownload.vue";
import PrinterPosCancel from "vue-material-design-icons/PrinterPosCancel.vue";
import PrinterPosCheck from "vue-material-design-icons/PrinterPosCheck.vue";
import Text from "vue-material-design-icons/Text.vue";
import FormatAlignRight from "vue-material-design-icons/FormatAlignRight.vue";
import FormatBold from "vue-material-design-icons/FormatBold.vue";
import FormatFont from "vue-material-design-icons/FormatFont.vue";
import InvertColors from "vue-material-design-icons/InvertColors.vue";
import ArrowUUpRight from "vue-material-design-icons/ArrowUUpRight.vue";
import RotateRight from "vue-material-design-icons/RotateRight.vue";
import FormatUnderline from "vue-material-design-icons/FormatUnderline.vue";
import FormatFontSizeIncrease from "vue-material-design-icons/FormatFontSizeIncrease.vue";
import PaperRoll from "vue-material-design-icons/PaperRoll.vue";
import CurrencyEur from "vue-material-design-icons/CurrencyEur.vue";
import CurrencyEurOff from "vue-material-design-icons/CurrencyEurOff.vue";
import ImageText from "vue-material-design-icons/ImageText.vue";
import FormatClear from "vue-material-design-icons/FormatClear.vue";
import CashRegister from "vue-material-design-icons/CashRegister.vue";
import Tilde from "vue-material-design-icons/Tilde.vue";
import type { Component } from 'vue';

type PropiedadesDelComponente = {
    operacion: Operacion,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
})

type MapaIconos = {
    [key: string]: Component,
}

type MapaColores = {
    [key: string]: string,
}

const mapaDeIconosSegunClaveDeOperacion: MapaIconos = {
    "Corte": ContentCut,
    "DefinirCaracterPersonalizado": Brush,
    "Texto": TextBoxEdit,
    "Imagen": Image,
    "Tabla": Table,
    "CodigoDeBarras": Barcode,
    "CodigoQr": Qr,
    "ImagenLocal": FileImage,
    "CorteParcial": ScissorsCutting,
    "DescargarImagenDeInternet": CloudDownload,
    "DeshabilitarCaracteresPersonalizados": CurrencyEurOff,
    "DeshabilitarElModoDeCaracteresChinos": PrinterPosCancel,
    "TextoSimple": Text,
    "EstablecerAlineacion": FormatAlignRight,
    "EstablecerEnfatizado": FormatBold,
    "EstablecerFuente": FormatFont,
    "EstablecerImpresionAlReves": ArrowUUpRight,
    "EstablecerImpresionBlancoYNegroInversa": InvertColors,
    "EstablecerRotacionDe90Grados": RotateRight,
    "EstablecerSubrayado": FormatUnderline,
    "EstablecerTamañoFuente": FormatFontSizeIncrease,
    "Feed": PaperRoll,
    "HabilitarCaracteresPersonalizados": CurrencyEur,
    "HabilitarElModoDeCaracteresChinos": PrinterPosCheck,
    "ImprimirImagenEnBase64": ImageText,
    "Iniciar": FormatClear,
    "Pulso": CashRegister,
    "TextoSegunPaginaDeCodigos": Tilde,
}
const mapaDeColoresSegunClaveDeOperacion: MapaColores = {
    "Corte": "#fb7185",
    "DefinirCaracterPersonalizado": "#fde047",
    "Texto": "#6366f1",
    "Imagen": "#c084fc",
    "Tabla": "#6366f1",
    "CodigoDeBarras": "#c084fc",
    "CodigoQr": "#c084fc",
    "ImagenLocal": "#c084fc",
    "CorteParcial": "#fb7185",
    "DescargarImagenDeInternet": "#c084fc",
    "DeshabilitarCaracteresPersonalizados": "#fde047",
    "DeshabilitarElModoDeCaracteresChinos": "#4ade80",
    "TextoSimple": "#6366f1",
    "EstablecerAlineacion": "#60a5fa",
    "EstablecerEnfatizado": "#60a5fa",
    "EstablecerFuente": "#fb923c",
    "EstablecerImpresionAlReves": "#60a5fa",
    "EstablecerImpresionBlancoYNegroInversa": "#60a5fa",
    "EstablecerRotacionDe90Grados": "#60a5fa",
    "EstablecerSubrayado": "#60a5fa",
    "EstablecerTamañoFuente": "#fb923c",
    "Feed": "#fb7185",
    "HabilitarCaracteresPersonalizados": "#fde047",
    "HabilitarElModoDeCaracteresChinos": "#4ade80",
    "ImprimirImagenEnBase64": "#c084fc",
    "Iniciar": "#86efac",
    "Pulso": "#fb7185",
    "TextoSegunPaginaDeCodigos": "#4ade80",
}
</script>
<template>
    <div class="bg-white p-1 rounded-md  break-words cursor-pointer border border-gray-150 hover:bg-gray-100 flex flex-col">
        <div class="flex justify-center">
            <component :fillColor="mapaDeColoresSegunClaveDeOperacion[propiedades.operacion.clave]" size="60"
                :is="mapaDeIconosSegunClaveDeOperacion[propiedades.operacion.clave]"></component>
        </div>
        <p>
            <strong>{{ propiedades.operacion.nombre }}</strong>: {{ propiedades.operacion.descripcion }}
        </p>
    </div>
</template>