import Dexie, { type Table } from 'dexie';

export interface LocalRegistro {
    id?: string;
    sesion_catalogo_id: string;
    hora_reloj: string;
    cajas_producidas: number;
    eas_producidas: number;
    headcount_hora: number;
    tiempo_muerto_minutos: number;
    synced: boolean;
    created_at: string;
}

export class OfflineDB extends Dexie {
    registros!: Table<LocalRegistro>;

    constructor() {
        super('ProdTrackerOffline');
        this.version(1).stores({
            registros: '++id, sesion_catalogo_id, synced, created_at'
        });
    }
}

export const db = new OfflineDB();
