import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import styles from "./Home.module.css";
import Loading from "./../Loading/Loading";
import Note from "../Note/Note";
import { useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { getUserNotes } from "../../utils/Note";

export default function Home() {
  const { notes, setNotes } = useContext(NoteContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    getUserNotes({ token, updater: setNotes });
  }, []);

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>
      {notes === null ? (
        <Loading />
      ) : notes.length === 0 ? (
        <h2>No Notes Found , Create Your 1st </h2>
      ) : (
        <div className={`row gap-y-3 gap-x-0`}>
          {notes.map((note) => (
            <Note noteData={note} key={note._id} />
          ))}
        </div>
      )}
    </>
  );
}
