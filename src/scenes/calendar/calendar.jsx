import React, { useState, useEffect } from "react";
import axios from 'axios';
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import EventForm from "./EventForm";
import EventInfo from "./EventInfos"; 
import InvitedEvent from './InvitedEvent';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [showEventInvited, setShowEventInvited] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const [memberEvents, setMemberEvents] = useState([]);

  const handleSelectinfo = (eventId) => {
    axios.get(`http://localhost:8085/events/${eventId}`)
      .then(response => {
        const eventData = response.data[0]; // Sélectionnez le premier élément du tableau de réponse
        console.log(eventData);
  
        const selectedEvent = {
          id: eventData.id,
          title: eventData.title,
          eventType: eventData.eventType,
          organisateur: eventData.organisateur,
          time: eventData.time,
          date: eventData.date,
          TR: eventData.TR,
          Url: eventData.Url,
          date: eventData.date,
          participants: eventData.participants ?? [],
        };
        console.log(selectedEvent);
  
        setSelectedEvent(selectedEvent);
        setShowEventInfo(true);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  };
  
  const handleSelectinvited= (eventId) => {
    axios.get(`http://localhost:8085/events/${eventId}`)
      .then(response => {
        const eventData = response.data[0]; // Sélectionnez le premier élément du tableau de réponse
        console.log(eventData);
  
        const selectedEvent = {
          id: eventData.id,
          title: eventData.title,
          eventType: eventData.eventType,
          organisateur: eventData.organisateur,
          time: eventData.time,
          date: eventData.date,
          TR: eventData.TR,
          Url: eventData.Url,
         
          date: eventData.date,
          participants: eventData.participants ?? [],

        };
        console.log(selectedEvent);
  
        setSelectedEvent(selectedEvent);
        setShowEventInvited(true);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  };
  
  

  const handleSelect = (info) => {
    const { start, end } = info;
    const selectedDate = formatDate(start, { year: 'numeric', month: '2-digit', day: '2-digit' });
    setShowEventForm(!showEventForm);
  };
  
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

 

  useEffect(() => {
    // Fetching organizer events
    axios.get('http://localhost:8085/events/events/organizer/1')
      .then(response => {
        const coloredorgEvents = response.data.map(event => ({
          ...event,
          color: '#87CEFA' // Set color to blue for member events
        }));
        setOrganizerEvents(coloredorgEvents);
      })
      .catch(error => {
        console.error('Error fetching organizer events:', error);
      });

    // Fetching member events
    axios.get('http://localhost:8085/events/events/member/1')
      .then(response => {
        const coloredMemberEvents = response.data.map(event => ({
          ...event,
          color: '#DA70D6' // Set color to blue for member events
        }));
        setMemberEvents(coloredMemberEvents);
      })
      .catch(error => {
        console.error('Error fetching member events:', error);
      });
  }, []);
  
 
  useEffect(() => {
    setCurrentEvents([...organizerEvents, ...memberEvents]);
  }, [organizerEvents, memberEvents]);
  
  
  
  
  
  
  return (
    <Box m="20px" position="relative">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <Typography variant="h5">Organizer Events</Typography>
      <List>
        {organizerEvents.map(event => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor:" #87CEFA",
              margin: "10px 0",
              borderRadius: "2px",
              padding: "10px",
              cursor: "pointer"
            }}
            onClick={() => handleSelectinfo(event.id)}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start)} - {event.eventType}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5">Member Events</Typography>
      <List>
        {memberEvents.map(event => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor:"#DA70D6",
              margin: "10px 0",
              borderRadius: "2px",
              padding: "10px",
              cursor: "pointer"
            }}
            onClick={() => handleSelectinvited(event.id)}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start)} - {event.eventType}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
        </Box>
        
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" position="relative">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleSelect}
            eventClick={handleEventClick}
            events={currentEvents.map(event => ({
              title: event.title,
              start: event.date,
              description: event.description, // Ajoutez la description ici
              eventType: event.eventType,
              color: event.color
            }))}
            
           
          />
          {showEventForm && (
            <div className="event-form-overlay" style={{ backgroundColor: "#E6E6FA" }}>
              <EventForm showForm={showEventForm} setShowForm={setShowEventForm} style={{ backgroundColor: "#E6E6FA" ,width:"1000px"}} />
            </div>
          )}

          {/* Ajoutez l'affichage conditionnel des détails de l'événement */}
          {showEventInfo && selectedEvent && (
            <div className="event-info-overlay" >
              <EventInfo event={selectedEvent} setShowEventInfo={setShowEventInfo}  />
            </div>
          )}
          {showEventInvited && selectedEvent && (
            <div className="event-info-overlay" style={{ backgroundColor: "#E6E6FA" }}>
              <InvitedEvent event={selectedEvent} setShowEventInfo={setShowEventInvited} />
            </div>
          )}
        </Box>
      </Box>
    </Box>
    
  );
};

export default Calendar;
