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
	type ArgumentosParaDefinirAlineacion,
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
			descripcion: `Avanza el papel y hace un corte`,
			plataformas: {
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCorte;
					return [{
						nombre: "Corte",
						argumentos: [argumentos.lineas],
					}];
				},
				"Android": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCorte;
					return [{
						nombre: "Corte",
						argumentos: [argumentos.lineas],
					}];
				},
			},
		},
		"DefinirCaracterPersonalizado": {
			nombre: "Crear carácter",
			descripcion: `Define una letra que no existe y reemplaza a una existente`,
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
				"Android": () => {
					return [];
				}
			},

		},
		"Texto": {
			nombre: "Texto",
			descripcion: `Dar formato e imprimir texto`,
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
				"Android": (thisArg: Operacion) => {
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
							nombre: "EstablecerModoDeImpresionAlReves",
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Imprimir tabla en forma de texto`,
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Imprime un código en varios formatos`,
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
				"Android": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirCodigoDeBarras;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
					];
					const mapa: Record<string, string> = {
						"Codabar": "codabar",
						"Code 128": "code128",
						"Code 39": "code39",
						"Code93": "code93",
						"Ean": "ean",
						"Ean 8": "ean8",
						"PDF 417": "pdf417",
						"Two off five ITF": "itf",
						"UPC A": "upca",
						"UPC E": "upce",
					};
					argumentosParaDevolver.push({
						nombre: "ImprimirCodigoDeBarras",
						argumentos: [mapa[argumentos.tipo.nombre], argumentos.contenido, argumentos.tamaño.valor, argumentos.ancho, argumentos.alto],
					});
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
			nombre: "QR",
			descripcion: `Imprime un QR`,
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
							nombre: "ImprimirCodigoDeBarras",
							argumentos: ["qr", argumentos.contenido, argumentos.tamaño.valor, argumentos.ancho, argumentos.ancho],
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
			descripcion: `Imagen que existe en el sistema, por ejemplo /home/parzibyte/mj.png`,
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Deshabilita la impresión de caracteres creados por el usuario`,
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
				"Android": (thisArg: Operacion) => {
					return [];
				},
			},
		},
		"DeshabilitarElModoDeCaracteresChinos": {
			nombre: "Deshabilitar caracteres chinos",
			descripcion: `Deshabilita los caracteres chinos. Útil si tu impresora es china y quieres imprimir acentos`,
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
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
			nombre: "Cambiar alineación",
			descripcion: `Cambiar alineación del texto, imágenes y códigos de barras`,
			plataformas:
			{
				"Desktop": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirAlineacion;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerAlineacion",
							argumentos: [argumentos.alineacion.valor],
						},
					];
					return argumentosParaDevolver;
				},
				"Android": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirAlineacion;
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
			nombre: "Alternar enfatizado",
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
					const argumentos = thisArg.argumentos as ArgumentosParaDefinirImpresionAlReves;
					const argumentosParaDevolver = <any>[
						{
							nombre: "EstablecerModoDeImpresionAlReves",
							argumentos: [argumentos.alReves],
						},
					];
					return argumentosParaDevolver;
				},
			},
		},
		"EstablecerImpresionBlancoYNegroInversa": {
			nombre: "Alternar impresión B&N",
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
			nombre: "Rotar texto 90°",
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
				"Android": (thisArg: Operacion) => {
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
			nombre: "Subrayado",
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
				"Android": (thisArg: Operacion) => {
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
			nombre: "Cambiar tamaño de fuente",
			descripcion: `Cambiar ancho y alto del texto`,
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Avanzar el papel`,
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
				"Android": (thisArg: Operacion) => {
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
				"Android": (thisArg: Operacion) => {
					const argumentosParaDevolver = <any>[
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
				"Android": (thisArg: Operacion) => {
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
			nombre: "Imagen base64",
			descripcion: `Imprime una imagen a partir de su representación como cadena en base64`,
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Limpia el formato y búfer. Útil para reiniciar los estilos. Se recomienda colocarla siempre al inicio de un diseño`,
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
				"Android": (thisArg: Operacion) => {
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
			descripcion: `Envía un pulso eléctrico que normalmente es para abrir el cajón. Los valores más comunes son pin 48, tiempo encendido 60, tiempo apagado 120`,
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
				"Android": (thisArg: Operacion) => {
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
			nombre: "Texto acentuado",
			descripcion: `Permite imprimir texto con acentos. Recomiendo deshabilitar los caracteres chinos y probar todas las combinaciones`,
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
				"Android": (thisArg: Operacion) => {
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
		return OperacionFactory.crearAPartirDeClaveYArgumentos(id, clave, argumentosDeserializados, orden);
	}
	static crearAPartirDeClaveYArgumentos(id: number, clave: string, argumentos: Record<string, any>, orden: number = 0): Operacion {
		const valoresQueMeFaltan = OperacionFactory.mapa[clave];
		return new Operacion(id, argumentos, clave, valoresQueMeFaltan.nombre, valoresQueMeFaltan.descripcion, valoresQueMeFaltan.plataformas, orden);
	}
}