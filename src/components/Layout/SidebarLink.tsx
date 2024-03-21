import { cn } from "@/lib/utils";
import Link from "next/link";

type Path = {
  href: string;
  icon: IconType;
  label: string;
  className?: string;
};

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

export default function SidebarLink({
  path,
  active,
}: {
  path: Path;
  active: boolean;
}) {
  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      <Link
        className={cn([
          "flex items-center gap-6 rounded-lg px-3 py-2 transition-all",
          active &&
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
          !active &&
            "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
          path.className,
        ])}
        href={path.href}
      >
        <path.icon className="h-4 w-4" />
        {path.label}
      </Link>
    </nav>
  );
}
