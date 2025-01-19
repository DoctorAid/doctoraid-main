import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
  const location = useLocation();

  
  const hideNavigationRoutes = ["/log-in"]; // Add other routes if needed
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <main>
      <div className="flex px-8 py-8">
        {!shouldHideNavigation && <Navigation />}
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
