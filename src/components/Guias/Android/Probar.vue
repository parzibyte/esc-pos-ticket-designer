<script setup lang="ts">
import verDispositivos from "@/assets/Android/VerDispositivos.jpg";
import ticketImpreso from "@/assets/Android/TicketImpreso.jpg";
</script>
<template>
    <div>
        Ahora que has ejecutado la aplicación, es importante que consideres lo siguiente:
        <ol class="list-inside list-decimal">
            <li>La impresora debe estar emparejada/sincronizada previamente</li>
            <li>Para que todo funcione correctamente, el plugin siempre debe estar en ejecución. Es tu responsabilidad
                configurar el
                economizador de batería y prioridad de la app en segundo plano</li>
            <li>Debes dejar el plugin en la pantalla que dice <strong>Plugin funcionando correctamente</strong> y
                minimizarlo</li>
            <li>Cada vez que quieras agregar una nueva impresora para que aparezca en la lista de impresoras del diseñador,
                sigue los pasos que se presentan a continuación, pero no
                te olvides de regresar a la pantalla principal (la que dice <strong>Plugin funcionando
                    correctamente</strong> ) y minimizar el plugin desde ahí</li>
        </ol>
        <hr class="mb-2">
        <p>Enciende el Bluetooth de tu dispositivo y la impresora térmica Bluetooth. Toca <strong>Ver impresoras
                disponibles</strong> y espera
            a que la lista cargue.<strong> Si la app vuelve a pedir permiso, debes concederlo.</strong> Cuando localices tu
            impresora,
            toca el botón <strong>Imprimir prueba</strong>. Para este caso, la impresora es la <strong>MTP-II</strong>:
        </p>
        <img class="mx-auto mb-4" :src="verDispositivos" alt="">
        <p>Si tu impresora no aparece, asegúrate de haberla emparejado previamente, enciende el Bluetooth y la impresora,
            después toca el botón para refrescar la lista</p>
        <p>En caso de que tu impresora sea compatible con el plugin, va a aparecer un ticket parecido al siguiente. Si eso
        sucede, entonces estás listo para usar el diseñador, así que puedes pasar al siguiente paso</p>
    <img class="mx-auto mb-4" :src="ticketImpreso" alt="">
</div></template>