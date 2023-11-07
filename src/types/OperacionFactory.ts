import {
	type Plataforma,
	type ArgumentosParaDefinirCorte,
	type ArgumentosParaDefinirCaracterPersonalizado,
	type ArgumentosParaDefinirTexto,
	type ArgumentosParaDefinirImagen,
	type ArgumentosParaDefinirTabla,
	type ArgumentosParaDefinirCodigoDeBarras,
	type ArgumentosParaDefinirCodigoQr,
	type ArgumentosParaDefinirImagenLocal,
	type ArgumentosParaDefinirCorteParcial,
	TipoDeCodigoDeBarras,
	type ArgumentosParaDefinirImagenDeInternet,
	type ArgumentosParaDefinirTextoSimple,
	type AlineacionConNombreYValor,
	type ArgumentosParaDefinirEnfatizado,
	type ArgumentosParaDefinirFuente,
	type ArgumentosParaDefinirImpresionAlReves,
	type ArgumentosParaDefinirImpresionBlancoYNegroInversa,
	type ArgumentosParaDefinirRotacionDe90Grados,
	type ArgumentosParaDefinirSubrayado,
	type ArgumentosParaDefinirTamañoFuente,
	type ArgumentosParaDefinirFeed,
	type ArgumentosParaDefinirImagenEnBase64,
	type ArgumentosParaDefinirPulso,
	type ArgumentosParaDefinirTextoSegunPaginaDeCodigos,
} from "./Tipos"
import { Operacion } from "./Operacion"
import { obtenerSeparador, tabularDatos, cantidadColumnas } from "@/Helpers";

