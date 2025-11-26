import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createAccount, fetchCurrentUser, loginAccount, logoutAccount } from "../Services/UserApi";
import {useNavigate} from 'react-router'

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const navigate = useNavigate()

  async function fetchUser() {
    try {
      setGlobalLoading(true);
      const res = await fetchCurrentUser();
      if (res.status == '200') {
        setUser(res?.data?.user)
      }
      
    } catch (error) {
      navigate('/login')
      console.log("Error fetching user :: ", error);
      toast.error( error?.response?.data?.message  || "Not Authenticated ");
    } finally {
      setGlobalLoading(false);
    }
  }

  async function registerUser(data) {
    try {
      setGlobalLoading(true);
      const res = await createAccount(data);
      if (res.status == '201') {
        setUser(res?.data?.user)
        navigate('/')
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.log("Error during Registeration :: ", error);
      toast.error( error?.response?.data?.message  || "Not Authenticated ");
    } finally {
      setGlobalLoading(false);
    }
  }
  async function loginUser(data) {
    try {
      setGlobalLoading(true);
      const res = await loginAccount(data);
      if (res.status == '200') {
        setUser(res?.data?.user)
        navigate('/')
      }
    } catch (error) {
      console.log("Error during logging user :: ", error);
      toast.error( error?.response?.data?.message  || "Not Authenticated ");
    } finally {
      setGlobalLoading(false);
    }
  }
  async function logoutUser() {
    try {
      setGlobalLoading(true);
      const res = await logoutAccount();
      if (res.status == '200') {
        setUser(null)
        navigate('/login')
        toast.success(res?.data?.message)
      }
    } catch (error) {
      toast.error( error?.response?.data?.message  || "Logout Failed !!");
    } finally {
      setGlobalLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <AuthContext.Provider
      value={{registerUser, loginUser, user ,globalLoading, logoutUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};
