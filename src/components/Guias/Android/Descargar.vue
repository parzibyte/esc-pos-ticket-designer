<script setup lang="ts">
import descargar from "@/assets/Android/DescargarPlugin.png";
import forzarDescarga from "@/assets/Android/ForzarDescarga.jpg";
</script>
<template>
    <div>
        <p>Navega al siguiente enlace y descarga <code>PluginImpresorasTermicasBT_1.1.apk</code> en el apartado
            <strong>Assets</strong> (Normalmente está al final de la página, en la parte inferior): <a
                class="text-blue-500 hover:text-blue-600 hover:font-semibold"
                href="https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/">https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/</a>
        </p>
        <img :src="descargar" alt="">
        <div class="bg-indigo-500 text-white p-2 m-2 rounded-sm">Recuerda que el plugin no contiene ningún tipo de virus. Es
            tu obligación forzar su descarga. Por ejemplo, en mi caso así me aparece al usar Chrome y hay que
            elegir<strong>Descargar de todos modos</strong>:
        </div>
        <img :src="forzarDescarga" alt="">
        <div>
            Una vez descargado ya puedes pasar al siguiente paso
        </div>
    </div>
</template>