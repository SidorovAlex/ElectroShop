import './Header.css';
import logo from '../../../images/logo.png';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ImSearch } from 'react-icons/im';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions/UserOptions';

const pages = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Products',
    path: '/products',
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.userState);
  const { cartItems } = useSelector((state) => state.cartState);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/">
              <img src={logo} alt="logo" className="site-logo" />
            </NavLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink to={page.path}>{page.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: {
                xs: '100px',
                sm: '100%',
              },
            }}
          >
            <NavLink to="/">
              <img src={logo} alt="logo" className="site-logo" />
            </NavLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink
                  to={page.path}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.674)',
                    cursor: isActive ? 'unset' : 'pointer',
                  })}
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              ml: '2rem',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              color: 'inherit',
            }}
          >
            <Tooltip title="Search">
              <NavLink
                to="/search"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.674)',
                  cursor: isActive ? 'unset' : 'pointer',
                })}
              >
                <ImSearch />
              </NavLink>
            </Tooltip>
          </Box>
          <Box
            sx={{
              ml: '1rem',
              fontSize: { xs: '1.3rem', sm: '2rem' },
              color: 'inherit',
            }}
          >
            <Tooltip
              title={
                cartItems.length > 0 ? `Cart(${cartItems.length})` : 'Cart'
              }
            >
              <NavLink
                to="/cart"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.674)',
                  cursor: isActive ? 'unset' : 'pointer',
                })}
              >
                <FaShoppingCart />
              </NavLink>
            </Tooltip>
          </Box>
          {!isAuthenticated && (
            <Box sx={{ ml: '1rem', fontSize: '2rem', color: 'inherit' }}>
              <Tooltip title={isAuthenticated ? '' : 'Login'}>
                <NavLink
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.674)',
                    cursor: isActive ? 'unset' : 'pointer',
                  })}
                >
                  <AccountCircleIcon
                    sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}
                  />
                </NavLink>
              </Tooltip>
            </Box>
          )}
          {isAuthenticated && (
            <Box sx={{ ml: '1rem', fontSize: '2rem', color: 'inherit' }}>
              <UserOptions user={user} />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
