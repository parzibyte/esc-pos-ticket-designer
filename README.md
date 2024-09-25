# ESC/POS ticket designer

Diseñador de tickets para mi plugin de impresión. Disponible en: https://parzibyte.me/apps/ticket-designer/#/first-steps

# Versión de Node y NPM para el Parzibyte del futuro
Si estás leyendo esto en el futuro, debes recordar que la versión con la que todo funciona correctamente (al momento de escribir esto) es:
Node v20.11.0
NPM 10.2.4

Siempre puedes cambiar versiones con nvm o lo que exista en el futuro

# Agregando una nueva operación
1. Crea el componente en **src/components/Operaciones**. Por ejemplo, `CorteParcial.vue`
2. Agrega el tipo en **Tipos.ts** para tu componente. Por ejemplo, `ArgumentosParaDefinirCorteParcial`
3. Agrega el código del componente indicando que quieres recibir el tipo definido previamente como propiedad para el v-model, por ejemplo:
```typescript
import type { ArgumentosParaDefinirCorteParcial } from '@/types/Tipos';
import { computed, } from 'vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirCorteParcial;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
```
4. En el template de ese mismo componente de Vue, agrega los campos para que el componente funciona, y toma los valores de `propiedades` o `valorSerializado`
5. En `listaCompletaDeOperaciones` dentro de `Operacion.ts` agrega la operación que acabas de agregar siguiendo el tipo definido, y rellena los valores por defecto. Fíjate en el segundo argumento de `crearAPartirDeClaveYArgumentos`, pues esa es la clave como cadena, y debes usarla para el siguiente paso
```typescript
OperacionFactory.crearAPartirDeClaveYArgumentos(0, "CorteParcial", <ArgumentosParaDefinirCorteParcial>{
}),
```
6. En **OperacionFactory.ts** agrega la operación al mapa dentro de la clase `OperacionFactory`. Ahí programa la lógica por plataforma. Recuerda que tienes los argumentos del componente en `argumentos` y debes devolver los argumentos como arreglo (`argumentosParaDevolver`) siguiendo la API del plugin. Por ejemplo: https://gist.github.com/parzibyte/2f36655ef9d6ea8e6de73c6e09bbc735#file-documentacion-txt

Recuerda que `CorteParcial` en este caso es la clave; debes usar la misma clave para el mapa, para guardar la operación en la base de datos, el mapa en `Operacion.vue` y al invocar a `crearAPartirDeClaveYArgumentos`
```typescript
"CorteParcial": {
	nombre: "Corte parcial",
	descripcion: `Realizar un corte parcial`,
	plataformas:
	{
		"Desktop": (thisArg: Operacion) => {
			const argumentos = thisArg.argumentos as ArgumentosParaDefinirCorteParcial;
			const argumentosParaDevolver = <any>[
				{
					nombre: "CorteParcial",
					argumentos: [],
				}
			];
			return argumentosParaDevolver;
		},
	},

},
```
7. Ve a `Operacion.vue` e importa tu componente, por ejemplo: 
```typescript
import CorteParcial from "./Operaciones/CorteParcial.vue";
```

8. En `Operacion.vue` agrega el componente al mapa, con su clave (fíjate en la penúltima línea): 
```typescript
const componentes: { [key: string]: Component } = {
    "Corte": Corte,
    "DefinirCaracterPersonalizado": DefinirCaracterPersonalizado,
    "Texto": Texto,
    "Imagen": Imagen,
    "Tabla": Tabla,
    "CodigoDeBarras": CodigoDeBarras,
    "CodigoQr": CodigoQr,
    "ImagenLocal": ImagenLocal,
    "CorteParcial": CorteParcial,
};
```

## Argumentos
Me parece que todos los argumentos deben ser un objeto en el modelValue del componente. Por ejemplo, lo siguiente es correcto:

```typescript
type Propiedades = {
	modelValue: {
		alineacion: AlineacionConNombreYValor,
	},
};
```

Ahí, `alineacion` está dentro de un objeto. Lo siguiente es incorrecto y muestra un error de que es de solo lectura:
```typescript
type Propiedades = {
	modelValue: AlineacionConNombreYValor
};
```

O sea que `modelValue` siempre debe ser un objeto, y dentro de ese objeto podemos tener cualquier propiedad, pero no podemos deefinir `modelValue` de otro modo. Aunque no muestre errores, a veces simplemente no desencadena el evento change o cosas similares

# Bloques de código
Para el caso del generador de código, el código se pasa en un objeto devuelto por un `computed`. Lo hice de esta manera para no tener variables como `codigo1`, `codigo2`, etcétera.

