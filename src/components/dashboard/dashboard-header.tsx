import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Filter, SortDesc, Bell } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeFilters?: number;
  onFilterClick?: () => void;
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  searchValue = "", 
  onSearchChange, 
  activeFilters = 0,
  onFilterClick 
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 w-64 bg-muted/50"
              />
            </div>

            {/* Filter button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="relative"
                  onClick={onFilterClick}
                >
                  <Filter className="w-4 h-4" />
                  {activeFilters > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                      variant="secondary"
                    >
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span>All Types</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>VCs</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Grants</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Accelerators</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SortDesc className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span>Best Match</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Deadline</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Amount</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Recently Added</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <Badge 
                className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"
                variant="destructive"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}