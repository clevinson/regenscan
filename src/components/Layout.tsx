import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
