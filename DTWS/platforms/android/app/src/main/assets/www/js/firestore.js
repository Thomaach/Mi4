//(function()){

/*
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCW6QZyEmMqh00tkWhUZNOH_McRSh0qjZ4",
    authDomain: "ytgameguide-44902.firebaseapp.com",
    databaseURL: "https://ytgameguide-44902.firebaseio.com",
    projectId: "ytgameguide-44902",
    storageBucket: "ytgameguide-44902.appspot.com",
    messagingSenderId: "175073065993",
    appId: "1:175073065993:web:3df0f4206ac2303b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// Database aanspreekbaar maken
var firestore = firebase.firestore();

*/
// Referentie naar database collection maken
var gameRef = firestore.collection("Game");
//Random getal genereren met als grootste het aantal vragen in Firebase Collection

//varibale user maken
var user;

//checken of use is ingelogd
auth.onAuthStateChanged(function (currentUser) {
  if (currentUser) {
    console.log("logged in");
    user = currentUser;
  } else {
    window.location.href = '../index.html'
    console.log("not logged in");
  }
});

var getoondeVragen = [];
var score = 0;
var vraagNummer = 0;

//Methode voor gegegevens op te halen wordt opgeroepen
haalGegevensOp();

function maakRandomGetal() {
    randomGetal = "";
    randomGetal = (Math.floor((Math.random() * 6) + 1)).toString();
    //Random getal tonen mag later weg
    console.log(randomGetal);
}

//Variabele voor correct antwoord in te steken tonen
var antwoordc = "";

