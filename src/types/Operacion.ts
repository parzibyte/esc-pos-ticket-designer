import { OperacionFactory } from "./OperacionFactory.js";
import { Alineacion, TamañoImagen, type Plataforma, Fuente } from "./Tipos"
import type {
	ArgumentosParaDefinirCorte,
	ArgumentosParaDefinirCaracterPersonalizado,
	ArgumentosParaDefinirTexto,
	ArgumentosParaDefinirImagen,
	ArgumentosParaDefinirTabla,
	ArgumentosParaDefinirCodigoDeBarras,
	ArgumentosParaDefinirCodigoQr,
	ArgumentosParaDefinirImagenLocal,
	ArgumentosParaDefinirCorteParcial,
	ArgumentosParaDefinirImagenDeInternet,
	ArgumentosParaDefinirTextoSimple,
	AlineacionConNombreYValor,
	ArgumentosParaDefinirEnfatizado,
	ArgumentosParaDefinirFuente,
	FuenteConNombreYValor,
	ArgumentosParaDefinirImpresionAlReves,
	ArgumentosParaDefinirImpresionBlancoYNegroInversa,
	ArgumentosParaDefinirRotacionDe90Grados,
	ArgumentosParaDefinirSubrayado,
	ArgumentosParaDefinirTamañoFuente,
	ArgumentosParaDefinirFeed,
	ArgumentosParaDefinirImagenEnBase64,
	ArgumentosParaDefinirPulso,
	ArgumentosParaDefinirTextoSegunPaginaDeCodigos,
} from "./Tipos"
import { TipoDeCodigoDeBarras, RecuperacionQr } from "./Tipos";
export class Operacion {
	public argumentos: Record<string, any>;
	public clave: string;
	public nombre: string;
	public descripcion: string;
	public plataformas: Plataforma;
	public id: number;
	public orden: number;
	constructor(id: number, argumentos: Record<string, any>, clave: string, nombre?: string, descripcion?: string, plataformas?: Plataforma, orden: number = 0) {
		this.id = id;
		this.argumentos = argumentos;
		this.clave = clave;
		this.nombre = nombre || "";
		this.descripcion = descripcion || "";
		this.plataformas = plataformas || {};
		this.orden = orden;
	}
	obtenerArgumentosPorPlataforma(plataforma: string) {
		return this.plataformas[plataforma](this);
	}
	obtenerArgumentosRealesSerializados() {
		return JSON.stringify(this.argumentos);
	}
	clonar(): Operacion {
		return new Operacion(this.id, Object.assign({}, this.argumentos), this.clave, this.nombre, this.descripcion, this.plataformas, this.orden);
	}
}
export const listaCompletaDeOperaciones = [
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Corte", <ArgumentosParaDefinirCorte>{ lineas: 1 }),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "DefinirCaracterPersonalizado", <ArgumentosParaDefinirCaracterPersonalizado>{
		caracterQueReemplaza: "",
		matrizDeBits: [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]],
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Texto", <ArgumentosParaDefinirTexto>{
		texto: "",
		ancho: 1,
		alto: 1,
		enfatizado: false,
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		subrayado: false,
		alReves: false,
		inverso: false,
		rotacion90: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Imagen", <ArgumentosParaDefinirImagen>{
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		alto: 0,
		ancho: 8,
		maximoAncho: 8,
		contenidoEnBase64: "",
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Tabla", <ArgumentosParaDefinirTabla>{
		tabla: [],
		ajustesEncabezados: [],
		caracterSeparadorColumnasDatos: "|",
		caracterSeparadorColumnasEnSeparadorDeFilas: "+",
		caracterSeparadorFilas: "-",
		relleno: " ",
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "CodigoDeBarras", <ArgumentosParaDefinirCodigoDeBarras>{
		tipo: {
			valor: TipoDeCodigoDeBarras.Ean,
			nombre: "EAN",
		},
		contenido: "",
		ancho: 200,
		alto: 80,
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		incluirSumaDeVerificacion: false,
		modoAsciiCompleto: false,
		intercalado: false,
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		nivelDeSeguridad: 1,
		imprimirContenido: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "CodigoQr", <ArgumentosParaDefinirCodigoQr>{
		contenido: "",
		ancho: 200,
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		nivelDeRecuperacion: { nombre: "Medio", valor: RecuperacionQr.Medio },
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		imprimirContenido: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "ImagenLocal", <ArgumentosParaDefinirImagenLocal>{
		ruta: "",
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		maximoAncho: 8,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "CorteParcial", <ArgumentosParaDefinirCorteParcial>{
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "DescargarImagenDeInternet", <ArgumentosParaDefinirImagenDeInternet>{
		url: "",
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		maximoAncho: 8,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "DeshabilitarCaracteresPersonalizados", {
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "DeshabilitarElModoDeCaracteresChinos", {
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "TextoSimple", <ArgumentosParaDefinirTextoSimple>{
		contenido: "",
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerAlineacion", <AlineacionConNombreYValor>{
		nombre: "Centro",
		valor: Alineacion.Centro,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerEnfatizado", <ArgumentosParaDefinirEnfatizado>{
		enfatizado: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerFuente", <ArgumentosParaDefinirFuente>{
		fuente: {
			nombre: "Fuente A (24x12)",
			valor: 0,
		}
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerImpresionAlReves", <ArgumentosParaDefinirImpresionAlReves>{
		alReves: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerImpresionBlancoYNegroInversa", <ArgumentosParaDefinirImpresionBlancoYNegroInversa>{
		inversa: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerRotacionDe90Grados", <ArgumentosParaDefinirRotacionDe90Grados>{
		rotar: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerSubrayado", <ArgumentosParaDefinirSubrayado>{
		subrayar: false,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "EstablecerTamañoFuente", <ArgumentosParaDefinirTamañoFuente>{
		alto: 1,
		ancho: 1,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Feed", <ArgumentosParaDefinirFeed>{
		lineas: 1,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "HabilitarCaracteresPersonalizados", {
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "HabilitarElModoDeCaracteresChinos", {
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "ImprimirImagenEnBase64", <ArgumentosParaDefinirImagenEnBase64>{
		alineacion: {
			nombre: "Centro",
			valor: Alineacion.Centro,
		},
		tamaño: {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		},
		contenidoEnBase64: "",
		maximoAncho: 200,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Iniciar", {
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "Pulso", <ArgumentosParaDefinirPulso>{
		pin: 48,
		tiempoEncendido: 60,
		tiempoApagado: 120,
	}),
	OperacionFactory.crearAPartirDeClaveYArgumentos(0, "TextoSegunPaginaDeCodigos", <ArgumentosParaDefinirTextoSegunPaginaDeCodigos>{
		texto: "",
		pagina: "cp850",
		numeroPagina: 2,
	}),
]