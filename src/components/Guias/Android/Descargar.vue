<script setup lang="ts">
import descargar from "@/assets/Android/DescargarPlugin.png";
import forzarDescarga from "@/assets/Android/ForzarDescarga.jpg";
</script>
<template>
    <div>
        <p>Navega al siguiente enlace y descarga <code class="break-all">PluginImpresorasTermicasBT_1.1.apk</code> en el apartado
            <strong>Assets</strong> (Normalmente está al final de la página, en la parte inferior): <a
                class="text-blue-500 hover:text-blue-600 hover:font-semibold"
                href="https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/">https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/</a>
        </p>
        <img class="mx-auto" :src="descargar" alt="">
        <div class="bg-indigo-500 text-white p-2 my-2 rounded-sm">Recuerda que el plugin no contiene ningún tipo de virus. Es
            tu obligación forzar su descarga. En este ejemplo hay que elegir 
            <strong>Descargar de todos modos</strong> al usar Google Chrome:
        </div>
        <img class="mx-auto" :src="forzarDescarga" alt="">
        <div>
            Una vez descargado ya puedes pasar al siguiente paso
        </div>
    </div>
</template>