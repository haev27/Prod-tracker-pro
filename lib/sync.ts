import { db } from './db';
import { supabase } from './supabase';

export const syncOfflineData = async () => {
    const unsynced = await db.registros.filter(r => !r.synced).toArray();

    if (unsynced.length === 0) return;

    for (const record of unsynced) {
        const { id, synced, ...dataToSync } = record;

        const { error } = await supabase
            .from('registros_produccion')
            .insert(dataToSync);

        if (!error) {
            await db.registros.update(id!, { synced: true });
        } else {
            console.error('Sync error:', error);
        }
    }
};

// Monitor custom online event
if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
        syncOfflineData();
    });
}
