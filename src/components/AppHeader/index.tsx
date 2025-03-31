import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems
} from "@carbon/react";
import { PaintBrush } from "@carbon/react/icons";
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
            <HeaderName href="#" prefix="">
              FinPlin
            </HeaderName>
            <HeaderNavigation aria-label="FinPlin Navigation">
              <HeaderMenuItem href="/" isActive={location.pathname === "/"}>
                Home
              </HeaderMenuItem>
              <HeaderMenuItem href="#">Set Budget</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Search"
                // onClick={action("search click")}
              >
                <PaintBrush size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
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
                  <HeaderMenuItem href="/set-budget">Set Budget</HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};
