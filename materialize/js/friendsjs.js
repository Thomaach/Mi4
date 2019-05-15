//aanmaken variablen
var user;
const friendsCloseModal = document.querySelector('#CloseAddFriends');
const addFriendFrom = document.querySelector('#addfriend-form')

//var modal friends
const accountFriends = document.querySelector('.account-friends');
const btnFriends = document.querySelector('#btn-Friends');
const btnOpenFriends = document.querySelector('#Friends');

auth.onAuthStateChanged(function(currentUser) {
  if (currentUser) {
    console.log("logged in");
    user = currentUser;
  } else {
      //window.location.href = '../index.html'
      console.log("not logged in");
  }
});

//close the addfriends modal
friendsCloseModal.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal-addfriend');
    SendFriendRequest();
    M.Modal.getInstance(modal).close();
    addFriendFrom.reset();
    toast();
})

//function to send the friend request and put it in the database
function SendFriendRequest() {
    const addFriendForm = document.querySelector('#addfriend-form');
    
    var receiverID = addFriendForm.UID.value;

    db.collection('Friends').add({
        ReceiverID: receiverID,
        SenderID: user.uid,
        Status: 0 
    });
    
}

//show toast of friend request sent after closing the modal
function toast() {
    alert('Friend request sent!');
}

//add friends when opening modal
btnOpenFriends.addEventListener('click', (e) => {

    var friendsRef = db.collection("Friends");

    //KOMT NOG NIKS DEFTIG UIT KIJK ER NAAR
    var query = friendsRef.where("Status", "==", 1);
    console.log(query);
    
    
    // var ref = firebase.database().ref("Friends");
    // ref.equalTo(user.uid).on("child_added", function(snapshot) {
    //     console.log(snapshot.value());
    //     //console.log(user.uid);
    // });

    const html = `<div>Logged in as ${user.email}</div>`;
    accountFriends.innerHTML = html;
})

//close the friends modal 
btnFriends.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal-friends');
    M.Modal.getInstance(modal).close();
})

//open modal
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