Usé los siguientes enfoques con los siguientes resultados:
1. Slots: funcionaba bien, pero tenía que escapar el HTML manualmente (por ejemplo, en C# se usa el símbolo `<` y `>`). No se podía copiar el código porque no pude acceder a los slots (sí, usé `useSlots`), además, me parece que los slots tienen nodos, no el HTML generado

2. Pasar el código en una propiedad (como se hace actualmente) pero definir el código ahí mismo en el atributo: funcionaba bien excepto cuando el código tenía comillas dobles (`"`), además de que el código se veía un poco sucio

Así que al final se quedó con un objeto devuelto por un computed. En el script podemos definir código en variables usando los backticks y luego pasarlo en el template

# Build

Suponiendo que ya cuentas con workbox (npm install workbox-cli --global) y npm, ejecuta:
1. `npm run build`
2. `workbox generateSW workbox-config.js`
3. Distribuye lo de la carpeta `dist`


# Clonando
1. Clona el repositorio
2. `npm install`

# Problema al ejecutar npm install
```
npm ERR! code ERR_SSL_CIPHER_OPERATION_FAILED
npm ERR! 1C2A0000:error:1C800066:Provider routines:ossl_gcm_stream_update:cipher operation failed:c:\ws\deps\openssl\openssl\providers\implementations\ciphers\ciphercommon_gcm.c:320:    
npm ERR!

npm ERR! A complete log of this run can be found in: C:\Users\parzibyte\AppData\Local\npm-cache\_logs\2023-12-17T19_52_40_539Z-debug-0.log
```
Prueba con `npm install --legacy-peer-deps`

Intenté con cache verify, luego con la opción de legacy-peer-deps, luego borré el node_modules, hice un npm install y todo funcionó correctamente. No tengo idea de lo que pasó; leí por ahí que puede ser el internet


# Modificando una operación

Pondré un ejemplo para la operación de Imagen a
la cual se le aplicó la propiedad aplicarDithering

## Resumen

Modifica **Tipos.ts** y **Operacion.ts** para agregar la nueva propiedad,
luego dirígete a **OperacionFactory.ts** para modificar cómo se envía la
nueva propiedad al plugin. 

Finalmente modifica las propiedades del modelValue en el
componente de la operación y agrega un elemento (input, textarea,
checkbox, select, etcétera) que va a modificar esa propiedad

## Guía completa

Primero ve a **Tipos.ts** y modifica
el tipo de la operación. En este caso
es `ArgumentosParaDefinirImagenLocal`, quedó así:

```typescript
export type ArgumentosParaDefinirImagenDeInternet = {
    alineacion: AlineacionConNombreYValor,
    algoritmoImagen: AlgoritmoDeImpresionDeImagenConNombre,
    maximoAncho: number,
    url: string,
    aplicarDithering: boolean, // <-- Aquí la nueva propiedad
}
```

Luego ve a **OperacionFactory.ts** y modifica
el arreglo de argumentos que se va a enviar
según la plataforma y la operación


```typescript
"Imagen": {
			nombre: "Imagen",
			descripcion: `Imprimir una imagen del dispositivo`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagen;
					if (!argumentos.alineacion) {
						return [];
					}
					const argumentosParaDevolver = [
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "ImprimirImagenEnBase64",
							argumentos: [argumentos.contenidoEnBase64, argumentos.maximoAncho, argumentos.algoritmo.valor, argumentos.aplicarDithering],
							//                                                                           Esta es la nueva operación --------^
						}
					];
					return argumentosParaDevolver;
				},
```

Ahora ve a **Operacion.ts** y agrega
la propiedad al igual que lo hiciste en 
**OperacionFactory.ts**:

```typescript
OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Imagen", <ArgumentosParaDefinirImagen>{
		algoritmo: ALGORITMO_IMPRESION_POR_DEFECTO,
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		alto: 0,
		ancho: 8,
		maximoAncho: 8,
		contenidoEnBase64: "",
		aplicarDithering: true, // <-- Esta es la nueva propiedad
	}),
```

Luego, en el componente de la operación
que es con el que interactúa el usuario,
agrega la operación en las propiedades:

```typescript
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            alineacion: { nombre: "Centro", valor: Alineacion.Centro },
            algoritmo: ALGORITMO_IMPRESION_POR_DEFECTO,
            alto: 0,
            ancho: 0,
            maximoAncho: 8,
            maximoAlto: 8,
            contenidoEnBase64: "",
            aplicarDithering: true, // Aquí la nueva propiedad
        };
    }
})
```

Y agrega un elemento que va a 
modificar esa propiedad. Como
en este caso es un booleano, utilicé
un checkbox:

```vue
<CustomCheckbox :label="$t('operationComponents.Imagen.aplicarDithering')"
            v-model="propiedades.modelValue.aplicarDithering"></CustomCheckbox>
```