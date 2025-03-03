import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
  const location = useLocation();

  
  const hideNavigationRoutes = ["/"]; // Add other routes if needed
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <main className="h-lvh flex flex-col">
      <div className="flex  px-8 py-8">
        {!shouldHideNavigation && <div className="h-lvh"><Navigation /></div>}
        <Outlet/>
      </div>
    </main>
  );
}

export default RootLayout;
