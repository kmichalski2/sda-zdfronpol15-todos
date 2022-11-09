import { Timestamp, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const initAddTaskForm = (tasksCollection, userId, storage) => {
  const addTaskForm = document.querySelector("#addTaskForm");

  if (addTaskForm) {
    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(addTaskForm);

      const deadlineDate = new Date(formData.get("deadline"));
      const deadlineTimestamp = Timestamp.fromDate(deadlineDate);
      const file = formData.get("attachment");

      if (file && file.size > 0) {
        const fileRef = ref(storage, "attachments/" + file.name);

        uploadBytes(fileRef, file).then((result) => {
          getDownloadURL(result.ref).then((url) => {
            addDoc(tasksCollection, {
              title: formData.get("title"),
              deadline: deadlineTimestamp,
              done: false,
              order: +formData.get("order"),
              userId: userId,
              attachment: url,
              attachmentPath: result.ref.fullPath,
            }).then((result) => {
              console.log("Zadanie zostało dodane do firestore");
              console.log(result);
            });
          });
        });
      }
    });
  }
};
