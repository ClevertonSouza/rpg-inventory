'use client'

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const LoginButton = ({ children, className }: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push('/app/dashboard');
        console.log('login button clicked');
    }
    
  return (
    <a onClick={onClick} className={className}>{children}</a>
  );
};

