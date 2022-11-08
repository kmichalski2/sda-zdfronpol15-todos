import { updateDoc, Timestamp, doc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { renderTaskList } from "./list";

export const initEditTaskForm = (database, storage) => {
  const editTaskForm = document.querySelector("#editTaskForm");
  const tasksCollection = collection(database, "tasks");

  if (editTaskForm) {
    editTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(editTaskForm);

      const deadline = formData.get("deadline");
      const deadlineDate = new Date(deadline);
      const deadlineTimestamp = Timestamp.fromDate(deadlineDate);

      const docRef = doc(database, "tasks", formData.get("id"));
      const modalRef = new bootstrap.Modal("#editTaskModal");
      const file = formData.get("attachment");

      if (file && file.size > 0) {
        const fileRef = ref(storage, "attachments/" + file.name);

        uploadBytes(fileRef, file).then((result) => {
          getDownloadURL(result.ref).then((url) => {
            updateTask(
              docRef,
              formData.get("title"),
              deadlineTimestamp,
              +formData.get("order"),
              url,
              modalRef
            );
          });
        });
      } else {
        updateTask(
          docRef,
          formData.get("title"),
          deadlineTimestamp,
          +formData.get("order"),
          null,
          modalRef
        );
      }
    });
  }
};

const updateTask = (
  docRef,
  title,
  deadline,
  order,
  attachmentUrl,
  modalRef
) => {
  updateDoc(docRef, {
    title: title,
    deadline: deadline,
    order: order,
    attachment: attachmentUrl ? attachmentUrl : null,
  }).then((result) => {
    console.log("Zaktualizowano zadanie");

    modalRef.hide();
  });
};
