import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Sync the nav with the URL
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/favorites':
        setValue(1);
        break;
      case '/settings':
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/favorites');
        break;
      case 2:
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
          <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Ajustes" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
  );
};

export default BottomNav;
