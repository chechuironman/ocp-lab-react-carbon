import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  // HeaderGlobalBar,
  // HeaderGlobalAction,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';


// import Notification20 from '@carbon/icons-react/lib/notification/20';
// import UserAvatar20 from '@carbon/icons-react/lib/user--avatar/20';
// import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';


  // this.state = { showMenu: true };


const TutorialHeader = () => (
  <Header aria-label="Cloud Lab">
    <SkipToContent />
    <HeaderName element={Link} to="/" prefix="IBM">
      Cloud LAB
    </HeaderName>
    <HeaderNavigation aria-label="Cloud Lab">
      <HeaderMenuItem element={Link}  to="/workspace">
        WorkSpace
      </HeaderMenuItem>
      <HeaderMenuItem element={Link} to="/register">
        Register
      </HeaderMenuItem>
      <HeaderMenuItem element={Link} to="/login">
        Login
      </HeaderMenuItem>
    </HeaderNavigation>
    {/* <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="User Avatar">
        <UserAvatar20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar> */}
  </Header>
);

export default TutorialHeader;
