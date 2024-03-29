"use client";

import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
  {
    id: 1,
    title: "Đơn mua",
    href: "/tai-khoan/don-mua",
  },
  {
    id: 2,
    title: "Đơn xuất",
    href: "/tai-khoan/don-xuat",
  },
  {
    id: 3,
    title: "Thanh toán",
    href: "/tai-khoan/thanh-toan",
  },
  {
    id: 4,
    title: "Tài khoản",
    href: "/tai-khoan/me",
  },
];

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <SidebarNav items={sidebarNavItems} className="w-full lg:w-72 p-4" />
      <div className="p-4 h-auto lg:h-full w-full lg:w-[calc(100%_-_18rem)] ">
        {children}
      </div>
    </div>
  );
};

export default UserManagementLayout;