export class OperacionFactory {
	static mapa: { [key: string]: { nombre: string, descripcion: string, plataformas: Plataforma } } = {
		"": {
			nombre: "",
			descripcion: "",
			plataformas: {},
		},
		"Corte": {
			nombre: "Corte",
			descripcion: `Avanza el papel especificado por el número de líneas y después lo corta`,
			plataformas: {
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCorte;
					return [{
						nombre: "Corte",
						argumentos: [argumentos.lineas],
					}];
				},
			},
		},
		"DefinirCaracterPersonalizado": {
			nombre: "DefinirCaracterPersonalizado",
			descripcion: `Define un char`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCaracterPersonalizado;
					const matrizComoCadena = argumentos.matrizDeBits.map(fila => fila.join("")).join("\n");
					return [
						{
							nombre: "HabilitarCaracteresPersonalizados",
							argumentos: [],
						},
						{
							nombre: "DefinirCaracterPersonalizado",
							argumentos: [argumentos.caracterQueReemplaza, matrizComoCadena],
						},

					];
				},
			},

		},
		"Texto": {
			nombre: "Texto",
			descripcion: `Imprimir cualquier texto`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirTexto;
					const argumentosParaDevolver = [
						{
							nombre: "EstablecerTamañoFuente",
							argumentos: [argumentos.ancho, argumentos.alto],
						},
						{
							nombre: "EstablecerEnfatizado",
							argumentos: [argumentos.enfatizado],
						},
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "EstablecerSubrayado",
							argumentos: [argumentos.subrayado],
						},
						{
							nombre: "EstablecerImpresionAlReves",
							argumentos: [argumentos.alReves],
						},
						{
							nombre: "EstablecerImpresionBlancoYNegroInversa",
							argumentos: [argumentos.inverso],
						},
						{
							nombre: "EstablecerRotacionDe90Grados",
							argumentos: [argumentos.rotacion90],
						},
						{
							nombre: "EscribirTexto",
							argumentos: [argumentos.texto],
						},
						{
							nombre: "Feed",
							argumentos: [1],
						},
					];
					return argumentosParaDevolver;
				},
			},

		},
		"Imagen": {
			nombre: "Imagen",
			descripcion: `Imprimir una imagen del dispositivo`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagen;
					const argumentosParaDevolver = [
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "ImprimirImagenEnBase64",
							argumentos: [argumentos.contenidoEnBase64, argumentos.tamaño.valor, argumentos.maximoAncho],
						}
					];
					return argumentosParaDevolver;
				},
			},

		},

		"Tabla": {
			nombre: "Texto como tabla",
			descripcion: `Imprimir texto tabulado`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirTabla;
					let contenido = "";
					let { caracterSeparadorColumnasDatos, caracterSeparadorColumnasEnSeparadorDeFilas, caracterSeparadorFilas, relleno } = argumentos;
					contenido += obtenerSeparador(caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas, cantidadColumnas(argumentos), argumentos.ajustesEncabezados)
					for (const fila of argumentos.tabla) {
						contenido += tabularDatos(fila.map((cadena, indiceColumna) => {
							return {
								contenido: cadena,
								maximaLongitud: argumentos.ajustesEncabezados[indiceColumna].longitudMaxima,
							};
						}),
							relleno, caracterSeparadorColumnasDatos).join("\n");
						contenido += "\n";
						contenido += obtenerSeparador(caracterSeparadorFilas, caracterSeparadorColumnasEnSeparadorDeFilas, cantidadColumnas(argumentos), argumentos.ajustesEncabezados)
					}
					const argumentosParaDevolver = [
						{
							nombre: "EscribirTexto",
							argumentos: [contenido],
						},
					];
					return argumentosParaDevolver;
				},
			},

		},
		"CodigoDeBarras": {
			nombre: "Código de barras",
			descripcion: `Código de barras`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCodigoDeBarras;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
					];

					if (
						[
							TipoDeCodigoDeBarras.Codabar,
							TipoDeCodigoDeBarras.Code128,
							TipoDeCodigoDeBarras.Code93,
							TipoDeCodigoDeBarras.Ean,
							TipoDeCodigoDeBarras.Ean8,
							TipoDeCodigoDeBarras.UpcA,
							TipoDeCodigoDeBarras.UpcE,
						].includes(argumentos.tipo.valor)
					) {
						argumentosParaDevolver.push({
							nombre: argumentos.tipo.valor,
							argumentos: [argumentos.contenido, argumentos.alto, argumentos.ancho, argumentos.tamaño.valor],
						});
					} else {
						switch (argumentos.tipo.valor) {
							case TipoDeCodigoDeBarras.Code39:
								argumentosParaDevolver.push({
									nombre: argumentos.tipo.valor,
									argumentos: [argumentos.contenido, argumentos.incluirSumaDeVerificacion, argumentos.modoAsciiCompleto, argumentos.alto, argumentos.ancho, argumentos.tamaño.valor],
								});
								break;

							case TipoDeCodigoDeBarras.Pdf417:
								argumentosParaDevolver.push({
									nombre: argumentos.tipo.valor,
									argumentos: [argumentos.contenido, argumentos.nivelDeSeguridad, argumentos.alto, argumentos.ancho, argumentos.tamaño.valor],
								});
								break;

							case TipoDeCodigoDeBarras.TwoOffFiveITF:
								argumentosParaDevolver.push({
									nombre: argumentos.tipo.valor,
									argumentos: [argumentos.contenido, argumentos.intercalado, argumentos.alto, argumentos.ancho, argumentos.tamaño.valor],
								});
								break;
						}
					}
					if (argumentos.imprimirContenido) {
						argumentosParaDevolver.push({
							nombre: "EscribirTexto",
							argumentos: [argumentos.contenido + "\n"],
						});
					}
					return argumentosParaDevolver;
				},
			},

		},
		"CodigoQr": {
			nombre: "Código QR",
			descripcion: `Código QR`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCodigoQr;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "ImprimirCodigoQr",
							argumentos: [argumentos.contenido, argumentos.ancho, argumentos.nivelDeRecuperacion.valor, argumentos.tamaño.valor],
						}
					];
					if (argumentos.imprimirContenido) {
						argumentosParaDevolver.push({
							nombre: "EscribirTexto",
							argumentos: [argumentos.contenido + "\n"],
						});
					}
					return argumentosParaDevolver;
				},
			},

		},
		"ImagenLocal": {
			nombre: "Imagen local",
			descripcion: `Imagen que existe en el sistema, por ejemplo, C:\\Users\\Parzibyte\\desktop\\maggie.jpg o /home/parzibyte/mj.png`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagenLocal;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "CargarImagenLocalEImprimir",
							argumentos: [argumentos.ruta, argumentos.tamaño.valor, argumentos.maximoAncho],
						}
					];
					return argumentosParaDevolver;
				},
			},

		},
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
		"DescargarImagenDeInternet": {
			nombre: "Imprimir imagen de internet",
			descripcion: `Descargar e imprimir una imagen de internet. La imagen debe ser pública`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagenDeInternet;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "DescargarImagenDeInternetEImprimir",
							argumentos: [argumentos.url, argumentos.tamaño.valor, argumentos.maximoAncho],
						}
					];
					return argumentosParaDevolver;
				},
			},
		},
		"DeshabilitarCaracteresPersonalizados": {
			nombre: "Deshabilitar caracteres personalizados",
			descripcion: `Deshabilita la impresión de caracteres personalizados`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
						{
							nombre: "DeshabilitarCaracteresPersonalizados",
							argumentos: [],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"DeshabilitarElModoDeCaracteresChinos": {
			nombre: "Deshabilitar caracteres chinos",
			descripcion: `Deshabilita el modo de caracteres chinos. Si tu impresora es china y al imprimir acentos aparecen caracteres chinos puede que quieras deshabilitarlos`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
						{
							nombre: "DeshabilitarElModoDeCaracteresChinos",
							argumentos: [],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"TextoSimple": {
			nombre: "Texto sin formato",
			descripcion: `Texto simple cuyo formato puede definirse en otras operaciones`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirTextoSimple;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EscribirTexto",
							argumentos: [argumentos.contenido],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerAlineacion": {
			nombre: "Establecer alineación",
			descripcion: `Establece la alineación del texto e imágenes (incluyendo códigos de barras y QR)`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as { alineacion: AlineacionConNombreYValor };
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerEnfatizado": {
			nombre: "Establecer enfatizado",
			descripcion: `Cambiar el estado enfatizado del texto`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirEnfatizado;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerEnfatizado",
							argumentos: [argumentos.enfatizado],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerFuente": {
			nombre: "Establecer fuente",
			descripcion: `Cambiar entre la fuente A (24x12) y B (17x9). Tener cuidado porque los caracteres personalizados solo funcionan con la fuente A`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirFuente;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerFuente",
							argumentos: [argumentos.fuente.valor],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerImpresionAlReves": {
			nombre: "Establecer impresión al revés",
			descripcion: `Alternar modo de impresión al revés`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImpresionAlReves;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerImpresionAlReves",
							argumentos: [argumentos.alReves],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerImpresionBlancoYNegroInversa": {
			nombre: "Establecer impresión B&N inversa",
			descripcion: `Alternar modo de impresión blanco y negro inversa`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImpresionBlancoYNegroInversa;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerImpresionBlancoYNegroInversa",
							argumentos: [argumentos.inversa],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerRotacionDe90Grados": {
			nombre: "Establecer rotación de 90°",
			descripcion: `Alternar rotación de texto de 90°`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirRotacionDe90Grados;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerRotacionDe90Grados",
							argumentos: [argumentos.rotar],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerSubrayado": {
			nombre: "Establecer subrayado",
			descripcion: `Alternar subrayado de texto`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirSubrayado;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerSubrayado",
							argumentos: [argumentos.subrayar],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerTamañoFuente": {
			nombre: "Establecer tamaño de fuente",
			descripcion: `Cambiar ancho y alto de fuente`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirTamañoFuente;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerTamañoFuente",
							argumentos: [argumentos.ancho, argumentos.alto],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"Feed": {
			nombre: "Feed",
			descripcion: `Avanzar el papel determinado número de líneas`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirFeed;
					const argumentosParaDevolver = <any>[
						{
							nombre: "Feed",
							argumentos: [argumentos.lineas],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"HabilitarCaracteresPersonalizados": {
			nombre: "Habilitar caracteres personalizados",
			descripcion: `Habilita la impresión y reemplazo de caracteres definidos por el usuario`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
						{
							nombre: "HabilitarCaracteresPersonalizados",
							argumentos: [],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"HabilitarElModoDeCaracteresChinos": {
			nombre: "Habilitar los caracteres chinos",
			descripcion: `Habilita la impresión de caracteres chinos`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
						{
							nombre: "HabilitarElModoDeCaracteresChinos",
							argumentos: [],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"ImprimirImagenEnBase64": {
			nombre: "Imprimir una imagen en base64",
			descripcion: `Convierte el texto en base64 a una imagen, la convierte a blanco y negro y la redimensiona para que el ancho no sea mayor al ancho especificado. La imagen puede ser JPG o PNG y tener o no tener el "base64,"`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImagenEnBase64;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
						{
							nombre: "ImprimirImagenEnBase64",
							argumentos: [argumentos.contenidoEnBase64, argumentos.tamaño.valor, argumentos.maximoAncho],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"Iniciar": {
			nombre: "Iniciar impresora",
			descripcion: `Limpia los datos en el búfer y reinicia la impresora al modo que estaba en efecto cuando fue encendida. Útil para borrar el formato`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
						{
							nombre: "Iniciar",
							argumentos: [],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"Pulso": {
			nombre: "Enviar pulso",
			descripcion: `Envía un pulso eléctrico. Normalmente es para abrir el cajón. Los valores más comunes son pin 48, tiempo encendido 60, tiempo apagado 120`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirPulso;
					const argumentosParaDevolver = <any>[
						{
							nombre: "Pulso",
							argumentos: [argumentos.pin, argumentos.tiempoEncendido, argumentos.tiempoApagado],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"TextoSegunPaginaDeCodigos": {
			nombre: "Convertir codificación texto según página de códigos de caracteres",
			descripcion: `Permite, en palabras simples, escribir texto con acentos. Hay que especificar el número de página (según la impresora) y el character code page para iconv. Se recomienda deshabilitar el modo de caracteres chinos en impresoras chinas. Funciona solo si el plugin viene con iconv`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirTextoSegunPaginaDeCodigos;
					const argumentosParaDevolver = <any>[
						{
							nombre: "TextoSegunPaginaDeCodigos",
							argumentos: [argumentos.numeroPagina, argumentos.pagina, argumentos.texto],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
	};

	static crearAPartirDeClaveYArgumentosSerializados(id: number, clave: string, argumentos: string, orden: number = 0): Operacion {
		const argumentosDeserializados = JSON.parse(argumentos);
		console.log(argumentosDeserializados);

		return OperacionFactory.crearAPartirDeClaveYArgumentos(id, clave, argumentosDeserializados, orden);
	}
	static crearAPartirDeClaveYArgumentos(id: number, clave: string, argumentos: Record<string, any>, orden: number = 0): Operacion {
		const valoresQueMeFaltan = OperacionFactory.mapa[clave];
		return new Operacion(id, argumentos, clave, valoresQueMeFaltan.nombre, valoresQueMeFaltan.descripcion, valoresQueMeFaltan.plataformas, orden);
	}
}