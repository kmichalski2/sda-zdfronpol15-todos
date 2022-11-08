import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";

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

export const displayUserName = (userName) => {
  const userNameElement = document.querySelector("#userName");

  if (userNameElement) {
    userNameElement.innerHTML = userName;
  }
};

export const initSignWithGoogle = (auth) => {
  const button = document.querySelector("#signInWithGoogle");

  if (button) {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        location.href = location.origin;
      });
    });
  }
};
