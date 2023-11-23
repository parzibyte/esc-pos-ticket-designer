<script setup lang="ts">
import clicDerecho from "@/assets/CompartirW10Anteriores/Click-derecho.png";
import compartir1 from "@/assets/CompartirW10Anteriores/Compartir-1.png";
import compartirImpresoraLocal from "@/assets/CompartirW10Anteriores/Compartir-2.png";
</script>
<template>
    <div>
        <ul class="list-decimal list-inside">
            <li>
                Una vez instalada ve al <strong> Panel de control </strong> y después a <strong> Dispositivos e impresoras
                </strong>.
                Ahí, haz clic derecho a la impresora que quieres compartir y elige <strong> Propiedades de impresora
                </strong>:
                <img :src="clicDerecho" />
            </li>
            <li>Ve a la pestaña de
                <strong>Uso compartido </strong>
                y si la opción
                <strong>
                    Compartir esta impresora
                </strong>
                está deshabilitada entonces haz clic en el botón que dice
                <strong>
                    Cambiar opciones de uso compartido
                </strong>
                <img :src="compartir1" />
            </li>
            <li>Una vez que hayas habilitado el uso compartido, marca la casilla
                <strong>Compartir esta impresora</strong> y escribe el mismo nombre de la impresora sin cambiarlo y
                <strong>sin espacios ni caracteres especiales</strong>, debe tener el mismo nombre de la impresora, no lo
                olvides
                <img :src="compartirImpresoraLocal" />
                Finalmente haz clic en <strong>Aceptar</strong> y tu impresora estará compartida
            </li>
        </ul>
    </div>
</template>