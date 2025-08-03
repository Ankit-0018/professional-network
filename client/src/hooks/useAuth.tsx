import axios from "axios";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";



export interface User {
  _id?: string;
  name: string;
  email: string;
  bio? : string;
  avatar? : string;
  
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (values : LoginValues ) => void;
  logout: () => void;
}
interface LoginValues {
  email: string;
  password: string;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(true);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      
        
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);
  
const login = async (values : LoginValues ) => {
  try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values
      );
    
      if (res.data.success) {
        toast.success("Login successful!");
        setUser(res.data.user)
        localStorage.setItem("token", res.data.token);
      
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
}
  
  const logout = async () => {

    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, 
        { headers: { Authorization: `Bearer ${token}` }
      })
      if(res.data.success) {
        localStorage.removeItem("token");
        toast.success("Logout Successfully!")
        setUser(null)

      }
    } catch (error) {
      toast.error("LogOut failed!")
    }
  };

  
  

  return (
    <AuthContext.Provider value={{ user, isLoading , login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
