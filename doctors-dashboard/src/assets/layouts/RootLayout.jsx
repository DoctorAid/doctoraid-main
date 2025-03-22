import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
  const location = useLocation();
  const hideNavigationRoutes = ["/"];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <main className="h-screen w-screen flex flex-col bg-slate-100 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className="flex h-full w-full">
        {!shouldHideNavigation && (
          <div className="h-full fixed left-0 top-0 z-10">
            <Navigation />
          </div>
        )}
        <div 
          className={`flex-1 overflow-auto ${
            shouldHideNavigation ? "w-full" : "ml-64 p-6"
          }`}
        >
          <Outlet />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default RootLayout;