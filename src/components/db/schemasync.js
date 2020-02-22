import { openDb } from 'idb'

const dbPromise = _ => {
    if (!(indexedDB in window)) {
      throw new Error('Browser does not support IndexedDB')
    }  
    
    return openDb('SaveSpotDB', 1, upgradeDb => {

      if (!upgradeDb.objectStoreNames.contains('spots')) {
        upgradeDb.createObjectStore('spots')
      }   
      if (!upgradeDb.objectStoreNames.contains('completed')) {
        upgradeDb.createObjectStore('completed')
      }
    })
  }