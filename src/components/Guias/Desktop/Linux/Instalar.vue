<script setup lang="ts">
import BloqueDeCodigo from "@/components/FragmentosCodigo/BloqueDeCodigo.vue";
import listar from "@/assets/Linux/Listar.png";
import gid from "@/assets/Linux/Gid.png";
const codigoImprimir = `echo "Imprimiendo en una impresora termica en Linux desde el blog de parzibyte (parzibyte.me/blog)" >> /dev/usb/lp1`;
</script>
<template>
    <div>
        <p>
            Todos los comandos serán ejecutados en la terminal.
            Recuerda que algunos comandos necesitan permisos de superusuario.
        </p>
        <ol class="list-inside list-decimal">
            <li> Ejecuta: <BloqueDeCodigo codigo="ls /dev/usb"></BloqueDeCodigo>
                Tu impresora debería aparecer como lpX donde X es un número. Si hay varias, puede que tengas que probar con
                lp1, lp2, etcétera. En mi caso es
                la <code>lp1</code>
                <img :src="listar" class="my-2">
            </li>
            <li>Ejecuta
                <BloqueDeCodigo codigo="stat /dev/usb/lp1 "></BloqueDeCodigo>

                Fíjate en el grupo que aparece cerca de
                <strong>
                    Gid( Número / Grupo)
                </strong>
                , en la imagen el grupo es
                <code>lp</code>
                <img :src="gid" alt="">
            </li>
            <li>Agrega tu usuario actual al grupo listado previamente. En mi caso, como el grupo es <code>lp</code> y mi
                usuario es
                <code>parzibyte</code>, el comando es:
                <BloqueDeCodigo codigo="sudo usermod -a -G lp parzibyte"></BloqueDeCodigo>
                Recuerda que en tu caso el grupo y el usuario pueden cambiar.
            </li>
            <li>Reinicia la computadora con el método que tú prefieras</li>
            <li>
                Ejecuta el siguiente mensaje para imprimir una prueba. Estoy suponiendo que la impresora es la
                <code>lp1</code>, si en tu caso
                la impresora es otra, cambia el nombre como sea necesario
                <BloqueDeCodigo :codigo="codigoImprimir"></BloqueDeCodigo>
            </li>
            <li>Si la impresión se ejecuta correctamente, puedes pasar al siguiente paso. Recuerda que en ocasiones no se
                hace un avance de papel, por lo que debes avanzar el papel de la impresora y revisar si la impresión fue
                exitosa</li>

        </ol>
    </div>
</template>