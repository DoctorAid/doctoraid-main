import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
  const location = useLocation();
  const hideNavigationRoutes = ["/"];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <main className="h-lvh flex flex-col animate-[pop_0.3s_ease-out]">
      <div className="flex h-full">
        {!shouldHideNavigation && (
          <div className="w-64 h-full fixed left-0 top-0">
            <Navigation />
          </div>
        )}
        <div className={`flex-1 px-8 py-8 ${shouldHideNavigation ? "w-full" : "ml-64"}`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default RootLayout;
