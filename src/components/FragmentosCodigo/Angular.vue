<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';

type Propiedades = {
	json: string,
	diseño: object,
	payloadEscapado: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: "",
	diseño: () => {
		return {};
	},
})
const bloques = computed(() => {
	return {
		"boton": `<button (click)="imprimir()">Imprimir</button>`,
		"funcion": `imprimir = () => {
    const payload = "${propiedades.payloadEscapado}";
    fetch("${propiedades.diseño.ruta_api}/imprimir", {
      method: "POST",
      body: payload
    })
      .then(respuesta => respuesta.json())
      .then(respuesta => {
        if (respuesta === true) {
          // Éxito
          console.log("Impreso correctamente");
        } else {
          // Error (el mensaje de error está en "respuesta")
          console.log("Error con el plugin: " + respuesta);
        }
      })
      .catch(e => {
        console.log("Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " + e);
      });
  }`,
		"completo": `export class AppComponent {
  title = 'imprimirAngular';
  // Esta es la función que debes agregar:
  imprimir = () => {
    const payload = "${propiedades.payloadEscapado}";
    fetch("${propiedades.diseño.ruta_api}/imprimir", {
      method: "POST",
      body: payload
    })
      .then(respuesta => respuesta.json())
      .then(respuesta => {
        if (respuesta === true) {
          // Éxito
          console.log("Impreso correctamente");
        } else {
          // Error (el mensaje de error está en "respuesta")
          console.log("Error con el plugin: " + respuesta);
        }
      })
      .catch(e => {
        console.log("Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " + e);
      });
  }
}

`,
	}
});

</script>
<template>
	<p> Agrega un botón en tu HTML:</p>
	<BloqueDeCodigo :codigo="bloques.boton"></BloqueDeCodigo>
	<p>Después, define la función <code>imprimir</code> en tu archivo Typescript correspondiente al componente HTML donde
		agregaste el botón. Agrega la función dentro de la clase del componente, por ejemplo:</p>
	<BloqueDeCodigo :codigo="bloques.funcion"></BloqueDeCodigo>
	<p>Al final, tu componente debería verse así:</p>
	<BloqueDeCodigo :codigo="bloques.completo"></BloqueDeCodigo>
</template>