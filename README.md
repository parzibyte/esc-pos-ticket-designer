# ticket-designer
 Diseñador de tickets para mi plugin de impresión

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