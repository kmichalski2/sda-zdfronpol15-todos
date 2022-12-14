import { createUserWithEmailAndPassword } from "firebase/auth";

export const initRegisterForm = (auth) => {
  const registerForm = document.querySelector("#registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);

      createUserWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      )
        .then((result) => {
          window.location.href = window.location.origin;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};
