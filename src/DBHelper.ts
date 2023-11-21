import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import * as Comlink from "comlink"
const NOMBRE_BASE_DE_DATOS = "escpos.sqlite3";
const log = (...args) => { console.log(...args) };
const error = (...args) => { console.log(...args) };
class EnvolturaDeBaseDeDatos {
    db = null;
    constructor() {
    }
    async iniciar() {
        console.log("Iniciando worker...");
        const sqlite3 = await sqlite3InitModule({
            print: log,
            printErr: error,
        });
        if ('opfs' in sqlite3) {
            this.db = new sqlite3.oo1.OpfsDb({
                filename: NOMBRE_BASE_DE_DATOS,
                flags: "ct",
                vfs: false,
            });
            log('OPFS is available, created persisted database at', this.db.filename);
        } else {
            this.db = new sqlite3.oo1.DB(NOMBRE_BASE_DE_DATOS, 'ct');
            log('OPFS is not available, created transient database', this.db.filename);
        }
        this.crearTablas();
        await this.insertarDatosIniciales();
        this.exponerFuncionesDeDB();
    }
    crearTablas() {
        this.db.exec(`CREATE TABLE IF NOT EXISTS plataformas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    ruta_api TEXT NOT NULL,
    licencia TEXT NOT NULL DEFAULT ""
    );`);
        this.db.exec(`CREATE TABLE IF NOT EXISTS diseños(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_plataforma INTEGER,
    nombre TEXT NOT NULL,
    fecha_modificacion INTEGER NOT NULL,
    impresora TEXT NOT NULL,
    FOREIGN KEY (id_plataforma) REFERENCES plataformas(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`);

        this.db.exec(`CREATE TABLE IF NOT EXISTS operaciones_diseños(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_diseño INTEGER,
    clave TEXT NOT NULL,
    argumentos TEXT NOT NULL,
    orden INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (id_diseño) REFERENCES diseños(id) ON DELETE CASCADE ON UPDATE CASCADE);`);
        this.db.exec(`CREATE TABLE IF NOT EXISTS ajustes_diseños(
    id_diseño INTEGER UNIQUE,
    indice_lenguaje_programacion  INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (id_diseño) REFERENCES diseños(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`);
        this.db.exec(`CREATE TABLE IF NOT EXISTS ajustes(
    modo_programador INTEGER NOT NULL DEFAULT 0
    );`);
    }

    async insertarDatosIniciales() {
        const plataformasExistentes = await this.db.exec({
            sql: "SELECT count(*) AS conteo FROM plataformas",
            bind: [],
            returnValue: "resultRows",
            rowMode: "object",
        });
        if (plataformasExistentes[0].conteo <= 0) {
            await this.db.exec({
                sql: "INSERT INTO plataformas(nombre, descripcion, ruta_api) VALUES (?, ?, ?), (?, ?, ?)",
                bind: [
                    "Android", "Imprimir en Android con impresora Bluetooth", "http://localhost:8000",
                    "Desktop", "Imprimir en Windows, Raspbian o Linux con impresora USB", "http://localhost:8000",
                ],
                returnValue: "resultRows",
                rowMode: "object",
            });
            await this.db.exec({
                sql: "INSERT INTO ajustes(modo_programador) VALUES (0)",
                bind: [],
                returnValue: "resultRows",
                rowMode: "object",
            });
            return;

            await this.db.exec({
                sql: "INSERT INTO diseños(id_plataforma, nombre, fecha_creacion, fecha_modificacion) VALUES (?, ?, ?, ?)",
                bind: [1, "Mi primer diseño", "2023-10-14T12:34:55", "2023-10-14T12:34:55"],
                returnValue: "resultRows",
                rowMode: "object",
            });

            await this.db.exec({
                sql: "INSERT INTO diseños(id_plataforma, nombre, fecha_creacion, fecha_modificacion) VALUES (?, ?, ?, ?)",
                bind: [2, "Ticket de venta", "2023-10-14T15:34:55", "2023-10-16T12:34:55"],
                returnValue: "resultRows",
                rowMode: "object",
            });
        }
    }

    exponerFuncionesDeDB() {
        for (const key in this.db) {
            if (typeof this.db[key] === 'function') {
                this[key] = this.db[key].bind(this.db);
            }
        }
    }
}
Comlink.expose(EnvolturaDeBaseDeDatos);