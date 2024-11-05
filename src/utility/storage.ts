import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKey = {
  theme: 'theme',
  font: 'font',
} as const;

class StorageManager {
  public static async getStoreValue<T>(key: StorageKeyType): Promise<T | undefined> {
    try {
      const item = await AsyncStorage.getItem(key);

      if (!item) {
        return undefined;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Async Storage: Error retrieving item for key "${key}":`, error);
      return undefined;
    }
  }

  public static async saveStoreValue(key: StorageKeyType, value: string) {
    await AsyncStorage.setItem(key, value);
  }
}

export default StorageManager;
