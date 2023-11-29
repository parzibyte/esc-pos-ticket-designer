<script setup lang="ts">
import agregarImpresoraLocal from "@/assets/ImpresoraWindows10YAnteriores/Agregar-impresora-local.png";
import impresoraUsb1 from "@/assets/ImpresoraWindows10YAnteriores/Impresora-usb-1.png";
import generico from "@/assets/ImpresoraWindows10YAnteriores/Drivers-genéricos.png";
import nombre from "@/assets/ImpresoraWindows10YAnteriores/Nombre-de-la-impresora.png";
import instalacionTerminada from "@/assets/ImpresoraWindows10YAnteriores/Instalación-terminada.png";
</script>
<template>
    <li>
        Se abrirá una nueva ventana, ahí elige <strong>Agregar una impresora local o de red con configuración
            manual</strong> y luego haz clic en
        <strong>Siguiente</strong>
        <img class="mx-auto" :src="agregarImpresoraLocal" />
    </li>
    <li>En la siguiente ventana vamos a elegir el puerto USB00X en donde la X es un número. Si hay más de un puerto
        USB y al llegar a la prueba de impresión no se imprime nada, tendremos que volver a este punto para
        seleccionar otro puerto. En mi caso sólo hay uno, por lo que
        tomaré ese.
        <img class="mx-auto" :src="impresoraUsb1" />
        Haz clic en <strong>Siguiente</strong>
    </li>
    <li>
        En la siguiente ventana, para <strong>Fabricante</strong> elige <strong>Generic</strong> y en
        <strong>Impresoras</strong> elige <strong>Generic / Text Only</strong>. Luego haz clic en
        <strong>Siguiente</strong>
        <img class="mx-auto" :src="generico" />
    </li>
    <li>Es momento de elegir un nombre para tu impresora.
        <strong>Es muy importante que no uses caracteres especiales ni espacios. Usa solo letras y guiones</strong>
        Luego, haz clic en <strong>Siguiente</strong>
        <img class="mx-auto" :src="nombre" />
    </li>
    <li>
        Para terminar, imprime una página de prueba. Si la página de prueba se imprime correctamente, entonces ya
        puedes pasar al siguiente paso. En caso contrario, puedes volver a los pasos anteriores y revisar si
        omitiste algún paso o si deberías elegir otro puerto
        <img class="mx-auto" :src="instalacionTerminada" />
    </li>
</template>