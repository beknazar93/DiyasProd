// src/shared/store/useAuthStore.js
import { create } from "zustand";
import { authApi } from "../api/authApi";

const STORAGE_KEY = "diyas_auth";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    }

    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || null,
      token: parsed.token || null,
      refreshToken: parsed.refreshToken || null,
      isAuthenticated: !!parsed.token,
      loading: false,
      error: null,
    };
  } catch (e) {
    console.error("Ошибка чтения auth из localStorage:", e);
    return {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }
};

const saveToStorage = (data) => {
  if (typeof window === "undefined") return;
  try {
    if (!data) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Ошибка записи auth в localStorage:", e);
  }
};

export const useAuthStore = create((set, get) => ({
  ...getInitialState(),

  // ЛОГИН: email + password
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const payload = { email, password };
      const { data } = await authApi.login(payload);

      const access = data.access || null;
      const refresh = data.refresh || null;

      // временно создаём объект authData
      const authData = {
        user: null,
        token: access,
        refreshToken: refresh,
      };

      set({
        token: access,
        refreshToken: refresh,
        isAuthenticated: !!access,
        loading: false,
        error: null,
      });

      // пробуем подтянуть профиль
      try {
        const meRes = await authApi.me();
        authData.user = meRes.data;
        set({ user: meRes.data });
      } catch (e) {
        console.error("Не удалось загрузить профиль /auth/me/:", e);
      }

      // 💾 сохраняем в localStorage
      saveToStorage(authData);

      return true;
    } catch (error) {
      console.error("Login error:", error);

      let message = "Ошибка входа. Проверьте email и пароль.";
      if (error.response) {
        if (error.response.status === 401) {
          message = "Неверный email или пароль.";
        } else if (error.response.data?.detail) {
          message = error.response.data.detail;
        }
      }

      set({
        loading: false,
        error: message,
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        user: null,
      });

      // на всякий случай чистим storage
      saveToStorage(null);

      return false;
    }
  },

  logout: () => {
    saveToStorage(null);
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },
}));
