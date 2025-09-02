import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/slices/authSlice';

const LoginModal = ({ open, onClose, darkMode }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    const action = await dispatch(login({ email, password }));
    if (login.fulfilled.match(action)) {
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative w-full max-w-sm rounded-2xl p-5 ${
        darkMode ? 'bg-gray-900 border border-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'
      } shadow-xl`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">
            <i className="fas fa-sign-in-alt mr-2 text-pink-500"></i>
            Đăng nhập
          </h3>
          <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {error && (
          <div className={`mb-3 text-sm rounded-lg px-3 py-2 ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:border-pink-500`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-3 py-2 pr-10 rounded-lg border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:border-pink-500`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className={`absolute right-2 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full py-2 rounded-lg font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'} bg-gradient-to-r from-pink-500 to-rose-500 text-white`}> 
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Đăng nhập
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
