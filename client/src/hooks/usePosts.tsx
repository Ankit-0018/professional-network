import axios from "axios";
import { useState, type ReactNode , createContext, useEffect, useContext} from "react";
import type { User } from "./useAuth";
import toast from "react-hot-toast";



export interface Post {
  _id: string;
  user: User;   
  text: string;
  createdAt: string;
  updatedAt?: string;
}

interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (text: string) => Promise<void>;
}
const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(res.data.posts); 
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
      
    }
  };

  const addPost = async (text: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        { text },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if(res.data.post) setPosts((prev) => [res.data.post,...prev]); 
      
    } catch (error) {
      toast.error("Post failed!")
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, isLoading, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};