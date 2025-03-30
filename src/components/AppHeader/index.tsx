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

export const AppHeader = () => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Platform Name">
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="IBM">
              [Platform]
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Home</HeaderMenuItem>
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
            >
              <SideNavItems>
                <HeaderSideNavItems hasDivider={true}>
                  <HeaderMenuItem href="#">Home</HeaderMenuItem>
                  <HeaderMenuItem href="#">Set Budget</HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};
