import axios from "axios";
import Swal from "sweetalert2";

// ^ show Modal [title , content]
export const showModal = ({ token, updater }) => {
  Swal.fire({
    title: "Add Note",
    html: `
        <input id="title" type="text" placeholder="Enter a title" class=" form-control mb-3" >
        <textarea id="content" type="text" placeholder="Enter a description" class=" form-control" ></textarea >
      `,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,

    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result.value);
    sendDataToApi({
      title: result.value.title,
      content: result.value.content,
      token,
      updater,
    });
  });
};

// % send data from inputs to api
async function sendDataToApi({ title, content, token, updater }) {
  const { data } = await axios.post(
    `https://note-sigma-black.vercel.app/api/v1/notes`,
    { title, content },
    {
      headers: {
        token,
      },
    }
  );
  console.log(data);
  if (data.msg === "done") {
    getUserNotes({ token, updater });
  }
}

// # show Notes after addition
export async function getUserNotes({ token, updater }) {
  try {
    const { data } = await axios.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        headers: {
          token,
        },
      }
    );
    //// setNotes(data.notes) to show in the UI
    updater(data.notes);
    // localStorage.setItem("notes", `${data.notes}`);
    console.log(data.notes);
  } catch (error) {
    updater([]);
  }
}

//! Delete by Id:
//// show toast
export const showDeleteModal = ({ token, noteId, updater }) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sendDataToDelete({ token, noteId, updater });
    }
  });
};
//// semd data to delete
const sendDataToDelete = async ({ token, noteId, updater }) => {
  const { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
    {
      headers: {
        token,
      },
    }
  );
  console.log(data);

  //// getAllnotes()
  getUserNotes({ token, updater });
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success",
  });
};

// @ update
//// show update modal [filled with note data]
export const showModalUpdate = ({
  prevTitle,
  prevContent,
  token,
  noteId,
  updater,
}) => {
  Swal.fire({
    title: "Update Note",
    html: `
        <input id="title" type="text" placeholder="Enter a title" class=" form-control mb-3" value="${prevTitle}">
        <textarea id="content" type="text" placeholder="Enter a description" class=" form-control">${prevContent}</textarea >
      `,
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,

    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    sendDataToupdate({
      token,
      noteId,
      updater,
      title: result.value?.title,
      content: result.value?.content,
    });
    console.log(result.value);
  });
};

////send new title and content
const sendDataToupdate = async ({ token, noteId, updater, title, content }) => {
  const { data } = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
    { title, content },
    {
      headers: {
        token,
      },
    }
  );
  console.log(data);

  ////get notes after update
  getUserNotes({ token, updater });
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success",
  });
};
