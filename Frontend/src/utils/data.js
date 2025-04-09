import {
  LuLayoutDashboard,
  LuUsers,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    to: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Manage Tasks",
    icon: LuClipboardCheck,
    to: "/admin/tasks",
  },
  {
    id: "03",
    label: "Create Tasks",
    icon: LuSquarePlus,
    to: "/admin/create-task",
  },
  {
    id: "04",
    label: "Team Members",
    icon: LuUsers,
    to: "/admin/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    to: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    to: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Tasks",
    icon: LuClipboardCheck,
    to: "/user/tasks",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    to: "logout",
  },
];

export const PRIORITY_DATA = [
    {label: "High", value: "high"},
    {label: "Medium", value: "medium"},
    {label: "Low", value: "low"},
];

export const STATUS_DATA = [
    {label: "Pending", value: "Pending"},
    {label: "In-Progress", value: "In-Progress"},
    {label: "Completed", value: "Completed"},
];
