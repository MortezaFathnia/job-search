import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [user])

  //login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true)

      const res = await axios.post('/api/auth/login', {
        username,
        password
      })
      if (res.data.success) {
        loadUser();
        setIsAuthenticated(true);
        setLoading(false)
        router.push('/')
      }

    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      )
    }
  }

  //register user
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true)

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
      if (res.data.message) {
        setLoading(false)
        router.push('/login')
      }

    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      )
    }
  }

  //load user
  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get('/api/auth/user')
      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false)
        setUser(res.data.user)
      }

    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false)
      setUser(null)
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      )
    }
  }
  //Clear Errors
  const clearErrors = () => {
    setError(null)
  }
  //logout user
  const logout = async () => {
    try {
      setLoading(true)

      const res = await axios.post('/api/auth/logout')
      if (res.data.success) {
        setIsAuthenticated(false);
        setLoading(false)
        setUser(null)
      }

    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false)
      setUser(null)
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      )
    }
  }
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext