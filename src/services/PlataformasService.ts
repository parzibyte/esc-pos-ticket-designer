export class PlataformasService {
    private store;
    constructor(store) {
        this.store = store;
    }
    async obtenerPlataformas() {
        return await this.store.exec("SELECT id, nombre, descripcion, ruta_api, licencia FROM plataformas");
    }
    async actualizarPlataforma(plataforma) {
        return await this.store.exec(
            "UPDATE plataformas SET ruta_api = ?, licencia = ? WHERE id = ?",
            [plataforma.ruta_api, plataforma.licencia, plataforma.id]
        );
    }

}