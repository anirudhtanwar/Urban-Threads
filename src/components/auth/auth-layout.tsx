
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">{title}</h1>
        {children}
        {footer && (
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
