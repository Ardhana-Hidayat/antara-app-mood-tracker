import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Bell, LogOut, User, Settings } from "lucide-react";
import { signOut } from "@/app/auth/auth-action";

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 max-w-2xl mx-auto">

        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <div className="w-5 h-5 bg-primary rounded-sm shadow-sm" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Jurnal<span className="text-primary">Ku</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground mr-1">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Budi Santoso</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    budi@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil Saya</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={signOut} className="w-full cursor-pointer">
                  <button className="flex w-full items-center text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}