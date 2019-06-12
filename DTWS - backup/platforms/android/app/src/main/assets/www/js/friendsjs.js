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
const FriendRequesthtml = document.querySelector('#friendsRequests');


auth.onAuthStateChanged(function (currentUser) {
    if (currentUser) {
        console.log("logged in");
        console.log(currentUser.uid);
        user = currentUser;
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: currentUser.uid,
            width : 100,
            height : 100
        });
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
        Status: "0"
    });

}

//show toast of friend request sent after closing the modal
function toast() {
    M.toast({
        html: 'Friend request sent!!'
    });
}

//add friends when opening modal
btnOpenFriends.addEventListener('click', (e) => {
    QueryFriendsYourSender();
    QueryFriendsYourReceiver();
    
})


function QueryFriendsYourSender(){

    // db.collection('Friends').get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.data());
    //     })
    // })

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

                    var html3 = "<div style=\"border: 1px solid; border-radius: 5px;\">id: " + doc.data().ReceiverID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><br></div><br>";
                    accountFriends.innerHTML += html3;
                });
            })

        });
    })

    accountFriends.innerHTML = html;
}


function QueryFriendsYourReceiver() {
    // Create a reference to the Friends collection
    var friendsRef = db.collection("Friends");
    var userRef = db.collection("Users");
    var html = "<div>Logged in as " + user.email + "</div><br>";

    var query2 = friendsRef.where("Status", "==", "1").where("ReceiverID", "==", user.uid)

    query2.get().then(function (querySnapshot2) {
        //console.log(querySnapshot2.);
        querySnapshot2.forEach(function (doc2) {

            console.log(doc2.id, ' => ', doc2.data().SenderID);

            var queryEmail = userRef.where("UserID", "==", doc2.data().SenderID);

            queryEmail.get().then(function (snapshot) {
                snapshot.forEach(function (snap) {
                    console.log(snap.data().Email)

                    var html3 = "<div style=\"border: 1px solid; border-radius: 5px;\">id: " + doc2.data().SenderID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><br></div><br>";
                    accountFriends.innerHTML += html3;
                });
            })

        });
    })

    accountFriends.innerHTML = html;
}







var firendid = [];

btnOpenFriendRequests.addEventListener('click', (e) => {
    GetFriendRequests();
})

function GetFriendRequests() {
     // Create a reference to the Friends collection
     var friendsReQ = db.collection("Friends");
     var userReQ = db.collection("Users");
 
 
     // Create a query against the collection.
     var query = friendsReQ.where("Status", "==", "0")//.where("ReceiverID", "==", user.uid);
 
     //var html2 = "";
     query.get().then(function (querySnapshot) {
         querySnapshot.forEach(function (doc) {
 
             console.log(doc.id, ' => ', doc.data().SenderID);
 
             var queryEmail = userReQ.where("UserID", "==", doc.data().SenderID);
             queryEmail.get().then(function (snapshot) {
                 snapshot.forEach(function (snap) {
                     console.log(snap.data().Email)
                     firendid.push(doc.id);
                     var number = firendid.indexOf(doc.id);
                     var html = "<div style=\"border: 1px solid; border-radius: 5px;\">id: " + doc.data().SenderID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><button onClick=\"AcceptFriend(" + number + ")\" id=\"" + doc.data().SenderID.toString() + "\"class=\"btn green darken-2 z-depth-0\">accept</button>" + "<br><button onClick=\"DeclineFriend(" + number + ")\" id=\"" + doc.data().SenderID.toString() + "\"class=\"btn red darken-2 z-depth-0\" style=\"margin-top:2px;\">Decline</button><br><br></div><br>";
                     //"<div style=\"border: 1px solid; border-radius: 5px;\">id: " + doc.data().SenderID.toString() + "<br>email: " + snap.data().Email.toString() + "<br><button onClick=\"AcceptFriend(" + number + ")\" id=\"" + doc.data().SenderID.toString() + "\"class=\"btn green darken-2 z-depth-0\">accept</button>" + "<br><button onClick=\"DeclineFriend(" + number + ")\" id=\"" + doc.data().SenderID.toString() + "\"class=\"btn red darken-2 z-depth-0\" style=\"margin-top:2px;\">Decline</button><br><br></div><br>";  
                     FriendRequesthtml.innerHTML += html;
                 })
             })
         });
     })
}

function AcceptFriend(number) {
    console.log("accept: " + firendid[number]);

    // updating records 
    db.collection('Friends').doc(firendid[number]).update({
        Status: "1"
    });


    const modal = document.querySelector('#modal-friendrequest');
    M.Modal.getInstance(modal).close();

    firendid = [];
    //FriendRequesthtml.innerHTML = "";
}

function DeclineFriend(number) {
    console.log("decline: " + firendid[number]);

    // updating records 
    db.collection('Friends').doc(firendid[number]).update({
        Status: "-1"
    });

    const modal = document.querySelector('#modal-friendrequest');
    M.Modal.getInstance(modal).close();

    firendid = [];
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
    FriendRequesthtml.innerHTML = "";
})



//open modal
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});






