import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState('login');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <Login
        onSuccess={(user) => setUser(user)}
        onSwitchToRegister={() => setAuthView('register')}
      />
    ) : (
      <Register
        onSuccess={(user) => setUser(user)}
        onSwitchToLogin={() => setAuthView('login')}
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;