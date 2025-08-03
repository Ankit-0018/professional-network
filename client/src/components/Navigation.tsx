import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { LogOut, Home, User as UserIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";




 const Navigation = () => {

const navigate = useNavigate();
const location = useLocation()
const {logout , user : currentUser} = useAuth();



  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-[#3694c3]">Professional Network</h1>
          <nav className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className={`flex items-center space-x-2 ${location.pathname === "/home" ? "bg-[#1993D1] text-white pointer-events-none" : ""}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className={`flex items-center space-x-2 ${location.pathname === "/profile" ? "bg-[#1993D1] text-white pointer-events-none" : ""}`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 ml-2.5">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:block">{currentUser?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/login")
            }}
            className="flex items-center space-x-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:block">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;