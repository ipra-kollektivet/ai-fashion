import { ref, computed, readonly } from 'vue';

interface User {
  id: number;
  email: string;
  name?: string;
}

// Global reactive state - shared across all components
const authToken = ref(localStorage.getItem('authToken'));
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

export const useAuth = () => {
  const isLoggedIn = computed(() => !!authToken.value);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    authToken.value = token;
    user.value = userData;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    authToken.value = null;
    user.value = null;
  };

  const getAuthHeaders = () => {
    return authToken.value
      ? { Authorization: `Bearer ${authToken.value}` }
      : {};
  };

  return {
    authToken: readonly(authToken),
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
    getAuthHeaders,
  };
};
