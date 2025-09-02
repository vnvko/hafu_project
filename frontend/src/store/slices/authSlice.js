import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../services/api';

const TOKEN_KEY = 'auth.token';
const USER_KEY = 'auth.user';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.login(credentials);
      return res; // expected: { token, user }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialToken = localStorage.getItem(TOKEN_KEY) || null;
const initialUser = (() => {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
})();

if (initialToken) {
  setAuthToken(initialToken);
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user: initialUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setAuthToken(null);
    },
    setAuthFromStorage: (state, action) => {
      state.token = action.payload?.token || null;
      state.user = action.payload?.user || null;
      setAuthToken(state.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.user = action.payload?.user || null;
        if (state.token) {
          localStorage.setItem(TOKEN_KEY, state.token);
          setAuthToken(state.token);
        }
        if (state.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(state.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập thất bại';
      });
  }
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
