import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function AlertDialog({ open, anchorEl, handleClose }) {
  const [notifications, setNotifications] = React.useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/notif/notifications/2');
        setNotifications(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite :', error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style: {
          width: '300px',
          backgroundColor: theme.palette.mode === 'dark' ? '#F5FFFA' : '#FFFFFF', // Couleur bleue en mode sombre et blanche en mode clair
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000', // Texte blanc en mode sombre et noir en mode clair
        },
      }}
    >
      {notifications && notifications.map((notification, index) => (
        <a key={index} href="/calendar" style={{ textDecoration: 'none', color: theme.palette.mode === 'dark' ? '#DA70D6' : '#DA70D6'}}>
          <Typography sx={{ p: 2, borderBottom: '1px solid #ccc', cursor: 'pointer' }}>
            {notification.split('vous a ajouté à')[0]}
          </Typography>
        </a>
      ))}
    </Popover>
  );
}
