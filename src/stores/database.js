import Dexie from 'dexie'

export const db = new Dexie('ModelDatabase')

db.version(1).stores({
	models: '++id, name, params'
})