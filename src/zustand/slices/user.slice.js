// createUserSlice.ts
import { auth, db } from '../../firebase'; // make sure you import your firebase.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions

const createUserSlice = (set, get) => ({
  user: null, // Firebase User Object or null
  authErrorMessage: '',

  fetchUser: () => {
    // Sets up a listener to keep the user in sync with auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },

  register: async ({ email, password }) => {
    get().setAuthErrorMessage('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔥 Create Firestore document for the new user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        role: 'user', // (optional) Default role
      });

      set({ authErrorMessage: '' });
    } catch (err) {
      console.log('register error:', err);
      get().setAuthErrorMessage(err.message || 'Registration failed.');
    }
  },
  logIn: async ({ email, password }) => {
    get().setAuthErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log('logIn error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        get().setAuthErrorMessage('Invalid email or password.');
      } else {
        get().setAuthErrorMessage('Login failed. Try again.');
      }
    }
  },

  logOut: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (err) {
      console.log('logOut error:', err);
    }
  },

  setAuthErrorMessage: (message) => {
    set({ authErrorMessage: message });
  },
});

export default createUserSlice;