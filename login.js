import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const initLoginForm = (auth) => {
  const loginForm = document.querySelector("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);

      signInWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      )
        .then((user) => {
          window.location.href = window.location.origin;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};

export const initSignOut = (auth) => {
  const signOutButton = document.querySelector("#signOut");

  if (signOutButton) {
    signOutButton.addEventListener("click", (event) => {
      event.preventDefault();

      signOut(auth).then((result) => {
        console.log("Pomyślne wylogowano");
      });
    });
  }
};
