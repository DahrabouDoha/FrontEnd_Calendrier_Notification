import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import './Form.css';
import { Grid } from "@material-ui/core";

export default function EventForm({ showForm, setShowForm }) {
  const [eventType, setEventType] = useState("Reunion"); // Par défaut: Reunion
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(""); // Déclarer l'état de la date
  const [participantEmails, setParticipantEmails] = useState([]); // Ajout du state pour les adresses email des participants
  const [emails, setEmails] = useState([]); // Etat pour les emails récupérés
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [eventMode, setEventMode] = useState("In-person"); // Par défaut: In-person
  const [remoteUrl, setRemoteUrl] = useState(""); // Ajout du state pour l'URL à distance

  useEffect(() => {
    // Récupérer les emails depuis l'API
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:8085/utilisateurs/emails/entreprise/1');
        setEmails(response.data); // Supposons que response.data soit un tableau d'emails
      } catch (error) {
        console.error('Erreur lors de la récupération des emails', error);
      }
    };

    fetchEmails();
  }, []);

  // Fonction pour soumettre le formulaire
  function submit(e) {
    e.preventDefault();

    // Construction de l'objet de données à envoyer au serveur
    const eventData = {
      eventType,
      title,
      time,
      date,
      participantEmails, // Utilisation du state pour les adresses email des participants
      remoteUrl
    };
    console.log("Formulaire soumis avec les données suivantes :", eventData);
    axios.post(`http://localhost:8085/events/add/1`, eventData)
    .then(response => {
      if (response.status === 201) {
        alert("Event added successfully.");
        handleClose();
      } else {
        throw new Error("Failed to add event.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("Failed to add event.");
    });

    // Envoi de la requête POST au serveur avec les données de l'événement
  }

  // Fonction pour fermer le formulaire
  function handleClose() {
    setShowForm(false);
    setSubmitted(false);
    setError("");
  }

  // Fonction pour annuler la saisie dans le formulaire
  function handleCancel() {
    setShowForm(false); // Annule l'affichage du composant
  }

  return (
    <div className="modal-content">
      {!submitted ? (
        <>
          <h2 style={{color:"#1836B2" ,borderBottom: '2px solid #CB6CE6' }}>Event</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value);
                  setParticipantEmails([]);
                  setRemoteUrl("");
                }}
              >
                <option value="Reunion">Reunion</option>
                <option value="Evenement">Evenement</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            {eventType === "Reunion" && (
              <div className="form-group">
                <label htmlFor="participantEmails">Participant Emails</label>
                <select
                  id="participantEmails"
                  multiple
                  value={participantEmails}
                  onChange={(e) => setParticipantEmails(Array.from(e.target.selectedOptions, (option) => option.value))}
                  required
                >
                  {emails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="eventMode">Event Mode</label>
              <select
                id="reunionType"
                value={eventMode}
                onChange={(e) => setEventMode(e.target.value)}
              >
                <option value="In-person">In-person</option>
                <option value="Remote">Remote</option>
              </select>
              {eventMode === "Remote" && (
                <div id="urlDiv" className="form-group">
                  <label htmlFor="remoteUrl">Remote URL</label>
                  <input
                    id="remoteUrl"
                    type="text"
                    value={remoteUrl}
                    onChange={(e) => setRemoteUrl(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary">Add</Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}
