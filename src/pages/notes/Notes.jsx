import { Container } from "react-bootstrap";
import Note from "./components/Note";

const notes = [
    {
      id: 1,
      text: "Prepare lesson plans for next week.",
      date: new Date("Mar 17 2024 16:12:03"),
    },
    {
      id: 2,
      text: "Review Python functions.",
      date: new Date("Mar 17 2024 18:30:00"),
    },
    {
      id: 3,
      text: "Buy groceries for the week.",
      date: new Date("Mar 18 2024 09:45:00"),
    },
    {
      id: 4,
      text: "Attend parent-teacher meeting.",
      date: new Date("Mar 18 2024 15:00:00"),
    },
    {
      id: 5,
      text: "Submit project proposal.",
      date: new Date("Mar 19 2024 10:00:00"),
    },
    {
      id: 6,
      text: "Call family members.",
      date: new Date("Mar 19 2024 19:30:00"),
    },
    {
      id: 7,
      text: "Complete coding assignment.",
      date: new Date("Mar 20 2024 14:00:00"),
    },
    {
      id: 8,
      text: "Schedule dentist appointment.",
      date: new Date("Mar 20 2024 16:30:00"),
    },
    {
      id: 9,
      text: "Read chapter 5 for book club.",
      date: new Date("Mar 21 2024 11:00:00"),
    },
    {
      id: 10,
      text: "Research new teaching methods.",
      date: new Date("Mar 21 2024 14:45:00"),
    },
    {
      id: 11,
      text: "Pay electricity bill.",
      date: new Date("Mar 22 2024 08:00:00"),
    },
    {
      id: 12,
      text: "Review web development concepts.",
      date: new Date("Mar 22 2024 16:00:00"),
    },
    {
      id: 13,
      text: "Organize classroom materials.",
      date: new Date("Mar 23 2024 10:30:00"),
    },
    {
      id: 14,
      text: "Plan weekend outing with friends.",
      date: new Date("Mar 23 2024 18:00:00"),
    },
    {
      id: 15,
      text: "Prepare presentation slides.",
      date: new Date("Mar 24 2024 09:00:00"),
    },
    {
      id: 16,
      text: "Practice guitar for upcoming gig.",
      date: new Date("Mar 24 2024 17:00:00"),
    },
    {
      id: 17,
      text: "Write article for educational blog.",
      date: new Date("Mar 25 2024 11:30:00"),
    },
    {
      id: 18,
      text: "Attend online workshop on machine learning.",
      date: new Date("Mar 25 2024 15:00:00"),
    },
    {
      id: 19,
      text: "Catch up on emails.",
      date: new Date("Mar 26 2024 09:30:00"),
    },
    {
      id: 20,
      text: "Practice mindfulness meditation.",
      date: new Date("Mar 26 2024 19:00:00"),
    },
  ];
  

const Notes = () => {
  return (
    <Container>
      <div className="m-2" />
      <div className="notes-list">
        {notes.map(note => <Note key={note.id} note={note}/>)}
      </div>
    </Container>
  );
};

export default Notes;