//Ophalen van vlognummer dat overeenkomt met het random gegenereerde getal
//Indien het Type MCSA is worden de radaiobuttons gerenderd en alle nodige gegevens worden erin gestoken
function haalGegevensOp() {
    maakRandomGetal();
    console.log(getoondeVragen);
    if (getoondeVragen.includes(randomGetal) == false && getoondeVragen.length <= 6) {
        gameRef.where("Volgnummer", "==", randomGetal.toString())
            .get()
            .then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let aantalAntwoorden = (doc.id, " => ", doc.data().aantalAntwoorden);

                    getoondeVragen.push(randomGetal);
                    if (doc.data().Type == "MCSA") {
                        renderRadiobuttons(doc, aantalAntwoorden);
                    } else if (doc.data().Type == "MCMA") {
                        renderCheckboxes(doc, aantalAntwoorden);
                    } else if (doc.data().Type == "SAPQ") {
                        renderPictureQuestion(doc, aantalAntwoorden);
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    } else {
        maakRandomGetal();
        haalGegevensOp();
    }
}


//RADIOBUTTONS
//Radio Buttons opvullen met antwoorden van de database
function renderRadiobuttons(doc, aantalAntwoorden) {
    vraagNummer++;
    document.getElementById("vraagNummer").innerText = ("Vraag " + vraagNummer).toString();
    document.getElementById("controleRadioButton").style.display = "block";
    //console.log(aantalAntwoorden)
    document.getElementById("vraag").innerText = doc.data().Vraag;
    for (i = 0; i < aantalAntwoorden; i++) {
        let labelNummer = ("labelRadio" + i).toString();
        document.getElementById(labelNummer).style.display = "block";

        //Antwoord in html is verander naar een GROTE A PLS LEES DIT STRAKS
        let antwoordNummer = ("AntwoordRadio" + i).toString();

        //console.log(doc.data().Antwoorden[i]);
        document.getElementById(antwoordNummer).innerText = doc.data().Antwoorden[i];
    }
    antwoordc = doc.data().Correct;
}

//Controle van gekozen radiobutton met correct antwoord
controleRadioButton.addEventListener("click", function () {
    for (i = 0; i < document.quiz.group1.length; i++) {
        var radioString = "radio" + i;
        var spanAntwoord = "AntwoordRadio" + i;
        if (document.getElementById(radioString).checked) {
            var gekozenantwoord = document.getElementById(spanAntwoord).innerText;
            if (gekozenantwoord == antwoordc) {
                console.log("correct");
                score++;
                document.getElementById("scoreShow").innerText = ("Score: " + score).toString();
                //console.log("Score: " + score);
            } else {
                console.log("fout");
            }
        }
    }
    antwoordc = "";
    clearVraag();
    clearRadioButtons();
})

function clearRadioButtons() {
    document.getElementById("controleRadioButton").style.display = "none";
    for (i = 0; i < document.quiz.group1.length; i++) {
        var radioString = "radio" + i;
        var radioLabelString = ("labelRadio" + i).toString();
        let antwoordNummer = ("AntwoordRadio" + i).toString();
        document.getElementById(radioString).checked = false;
        document.getElementById(radioLabelString).style.display = "none";
        document.getElementById(antwoordNummer).innerText = "";
    }
    if (getoondeVragen.length >= 6) {
       window.location.href = "../Pages/end.html"
    } else {
        randomGetal = "";
        maakRandomGetal()
        haalGegevensOp();
    }
}


//CHECKBOXES
//Checkboxes opvullen met antwoorden van de database
function renderCheckboxes(doc, aantalAntwoorden) {
    vraagNummer++;
    document.getElementById("vraagNummer").innerText = ("Vraag " + vraagNummer).toString();
    document.getElementById("controleCheckButton").style.display = "block";
    //console.log(aantalAntwoorden)
    document.getElementById("vraag").innerText = doc.data().Vraag;
    for (i = 0; i < aantalAntwoorden; i++) {
        let labelNummer = ("labelCheck" + i).toString();
        document.getElementById(labelNummer).style.display = "block";

        //Antwoord in html is verander naar een GROTE A PLS LEES DIT STRAKS
        let antwoordNummer = ("AntwoordCheck" + i).toString();

        //console.log(doc.data().Antwoorden[i]);
        document.getElementById(antwoordNummer).innerText = doc.data().Antwoorden[i];
    }
    antwoordc = doc.data().Correct;

}

controleCheckButton.addEventListener("click", function () {
    var gekozenantwoord = [];
    for (i = 0; i < document.quiz.group2.length; i++) {
        var checkString = "check" + i;
        var spanAntwoord = "AntwoordCheck" + i;
        if (document.getElementById(checkString).checked === true) {
            gekozenantwoord[i] = document.getElementById(spanAntwoord).innerText;
            console.log(gekozenantwoord);
        }
    }
    var filteredGekozenAntwoord = gekozenantwoord.filter(function (el) {
        return el != null;
    });
    console.log(filteredGekozenAntwoord)
    console.log(antwoordc);


    if (JSON.stringify(filteredGekozenAntwoord) === JSON.stringify(antwoordc)) {
        console.log("correct");
        score++;
        document.getElementById("scoreShow").innerText = ("Score: " + score).toString();
        //console.log("Score: " + score);
    } else {
        console.log("fout");
    }

    antwoordc = "";
    clearVraag();
    clearCheckboxButtons();
})

function clearCheckboxButtons() {
    document.getElementById("controleCheckButton").style.display = "none";
    for (i = 0; i < document.quiz.group2.length; i++) {
        var checkString = "check" + i;
        let labelNummer = ("labelCheck" + i).toString();
        var spanAntwoord = "AntwoordCheck" + i;
        document.getElementById(checkString).checked = false;
        document.getElementById(labelNummer).style.display = "none";
        document.getElementById(spanAntwoord).innerText = "";
    }
    if (getoondeVragen.length >= 6) {
       window.location.href = "../Pages/end.html"
    } else {
        randomGetal = "";
        maakRandomGetal();
        haalGegevensOp();
    }
}


function clearVraag() {
    document.getElementById("vraag").innerText = "";
}


//PICTURE QUESTIONS
function renderPictureQuestion(doc, aantalAntwoorden) {
    vraagNummer++;
    document.getElementById("vraagNummer").innerText = ("Vraag " + vraagNummer).toString();
    document.getElementById("pictureVragen").style.display = "block";
    for (i = 0; i < 4; i++) {
        var fotoID = ("foto" + i).toString();
        document.getElementById(fotoID).src = doc.data().Foto[i]
    }

    for (j = 0; j < 16; j++) {
        var pictureButtonID = ("pictureButton" + j).toString();
        document.getElementById(pictureButtonID).value = doc.data().Antwoorden[j]
    }

    antwoordc = doc.data().Correct;
    addButtonListeners();
}

function addButtonListeners() {
    var pictureButts = document.querySelectorAll('.pictureButton');
    for (a = 0; a < pictureButts.length; a++) {
        pictureButts[a].addEventListener('click', function () {
            console.log(this.value);
            document.getElementById("inputTextPictures").value += this.value;
            this.disabled = true;
            this.style.backgroundColor = "#fdecc0";
        });
    }
}

clearInsertButtonText.addEventListener("click", function () {
    var pictureButts = document.querySelectorAll('.pictureButton');
    document.getElementById("inputTextPictures").value = "";

    for (a = 0; a < pictureButts.length; a++) {
        var unDisablePictureButton = ("pictureButton" + a).toString();
        document.getElementById(unDisablePictureButton).disabled = false;
        document.getElementById(unDisablePictureButton).style.backgroundColor = "#fbc02d";
    }
})

controlePictureButton.addEventListener("click", function () {
    if (antwoordc == document.getElementById("inputTextPictures").value) {
        console.log("Correct");
        score++;
        document.getElementById("scoreShow").innerText = ("Score: " + score).toString();
        //console.log("Score: " + score);
    } else {
        console.log("Fout");
    }
    antwoordc = "";
    clearPictureVraag();
})

function clearPictureVraag() {
    for (i = 0; i < 4; i++) {
        var fotoID = ("foto" + i).toString();
        document.getElementById(fotoID).src = "";
    }
    for (j = 0; j < 16; j++) {
        var pictureButtonID = ("pictureButton" + j).toString();
        document.getElementById(pictureButtonID).value = "";
    }
    document.getElementById("inputTextPictures").value = "";
    document.getElementById("pictureVragen").style.display = "none";

    if (getoondeVragen.length >= 6) {
        window.location.href = "../Pages/end.html"
    } else {
        randomGetal = "";
        maakRandomGetal();
        haalGegevensOp();
    }
}

spelNaarMenu.addEventListener("click", function () {
    if(confirm("Als je het spel verlaat verlies je de huidige score.\nWeet je zeker dat je het spel wilt verlaten?")){
        window.location.href = "../Pages/MainMenu.html"
        //Huidige score zetten op nul
    }
    else{
        
    }
})

//Save Data to Firebase
/*
saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
        hotDogStatus: textToSave
    }).then(function () {
        console.log("Status saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});


loadButton.addEventListener("click", function () {
    docRef.get().then(function (doc) { //get document snapshot
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});*/

//checkIfEmpty();

/*
function checkIfEmpty() {
    if (pEmpty == "") {
        getDataQuestion();
    }

    if (radioEmpty = true) {
        getDataAnswers();
    }
}

function getDataQuestion() {
    gameRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            vraag.innerText = myData.Vraag;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}


*/
