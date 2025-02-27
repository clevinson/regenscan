import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
