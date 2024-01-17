"use client";
import { useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Icons } from "../icons";
import ThaoNguyenLogo from "@images/logo/logo.svg";
import { NavBarRoute } from "@/constans/route";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, UnstyledButton } from "@mantine/core";
import LoginModal from "../login-modal";

const Header = () => {
  const pathname = usePathname();
  const path = useMemo(() => pathname.split("/")[1], [pathname]);
  const [onpenedMenu, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <div className="hidden xl:block h-11 bg-[#35A8E0]">
        <div className="h-full flex max-w-6xl mx-auto items-center justify-between text-white">
          <div>
            <h2 className="text-sm">Tổng kho Thảo Nguyên</h2>
          </div>
          <LoginModal />
        </div>
      </div>
      <div>
        <div className="h-full  flex gap-11 max-w-6xl mx-auto items-center justify-between">
          <div className="basis-[147px]">
            <ThaoNguyenLogo />
          </div>
          <div className="hidden xl:flex flex-1 flex-col mt-2">
            <div className="flex items-center justify-between gap-20">
              <div className="flex w-full items-center">
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm bạn muốn mua tại đây"
                  className="rounded-none focus-visible:ring-0"
                />
                <Button type="button" className="rounded-none bg-[#35A8E0]">
                  TÌM KIẾM
                </Button>
              </div>
              <div className="flex">
                <Icons.phone />
                <div>
                  <h1>HOTLINE</h1>
                  <p>0921.367.363</p>
                </div>
              </div>
            </div>
            <Separator className="bg-black h-0.5 mt-4" />
            <div className="flex gap-4">
              {NavBarRoute.map((item, index) => (
                <Link
                  key={index}
                  href={item.slug}
                  className={cn(
                    "hover:text-[#35A8E0] text-sm leading-[70px] tracking-wide",
                    path === item.slug.split("/")[1] && "text-[#35A8E0]"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="block xl:hidden">
            <UnstyledButton onClick={openMenu}>
              <Icons.menu />
            </UnstyledButton>
            <Drawer
              opened={onpenedMenu}
              onClose={closeMenu}
              withCloseButton={false}
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            >
              <div className="flex flex-col gap-4 py-20 px-4">
                {NavBarRoute.map((item, index) => (
                  <Link
                    key={index}
                    href={item.slug}
                    className={cn(
                      "hover:text-[#35A8E0] text-lg tracking-wide text-black",
                      path === item.slug.split("/")[1] && "text-[#35A8E0]"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;