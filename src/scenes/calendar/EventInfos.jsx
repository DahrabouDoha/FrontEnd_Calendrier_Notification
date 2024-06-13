import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';

const EventInfos = ({ event, setShowEventInfo }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8085/events/events/${event.id}`);
      setShowEventInfo(false);
      window.location.reload(); // Peut-être envisager une autre méthode pour actualiser les données
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  };

  const handleCancel = () => {
    setShowEventInfo(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={Boolean(event)} onClose={handleCancel}>
      <DialogTitle style={{ backgroundColor: '#87CEFA', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>{event.title}</DialogTitle>
      <DialogContent style={{ backgroundColor: 'white', color: "black", fontSize: '1.2rem', padding: '24px' }}>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <CalendarMonthIcon style={{ marginRight: '35px', fontSize: '1.2rem' }} /> {event.date}
        </Typography>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <AccessTimeIcon style={{  marginRight: '35px', fontSize: '1.2rem' }} /> {event.time}
        </Typography>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <InfoIcon style={{  marginRight: '35px', fontSize: '1.2rem' }} /> {event.eventType}
        </Typography>
        {event.eventType !== 'Evenement' && (
          <>
            {event.Url && (
          <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <LinkIcon style={{  marginRight: '35px', fontSize: '1.2rem' }} />
            <a href={event.Url} target="_blank" rel="noopener noreferrer" style={{ color: '#9400D3', marginLeft: '20px', borderRadius: '10px', padding: '5px', marginRight: '5px', textDecoration: 'none' }}>
              {event.Url}
            </a>
          </Typography>
        )}
          </>
        )}
        <Typography variant="subtitle1" style={{ marginBottom: '12px' }}>Participants:</Typography>
        <List>
          {event.participants.length > 0 ? (
            event.participants.map((participant, index) => (
              <ListItem disableGutters key={index}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#87CEFA', color: 'white', width: '48px', height: '48px' }}>
                      <PersonIcon style={{ fontSize: '1.8rem' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={participant} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Aucun participant" />
            </ListItem>
          )}
        </List>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: '#87CEFA', color: 'white', marginRight: '10px' }}>Supprimer</Button>
          <Button variant="contained" color="primary" onClick={handleCancel}>Annuler</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventInfos;
