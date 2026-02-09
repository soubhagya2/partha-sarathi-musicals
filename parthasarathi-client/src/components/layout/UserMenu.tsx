import React from "react";
import { useAuth } from "../../context/AuthContext";
import { User, LogOut } from "lucide-react";

const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-amber-100 text-amber-900 w-8 h-8 flex items-center justify-center">
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            className="w-full h-full rounded-full object-cover"
            alt=""
          />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div className="text-sm text-amber-900">
        <div className="font-bold">{user.name}</div>
        <div className="text-[11px] text-amber-700/60">{user.role}</div>
      </div>
      <button
        onClick={() => logout()}
        className="ml-2 px-3 py-2 bg-amber-50 rounded-md text-amber-900 hover:bg-amber-100"
        aria-label="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UserMenu;
