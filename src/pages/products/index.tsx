import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';

export default function FontAwesomeIcon() {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',

      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (

    <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30, color: "black" }} />

  );
}
