<script setup lang="ts">
import configuracion from "@/assets/Android/Configuracion.jpg"
import confiar from "@/assets/Android/Confiar.jpg"
import permitirInstalacion from "@/assets/Android/PermitirInstalacion.jpg"
import instalar from "@/assets/Android/Instalar.jpg"
import darPermisos from "@/assets/Android/DarPermisos.jpg"
import instalacionCorrecta from "@/assets/Android/InstalacionCorrecta.jpg"
</script>
<template>
    <div>
        Ahora que has descargado el plugin, debes instalarlo. El navegador te debe dar la opción, y en caso de que no, debes
        usar un explorador de archivos para localizar la app recién descargada.
        <br>
        <strong>En algunos casos, debes dar permisos de instalación de aplicaciones. Por ejemplo, si usas Chrome debes ir a
            la configuración:</strong>
        <img class="mx-auto mb-2"  :src="configuracion" alt="">
        <p>Confiar en la fuente:</p>
        <img class="mx-auto mb-2" :src="confiar" alt="">
        <p>Leer y permitir la instalación:</p>
        <img class="mx-auto mb-2" :src="permitirInstalacion" alt="">
        <p>Y finalmente instalar:</p>
        <img class="mx-auto mb-2" :src="instalar" alt="">
        <strong>Recuerda que esto puede variar entre sistemas y dispositivos. Es tu responsabilidad forzar la instalación y
            dar todos los permisos necesarios</strong>
        <img class="mx-auto mb-2" :src="darPermisos" alt="">
        <p>Una vez instalado, abre la app y dale todos los permisos necesarios. Si la app se cierra, vuelve a abrirla hasta
            que se vea una pantalla parecida a la siguiente en donde debe decir
            <strong>Plugin funcionando correctamente</strong>
        </p>
        <img class="mx-auto mb-2" :src="instalacionCorrecta" alt="">
        <p>Llegado a este punto, ya puedes pasar al siguiente paso</p>
    </div>
</template>