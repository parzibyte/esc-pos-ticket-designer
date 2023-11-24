<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';
import type { DiseñoRecuperadoDeBaseDeDatos, Payload } from '@/types/Tipos';


type Propiedades = {
	json: Payload,
	diseño: DiseñoRecuperadoDeBaseDeDatos,
	payloadEscapado: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: () => {
		return {
			nombreImpresora: "",
			serial: "",
			operaciones: [],
		};
	},
	diseño: () => {
		return {
			ruta_api: "",
			id: 0,
			licencia: "",
			plataforma: "",
			impresora: "",
			id_plataforma: 0,
			nombre: "",
			fecha_modificacion: 0,
		};
	},
})
const bloques = computed(() => {
	return {
		"imports": `import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)`,
		"funcion": `func imprimir() error {
	clienteHttp := &http.Client{}
	url := "${propiedades.diseño.ruta_api}/imprimir"
	peticion, err := http.NewRequest("POST", url, strings.NewReader("${propiedades.payloadEscapado}"))
	if err != nil {
		return err
	}
	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		return err
	}
	defer respuesta.Body.Close()
	cuerpoRespuesta, err := ioutil.ReadAll(respuesta.Body)
	if err != nil {
		return err
	}
	respuestaString := string(cuerpoRespuesta)
	if respuestaString == "true\\n" {
		return nil
	} else {
		return errors.New(respuestaString)
	}
}`,
		"invocacion": `func main() {
	err := imprimir()
	if err != nil {
		fmt.Printf("Error: %v", err)
	} else {
		fmt.Printf("Impreso correctamente")
	}
}`,
	}
});

</script>
<template>
	<p>Importa los siguientes paquetes:</p>
	<BloqueDeCodigo :codigo="bloques.imports"></BloqueDeCodigo>
	<p>Define la función <code>imprimir</code>. Fíjate que devolverá una variable de tipo <code>error</code>, estará en
		<code>nil</code> si la impresión fue correcta:
	</p>
	<BloqueDeCodigo :codigo="bloques.funcion"></BloqueDeCodigo>
	<p>Ahora puedes invocarla desde cualquier lugar para imprimir el ticket. Por ejemplo, en el main:</p>
	<BloqueDeCodigo :codigo="bloques.invocacion"></BloqueDeCodigo>
</template>