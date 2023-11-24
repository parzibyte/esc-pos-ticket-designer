//@ts-ignore
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import * as Comlink from "comlink"
const NOMBRE_BASE_DE_DATOS = "escpos.sqlite3";
const log = (...args: any[]) => { console.log(...args) };
const error = (...args: any[]) => { console.log(...args) };
type sqlObject = {
    sql: string,
    bind: any[],
    returnValue: string,
    rowMode: string,
}
class EnvolturaDeBaseDeDatos {
    db: { exec: (sql: string | sqlObject) => Promise<any>, filename: string, } = {
        exec(sql: string | sqlObject) {
            return new Promise<any>(() => { });
        },
        filename: "",
    };
    constructor() {
    }
    async iniciar() {
        console.log("Iniciando worker...");
        //@ts-ignore
        const sqlite3 = await sqlite3InitModule({
            print: log,
            printErr: error,
        });
        if ('opfs' in sqlite3) {
            this.db = new sqlite3.oo1.OpfsDb({
                filename: NOMBRE_BASE_DE_DATOS,
                flags: "c",
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
        if (this.db === null) {
            console.error("Base de datos es null");
            return;
        }
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
        }
    }

    exponerFuncionesDeDB() {
        if (this.db === null) {
            console.error("Base de datos es null");
            return;
        }
        for (const key in this.db) {
            //@ts-ignore
            if (typeof this.db[key] === 'function') {
                //@ts-ignore
                this[key] = this.db[key].bind(this.db);
            }
        }
    }
}
Comlink.expose(EnvolturaDeBaseDeDatos);