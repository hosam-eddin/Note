import { showDeleteModal, showModalUpdate } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "./../../Context/UserContext";
import { useContext } from "react";
import { NoteContext } from "./../../Context/NoteContext";

export default function Note({ noteData }) {
  const { token } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);

  return (
    <div className="p-2  p-0 col-md-6 col-sm-12 col-lg-4">
      <div className={`${style.note} note shadow `} key={noteData._id}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat text-break ">
            {noteData.title}
          </h2>
          <p className={`mb-0 content mt-2 text-break`}>{noteData.content}</p>
        </div>

        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() =>
              showModalUpdate({
                prevTitle: noteData.title,
                prevContent: noteData.content,
                token,
                noteId: noteData._id,
                updater: setNotes,
              })
            }
          ></i>

          <i
            className="bi bi-archive-fill pointer"
            onClick={() =>
              showDeleteModal({
                token,
                noteId: noteData._id,
                updater: setNotes,
              })
            }
          ></i>
        </div>
      </div>
    </div>
  );
}
