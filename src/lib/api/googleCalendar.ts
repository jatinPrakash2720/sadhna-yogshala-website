import { google } from "googleapis";
import { config } from "../config";

// 1. Authenticate using the Key from .env
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(config.googleServiceKey), // Parses the JSON string
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export async function createGoogleMeetClass(
  title: string,
  startTime: Date,
  description?: string
) {
  const event = {
    summary: title,
    description: description,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: "Asia/Kolkata", // Set to your timezone
    },
    end: {
      // Default to 1 hour
      dateTime: new Date(startTime.getTime() + 60 * 60 * 1000).toISOString(),
      timeZone: "Asia/Kolkata",
    },
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(7),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary", // The "Robot's" calendar
      conferenceDataVersion: 1, // Crucial for generating the Meet link
      requestBody: event,
    });

    return {
      meetUrl: response.data.hangoutLink,
      eventId: response.data.id,
    };
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    throw new Error("Failed to create meeting");
  }
}