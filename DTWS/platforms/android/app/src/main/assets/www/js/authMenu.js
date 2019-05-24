//varibale user maken
var user;

//checken of use is ingelogd
auth.onAuthStateChanged(function (currentUser) {
  if (currentUser) {
    console.log("logged in");
    user = currentUser;
    addUser();
  } else {
    window.location.href = '../index.html'
    console.log("not logged in");
  }
});

function addUser() {
  var UserRef = db.collection("Users");
  var query = UserRef.where("UserID", "==", user.uid)
  var count = 0;
  query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function () {
      count++;
      console.log(count);
    });
    if (count == 0) {
      db.collection('Users').add({
        UserID: user.uid,
        Email: user.email
      });
      console.log("user added");
    }
  });
}


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