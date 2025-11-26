import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createAccount, fetchCurrentUser, loginAccount } from "../Services/UserApi";
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
        toast.success(res?.data?.message)
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
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.log("Error during logging user :: ", error);
      toast.error( error?.response?.data?.message  || "Not Authenticated ");
    } finally {
      setGlobalLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

//   const handleNewTask = async (e) => {
//     if (e && e.preventDefault) e.preventDefault();
//     const trimmed = (taskInput || "").trim();
//     if (trimmed.length <= 2 || !trimmed)
//       return toast.warning("Task length must be more than 2");
//     try {
//       await newTask(trimmed);
//       toast.success("New Task added");
//       setTaskInput("");
//       fetchAll()
//     } catch (err) {
//       console.log("Error while creating new task ::", err);
//       toast.error(err?.response?.data?.message || "Failed to create");
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     try {
//       setGlobalLoading(true);
//       await deleteTask(id);
//       await fetchAll();
//       toast.success("Deleted");
//     } catch (error) {
//       toast.warning(
//         error?.response?.data?.message || "Failed to delete Task !"
//       );
//     } finally {
//       setGlobalLoading(false);
//     }
//     await deleteTask(id)
//       .then((res) => toast.success(res?.data?.message))
//       .catch((err) => toast.warning(err?.response?.data?.message));
//   };

//   const updateCompletedHandler = async (id, completed) => {
//     try {
//       await updateCompleted(id, completed);
//       await fetchAll();
//     } catch (err) {
//       toast.error(err?.response?.data?.message);
//     }
//   };

  return (
    <AuthContext.Provider
      value={{registerUser, loginUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};
