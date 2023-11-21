// ** MUI Imports
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const handleNavigation = () => {
    const targetUrl = process.env.NEXT_PUBLIC_BYTE_BILLION_LINK;
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2,  }}>
        {`© ${new Date().getFullYear()} Karo Manage `}

        {`Powered by `}
        <span style={{cursor:'pointer',fontWeight:'bolder' ,textDecoration:'none' }} onClick={handleNavigation}> Byte Billion</span>
        
      </Typography>

    </Box>
  )
}

export default FooterContent
