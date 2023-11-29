<script setup lang="ts">
import ImagenCompartirW11 from "@/assets/ImpresoraW11/CompartirW11.png";
</script>
<template>
    <div>
        <ul class="list-decimal list-inside">
            <li>
                Una vez que tu impresora esté instalada busca y elige <strong>Impresoras y escáneres</strong> en el menú inicio.
                Ahí, haz clic sobre la impresora que quieres compartir. Eso te llevará a una pestaña de
                <strong>Configuración de la impresora;</strong> haz clic en <strong> Propiedades de impresora
                </strong>
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
            </li>
            <li>Una vez que hayas habilitado el uso compartido, marca la casilla
                <strong>Compartir esta impresora</strong> y escribe el mismo nombre de la impresora sin cambiarlo y
                <strong>sin espacios ni caracteres especiales</strong>, debe tener el mismo nombre de la impresora, no lo
                olvides
            </li>
            <li>
                Finalmente haz clic en <strong>Aceptar</strong> y tu impresora estará compartida. Los pasos se muestran a
                continuación:
                <img class="mx-auto" :src="ImagenCompartirW11" />
            </li>
        </ul>
    </div>
</template>