//aanmaken variablen
var user;
const friendsCloseModal = document.querySelector('#CloseAddFriends');
const addFriendFrom = document.querySelector('#addfriend-form')

//var modal friends
const accountFriends = document.querySelector('.account-friends');
const btnFriends = document.querySelector('#btn-Friends');
const btnOpenFriends = document.querySelector('#Friends');
const btnOpenFriendRequests = document.querySelector('#FriendsRequest');
const btnSluitFriends = document.querySelector('#btn-FriendRequests');
const FriendRequesthtml = document.querySelector('.friendsRequests');


auth.onAuthStateChanged(function (currentUser) {
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
    M.toast({html: 'Friend request sent!!'});
}

//add friends when opening modal
btnOpenFriends.addEventListener('click', (e) => {

    // Create a reference to the Friends collection
    var friendsRef = db.collection("Friends");
    var userRef = db.collection("Users");
    var html = "<div>Logged in as " + user.email + "</div><br>";

    // Create a query against the collection.
    var query = friendsRef.where("Status", "==", "1").where("SenderID", "==", user.uid)


    query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data().ReceiverID);

            var queryEmail = userRef.where("UserID", "==", doc.data().ReceiverID);

            queryEmail.get().then(function (snapshot) {
                snapshot.forEach(function (snap) {
                    console.log(snap.data().Email)
                    var html2 = "<div>id: " + doc.data().ReceiverID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><br></div>";
                    accountFriends.innerHTML += html2;
                });
            })

        });
    }).then((e) => {
        console.log(html);
    })

    accountFriends.innerHTML = html;
})

var firendid = [];

btnOpenFriendRequests.addEventListener('click', (e) => {
    // Create a reference to the Friends collection
    var friendsRef = db.collection("Friends");
    var userRef = db.collection("Users");
    var html = "<div>Logged in as " + user.email + "</div><br>";

    // Create a query against the collection.
    var query = friendsRef.where("Status", "==", "0").where("ReceiverID", "==", user.uid)

    
    query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data().SenderID);

            var queryEmail = userRef.where("UserID", "==", doc.data().SenderID);

            queryEmail.get().then(function (snapshot) {
                snapshot.forEach(function (snap) {
                    console.log(snap.data().Email)
                    firendid.push(doc.data().SenderID.toString()); 
                    var number = firendid.indexOf(doc.data().SenderID.toString())
                    //console.log(number);
                    var html2 = "<div>id: " + doc.data().SenderID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><button onClick=\"AcceptFriend(" + number + ")\" id=\"" + doc.data().SenderID.toString() + "\"class=\"btn green darken-2 z-depth-5\">accept</button><br><br></div>";
                    FriendRequesthtml.innerHTML = html2;
                    

                });
            })

        });
    })

})

function AcceptFriend(number) {
    console.log(firendid[number]);
}

//close the friends modal 
btnFriends.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal-friends');
    M.Modal.getInstance(modal).close();
})


btnSluitFriends.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal-friendrequest');
    M.Modal.getInstance(modal).close();
})



//open modal
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});