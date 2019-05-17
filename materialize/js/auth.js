const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    window.location.href = '../pages/MainMenu.html'
  });
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    window.location.href = '../pages/MainMenu.html'
  })
});


//varibale user maken
var user;

//checken of use is ingelogd
auth.onAuthStateChanged(function (currentUser) {
  if (currentUser) {
    console.log("logged in");
    user = currentUser;
    window.location.href = '../pages/MainMenu.html'
  }
})