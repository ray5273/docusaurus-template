import React, {useEffect, useState} from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  const location = useLocation();
  const {colorMode, setColorMode} = useColorMode();
  const [pageId, setPageId] = useState(location.pathname); // Manage PageId state

  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  // 페이지 경로가 변경될 때 page-id 업데이트
  useEffect(() => {
    setPageId(location.pathname);
  }, [location.pathname]);

  // Set Comentario Theme mode based on colorMode of Docusaurus
  const comentarioTheme = colorMode === 'dark' ? 'dark' : 'light';
    return (
      <footer>
      <comentario-comments auto-init="true"
                           key={pageId} // Force re-render on page change
                           auto-non-interactive-sso="false"
                           lang="ko"
                           live-update="false"
                           max-level="5"
                           no-fonts="true"
                           page-id={pageId} // Set PageId
                           theme={comentarioTheme} // Set Comentario Theme
      ></comentario-comments>
      </footer>
  );
}

export default React.memo(Footer);
