import { OperacionFactory } from "./OperacionFactory.js";
import { Alineacion, TamañoImagen, type Plataforma } from "./Tipos"
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
} from "./Tipos"
import { TipoDeCodigoDeBarras, RecuperacionQr } from "./Tipos";
export class Operacion {
	public argumentos: Record<string, any>;
	public clave: string;
	public nombre: string;
	public descripcion: string;
	public plataformas: Plataforma;
	public id: number;
	constructor(id: number, argumentos: Record<string, any>, clave: string, nombre?: string, descripcion?: string, plataformas?: Plataforma) {
		this.id = id;
		this.argumentos = argumentos;
		this.clave = clave;
		this.nombre = nombre || "";
		this.descripcion = descripcion || "";
		this.plataformas = plataformas || {};
	}
	obtenerArgumentosPorPlataforma(plataforma: string) {
		return this.plataformas[plataforma](this);
	}
	obtenerArgumentosRealesSerializados() {
		return JSON.stringify(this.argumentos);
	}
	clonar(): Operacion {
		return new Operacion(this.id, Object.assign({}, this.argumentos), this.clave, this.nombre, this.descripcion, this.plataformas);
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
]