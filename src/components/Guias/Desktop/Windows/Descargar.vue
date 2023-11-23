<script setup lang="ts">
import imagenDescargarDesktop from "@/assets/Desktop_descargar.png";
import imagenExtraerDesktop from "@/assets/Extraer_plugin.png";
import imagenEjecutar from "@/assets/Desktop_ejecutar.png";
import desktopPermisos from "@/assets/Desktop_permisos.gif";
</script><template>
    <p>Descarga el plugin desde
        <a target="_blank" href="https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest"
            class="text-blue-500 font-semibold">
            este enlace
        </a>
        según tu sistema operativo (navega hasta el final en <strong>Assets</strong>).
        <br>
        La opción más común es
        <code>plugin_impresoras_termicas_v3.2.1_prod_64.zip</code>
    </p>
    <img :src="imagenDescargarDesktop" alt="">
    <div class="bg-red-500 m-2 rounded-md  p-2 text-white">
        En ocasiones, tu navegador web o antivirus van a bloquear la descarga. <strong>El plugin no tiene ningún
            tipo de virus</strong>, pero es tu responsabilidad forzar la descarga.
    </div>
    <p>Una vez descargado, en caso de que sea un archivo zip, debes extraerlo. En algunos sistemas, te dará la
        opción de extraer:</p>
    <img :src="imagenExtraerDesktop" alt="">
    <p>Al ser extraído tendrás un archivo ejecutable</p>
    <img :src="imagenEjecutar" alt="">
    <div class="bg-red-500 m-2 rounded-md  p-2 text-white">
        De nuevo, en ocasiones Windows o tu antivirus bloqueará la ejecución. Debes hacer clic en <strong>Más
            información</strong>, <strong>Opciones avanzadas</strong>
        o la opción que te permita forzar la ejecución. Eso cambia entre sistemas operativos.
        <br>
        <strong>Debes darle al plugin todos los permisos. No tiene ningún tipo de virus</strong>
        <p>A continuación un ejemplo de cómo forzar la ejecución. Esto puede cambiar según tu sistema operativo y
            antivirus</p>
    </div>

    <img :src="desktopPermisos" alt="">
    <p>Tan pronto el plugin se ejecute, este mensaje desaparecerá. Si sigues viéndolo, es porque no has descargado
        el plugin correcto o no lo has ejecutado</p>
    <CustomCheckbox label="Ya he descargado el plugin"></CustomCheckbox>
    <p>También puedes ver el siguiente vídeo para una guía específica y paso a paso</p>
</template>