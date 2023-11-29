<script setup lang="ts">
import imagenDescargarDesktop from "@/assets/Descargar_linux_raspbian.png";
import BloqueDeCodigo from "@/components/FragmentosCodigo/BloqueDeCodigo.vue";
import EjecutarPluginLinux from "@/assets/Ejecutando-plugin-para-impresora-termica-en-Linux.png"
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
        <li>Si usas un derivado de Debian, elige <code>plugin_v3.2.1_d.zip</code>
        </li>
        <li>
            Si usas Raspbian elige
            <code>plugin_v3.2.1_r.zip</code>
        </li>
    </ol>
    <img :src="imagenDescargarDesktop" alt="">
    <div class="bg-red-500 rounded-md my-2 p-2 text-white">
        En ocasiones, tu navegador web o antivirus van a bloquear la descarga. <strong>El plugin no tiene ningún
            tipo de virus</strong>, pero es tu responsabilidad forzar la descarga.
    </div>
    <p>Una vez descargado, en caso de que sea un archivo zip, debes extraerlo. Si cuentas con la utilidad <code>unzip</code>
        puedes hacer un:</p>
    <BloqueDeCodigo :codigo="`unzip nombre_plugin.zip`"></BloqueDeCodigo>
    <p>Al ser extraído tendrás un archivo ejecutable, ya sea en la misma carpeta o en una carpeta creada al extraer el zip.
        En ocasiones es necesario darle permisos con:</p>
    <BloqueDeCodigo :codigo="`sudo chmod +x nombre_archivo`"></BloqueDeCodigo>
    <p>Cuando cuentes con los permisos necesarios asegúrate de estar en la ubicación donde se ejecuta el plugin (cambiando
        con <code>cd</code> como sea necesario ) y ejecuta:</p>
    <BloqueDeCodigo :codigo="`./nombre_plugin`"></BloqueDeCodigo>
    <p>Por ejemplo, puede verse así:</p>
    <img :src="EjecutarPluginLinux">
    <p>Si más adelante quieres ejecutarlo en segundo plano sin que la terminal sea bloqueada, ejecuta</p>
    <BloqueDeCodigo :codigo="`./nombre_plugin 2>1 &`"></BloqueDeCodigo>
    <strong>En caso de que no haya ningún error y el plugin te haya mostrado el mensaje de ejecución, navega al siguiente
        paso.</strong>
</template>