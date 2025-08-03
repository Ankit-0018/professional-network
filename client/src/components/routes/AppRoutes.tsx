import { createBrowserRouter, Navigate } from "react-router-dom";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";
import AuthLayout from "../AuthLayout";
import Home from "../../pages/Home";
import { ProfilePage } from "../../pages/Profile";


 const router = createBrowserRouter([
    {
        path : "/register",
        element : <RegisterForm />
    },
    {
   path : "/" ,
   element :  <Navigate to="/login" replace />
    },
    {
        path : "/login",
        element : <LoginForm />
    },
    {
        path : "/home",
        element : <AuthLayout>
            <Home />
        </AuthLayout>
    }, {
        path : "/profile",
        element : <AuthLayout>
            <ProfilePage />
        </AuthLayout>
    }
])


export default router;