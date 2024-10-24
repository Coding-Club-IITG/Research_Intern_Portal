import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,    
  role: null,   
  loading: true,   

  checkAuth: () => {
    set({ loading: true });
    const token = Cookies.get('jwt');  
    const user = Cookies.get('user');   

    if (token && user) {
        const parsedUser = JSON.parse(user);
        set({ isAuthenticated: true, token, role: parsedUser.typeOfUser, loading: false });
    } else {
        set({ isAuthenticated: false, token: null, role: null, loading: false });
    }
  },

  getUser: () => {
    const user = Cookies.get('user');
    return JSON.parse(user);
  },
  
  logout: () => {
    Cookies.remove('jwt');
    Cookies.remove('user'); // Also remove the user cookie
    set({ isAuthenticated: false, token: null, role: null, loading: false });
  }
}));

export default useAuthStore;
