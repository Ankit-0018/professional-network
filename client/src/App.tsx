import { RouterProvider } from "react-router-dom";
import router from "./components/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/useAuth";


function App() {
  
  return (
    <>
      <AuthProvider>
        <Toaster position={"top-right"} />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
