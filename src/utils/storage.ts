import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const CUSTOMER_KEY = "customer_data";

export const storage = {
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async saveCustomer(customer: any): Promise<void> {
    await AsyncStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  },

  async getCustomer(): Promise<any | null> {
    const data = await AsyncStorage.getItem(CUSTOMER_KEY);
    return data ? JSON.parse(data) : null;
  },

  async clearAuth(): Promise<void> {
    await Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(CUSTOMER_KEY)]);
  },
};
