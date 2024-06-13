import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function MultipleSnackbars() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/notif/notifications/rappel/2');
        setNotifications(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite :', error);
      }
    };

    fetchData();
  }, []);

  const handleCancel = (index) => {
    setNotifications((prevNotifications) => {
      const newNotifications = [...prevNotifications];
      newNotifications.splice(index, 1); // Supprimer la notification à l'index spécifié
      return newNotifications;
    });
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        {notifications.map((notification, index) => (
          <SnackbarContent
            key={index}
            message={notification}
            action={<Button color="secondary" size="small" onClick={() => handleCancel(index)}>Annuler</Button>}
            sx={{ left: 0 }} // Positionner le SnackbarContent à gauche
          />
        ))}
      </Stack>
    </div>
  );
}
