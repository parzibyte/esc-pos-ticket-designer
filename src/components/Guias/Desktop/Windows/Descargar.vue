<script setup lang="ts">
import imagenDescargarDesktop from "@/assets/Desktop_descargar.png";
import imagenExtraerDesktop from "@/assets/Extraer_plugin.png";
import imagenEjecutar from "@/assets/Desktop_ejecutar.png";
import desktopPermisos from "@/assets/Desktop_permisos.gif";
import PluginEnEjecucionWindows from "@/assets/PluginEnEjecucionWindows.png";
</script>
<template>
    <ol class="list-inside list-decimal">
        <li>
            Navega al siguiente enlace:
            <a class="text-blue-500 font-semibold hover:text-blue-600"
                href="https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest" target="_blank">
                https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest
            </a> y una vez ahí, navega al final hasta Assets
        </li>
        <li>Elige el plugin llamado <code>plugin_v3.2.1.zip</code>. Si tienes problemas para ejecutarlo más adelante,
            entonces descarga <code>plugin_v3.2.1_si</code></li>
    </ol>
    <img :src="imagenDescargarDesktop" alt="">
    <div class="bg-red-500 rounded-md  p-2 text-white">
        En ocasiones, tu navegador web o antivirus van a bloquear la descarga. <strong>El plugin no tiene ningún
            tipo de virus</strong>, pero es tu responsabilidad forzar la descarga.
    </div>
    <p>Una vez descargado, en caso de que sea un archivo zip, debes extraerlo. En algunos sistemas, te dará la
        opción de extraer nativamente. En otros sistemas puedes instalar programas como WinZip, 7-Zip, etcétera. La
        extracción del programa queda fuera de este tutorial, pero es <strong>obligatorio extraerlo, y no solo abrirlo y
            ejecutarlo</strong></p>
    <img :src="imagenExtraerDesktop" alt="">
    <p>Al ser extraído tendrás un archivo ejecutable junto con un archivo DLL que es una librería (misma que siempre debe
        estar en el mismo lugar donde se ejecuta el plugin). Si elegiste la versión que tiene <code>si</code>en su nombre,
        esta DLL no estará presente. </p>
    <img :src="imagenEjecutar" alt="">
    <div class="bg-red-500 m-2 rounded-md  p-2 text-white">
        De nuevo, en ocasiones Windows o tu antivirus bloqueará la ejecución. Debes hacer clic en <strong>Más
            información</strong>, <strong>Opciones avanzadas</strong>
        o la opción que te permita forzar la ejecución. Eso cambia entre sistemas operativos y antivirus.
        <br>
        <strong>Debes darle al plugin todos los permisos. No tiene ningún tipo de virus</strong>
        <p>A continuación un ejemplo de cómo forzar la ejecución.</p>
    </div>
    <img :src="desktopPermisos" alt="">
    <p>Si has ejecutado el plugin pero aparece un error de ejecución (y no de seguridad) entonces descarga la versión que
        contiene <code>si</code> en su nombre</p>
    <strong>En caso de que no haya ningún error, pasa al siguiente paso. El plugin no muestra ventanas ni nada
        parecido</strong>
    <p>Como una comprobación final, puedes abrir el administrador de tareas ( <code>CTRL + SHIFT + ESC</code> ), ir a
        <strong>Detalles</strong> y revisar si el plugin se está ejecutando. Por ejemplo:</p>
    <img :src="PluginEnEjecucionWindows" alt="">
</template>