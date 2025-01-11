"use client";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useAuthContext } from "@/contexts/auth-context";

export default function ProfileButton() {
  const { logout, user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage></AvatarImage>
          <AvatarFallback>{getInitials(user?.name as string)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-64">
        <DropdownMenuItem className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>{getInitials(user?.name as string)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 overflow-hidden">
            <span className="font-bold text-muted-foreground capitalize truncate">
              {user?.name}
            </span>
            <span className="font-medium text-muted-foreground capitalize">
              {user?.role}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300" />
        {user?.role !== "dppm" && user?.role !== "keuangan" ? (
          <Link
            href={`/dashboard/${user?.role}/akun-saya`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
          >
            <DropdownMenuItem className="flex flex-row gap-4">
              <UserIcon className="text-muted-foreground" />
              <span className="font-bold text-muted-foreground capitalize">
                akun saya
              </span>
            </DropdownMenuItem>
          </Link>
        ) : (
          <Link
            href={`/dashboard/${user?.role}/ubah-sandi`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
          >
            <DropdownMenuItem className="flex flex-row gap-4">
              <UserIcon className="text-muted-foreground" />
              <span className="font-bold text-muted-foreground capitalize">
                ubah sandi
              </span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator className="bg-gray-300" />
        <Button
          variant={"ghost"}
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <DropdownMenuItem className="flex flex-row gap-4">
            <LogOutIcon className="text-muted-foreground" />
            <span className="font-bold text-muted-foreground capitalize">
              logout
            </span>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
