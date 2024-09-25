import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

interface iImporterCalender {
  id: number;
  title: string;
  start: string;
  end?: string;
  status: string;
}

const ImporterCalender: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Example userId (you can dynamically get it based on logged-in user)
  const userId = 1;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<CalendarEvent[]>(
          `http://localhost:5000/api/calendar/importer/events/${userId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Importer Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          id: event.id.toString(),
          title: event.title + " - " + event.status,
          start: event.start,
          end: event.end,
        }))}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default ImporterCalender;
