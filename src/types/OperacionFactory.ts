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
	};

	static crearAPartirDeClaveYArgumentosSerializados(id: number, clave: string, argumentos: string): Operacion {
		const argumentosDeserializados = JSON.parse(argumentos);
		console.log(argumentosDeserializados);

		return OperacionFactory.crearAPartirDeClaveYArgumentos(id, clave, argumentosDeserializados);
	}
	static crearAPartirDeClaveYArgumentos(id: number, clave: string, argumentos: Record<string, any>): Operacion {
		const valoresQueMeFaltan = OperacionFactory.mapa[clave];
		return new Operacion(id, argumentos, clave, valoresQueMeFaltan.nombre, valoresQueMeFaltan.descripcion, valoresQueMeFaltan.plataformas);
	}
}