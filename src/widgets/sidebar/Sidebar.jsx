import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";
import { SIDEBAR_ITEMS } from "./sidebarConfig";
import "./Sidebar.scss";

const Sidebar = () => {
  const user = useAuthStore((s) => s.user);
  const systemRole = user?.system_role;

  const items = SIDEBAR_ITEMS.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!systemRole) return false;
    return item.roles.includes(systemRole);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <div className="sidebar__user-name">
          {user?.username || "Нет имени"}
        </div>
        <div className="sidebar__user-role">{user?.system_role || "—"}</div>
      </div>

      <nav className="sidebar__nav">
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
