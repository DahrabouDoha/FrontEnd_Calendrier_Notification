import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import Person2Icon from '@mui/icons-material/Person2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';


const EventInfos = ({ event, setShowEventInfo }) => {
  

  const handleCancel = () => {
    setShowEventInfo(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={Boolean(event)} onClose={handleCancel}>
    <DialogTitle style={{ backgroundColor: '#DA70D6', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>{event.title}</DialogTitle>
      <DialogContent style={{ backgroundColor: 'white', color: "black", fontSize: '1.2rem', padding: '24px' }}>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <CalendarMonthIcon style={{ marginRight: '35px', fontSize: '1.2rem' }} /> {event.date}
        </Typography>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <AccessTimeIcon style={{ marginRight: '35px', fontSize: '1.2rem' }} /> {event.time}
        </Typography>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <InfoIcon style={{ marginRight: '35px', fontSize: '1.2rem' }} /> {event.eventType}
        </Typography>
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Person2Icon style={{marginRight: '35px', fontSize: '1.2rem' }} /> {event.organisateur}
        </Typography>
        {event.Url && (
          <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <LinkIcon style={{marginRight: '12px', fontSize: '1.2rem' }} />
            <a href={event.Url} target="_blank" rel="noopener noreferrer" style={{ color: '#9400D3', marginLeft: '20px', borderRadius: '10px', padding: '5px', marginRight: '5px', textDecoration: 'none' }}>
              {event.Url}
            </a>
          </Typography>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
         <Button variant="contained" color="primary" onClick={handleCancel}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventInfos;
