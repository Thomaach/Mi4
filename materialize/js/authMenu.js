//varibale user maken
var user;

//checken of use is ingelogd
auth.onAuthStateChanged(function(currentUser) {
  if (currentUser) {
    console.log("logged in");
    user = currentUser;
  } else {
      window.location.href = '../index.html'
      console.log("not logged in");
  }
});

//user info weergeven
const profile = document.querySelector('#profile');
profile.addEventListener('click', (e) => {
  e.preventDefault();
  //M.toast();
  alert("id:" + user.uid + "\n" + "email: " + user.email);
})


//user uitloggen
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = '../index.html'
});

