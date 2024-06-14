import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CartOverview from "../features/cart/CartOverview";
import Loader from "../ui/Loader";
import Header from "./Header";

const AppLayout = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <SwitchTransition>
      <CSSTransition key={location.pathname} timeout={200} classNames={"fade"}>
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          {isLoading && <Loader />}

          <Header />

          <div className="overflow-scroll">
            <main className="mx-auto max-w-3xl">
              <Outlet />
            </main>
          </div>

          <CartOverview />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppLayout;
