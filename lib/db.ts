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

export interface User {
    id?: string;
    badge_id: string;
    pin: string;
    name: string;
    role: string;
    last_login: string;
}

export interface Session {
    id?: string;
    user_id: string;
    start_time: string;
    end_time?: string;
    is_active: boolean;
    area: string;
}

export class OfflineDB extends Dexie {
    registros!: Table<LocalRegistro>;
    users!: Table<User>;
    sessions!: Table<Session>;

    constructor() {
        super('ProdTrackerOffline');
        this.version(2).stores({
            registros: '++id, sesion_catalogo_id, synced, created_at',
            users: '++id, &badge_id, pin',
            sessions: '++id, user_id, is_active'
        });
    }
}

export const db = new OfflineDB();

// Helper to seed initial users if empty
export const seedInitialData = async () => {
    const userCount = await db.users.count();
    if (userCount === 0) {
        await db.users.add({
            badge_id: '888888',
            pin: '123456',
            name: 'Juan Pérez',
            role: 'Supervisor de Planta',
            last_login: new Date().toISOString()
        });
        console.log('Seed: User primary created (888888 / 123456)');
    }
};
