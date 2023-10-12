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
        this.db.exec(`CREATE TABLE IF NOT EXISTS operaciones(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clave TEXT NOT NULL,
    argumentos TEXT NOT NULL
  );`);
        this.exponerFuncionesDeDB();
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