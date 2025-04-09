import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems
} from "@carbon/react";
import { useLocation } from "react-router";

export const AppHeader = () => {
  const location = useLocation();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="FinPlin App">
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="">
              FinPlin
            </HeaderName>
            <HeaderNavigation aria-label="FinPlin Navigation">
              <HeaderMenuItem href="/" isActive={location.pathname === "/"}>
                Home
              </HeaderMenuItem>
              <HeaderMenuItem
                href="/budget"
                isActive={location.pathname === "/budget"}
              >
                Budget Allocation
              </HeaderMenuItem>
              <HeaderMenuItem
                href="/categories"
                isActive={location.pathname === "/categories"}
              >
                Categories
              </HeaderMenuItem>
            </HeaderNavigation>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              onSideNavBlur={onClickSideNavExpand}
              href="#main-content"
              isPersistent={false}
              onOverlayClick={onClickSideNavExpand}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem href="/" isActive={location.pathname === "/"}>
                    Home
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    href="/budget"
                    isActive={location.pathname === "/budget"}
                  >
                    Budget Allocation
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    href="/categories"
                    isActive={location.pathname === "/categories"}
                  >
                    Categories
                  </HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};
