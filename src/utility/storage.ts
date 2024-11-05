import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageManager {
  public static async getStoreValue<T>(key: StorageKey): Promise<T | undefined> {
    try {
      const item = await AsyncStorage.getItem(key);

      if (!item) {
        return undefined;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.log(`Async Storage: Error retrieving item for key "${key}":`, error);
      return undefined;
    }
  }

  public static async saveStoreValue(key: StorageKey, value: string) {
    await AsyncStorage.setItem(key, value);
  }
}

export default StorageManager;
