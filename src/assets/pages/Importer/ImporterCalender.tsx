import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end?: string | null; // Allow end to be null
  status: string;
}

const ImporterCalender: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const userId = localStorage.getItem("userId"); // Fetching userId from local storage

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<CalendarEvent[]>(
          `https://localhost:7232/api/CMS/Calender/events/${userId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userId) {
      fetchEvents();
    } else {
      console.error("User ID not found in local storage");
    }
  }, [userId]);

  // Function to determine event color based on status
  const getEventColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      case "Completed":
        return "green";
      case "Approved":
        return "lightblue"; // Customize this color
      default:
        return "gray"; // Default color if none match
    }
  };

  return (
    <div
      className="p-5 bg-gray-100 rounded shadow-md"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <h4 style={{ margin: "0 10px 5px 0", fontSize: "14px" }}>
          Event Color Legend
        </h4>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "orange",
              marginRight: "5px",
            }}
          ></div>
          <span>Pending</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "red",
              marginRight: "5px",
            }}
          ></div>
          <span>Rejected</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "green",
              marginRight: "5px",
            }}
          ></div>
          <span>Completed</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "lightblue",
              marginRight: "5px",
            }}
          ></div>
          <span>Approved</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "gray",
              marginRight: "5px",
            }}
          ></div>
          <span>Default</span>
        </div>
      </div>
      <div style={{ marginTop: "60px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            id: event.id.toString(),
            title: event.title,
            start: event.start,
            end: event.end || undefined,
            color: getEventColor(event.status),
          }))}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventContent={(arg) => (
            <div style={{ color: "#fff", fontWeight: "bold" }}>
              {arg.event.title}
            </div>
          )}
        />
      </div>
      {/* Color Legend */}
    </div>
  );
};

export default ImporterCalender;
