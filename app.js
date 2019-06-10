// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCLf9H9syuA31lOnGi2cIAH7Jj13NxCntc",
    authDomain: "trainschedule-b1303.firebaseapp.com",
    databaseURL: "https://trainschedule-b1303.firebaseio.com",
    projectId: "trainschedule-b1303",
    storageBucket: "trainschedule-b1303.appspot.com",
    messagingSenderId: "447769556284",
    appId: "1:447769556284:web:8f2cc2f30b234b2f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database();

//initial values

var trainName = "";
var destination = "";
var frecuency = 0;
var nextArrival = 0;
var minAway = 0;
var firstTrainTime = 0;


// capture information on button click

$("#add-train").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#InputTrainName").val().trim();
    var destination = $("#InputDestination").val().trim();
    var firstTrainTime = $("#InputFirstTrainTime").val().trim();
    var frecuency = $("#InputFrecuency").val().trim();
    // var nextTrainArrival=
    // var minAway = 




    // code to push to firebase database

    dataRef.ref().push({

        trainName: trainName,
        destination: destination,
        frecuency: frecuency,
        firstTrainTime: firstTrainTime
        // NextArrival: nextTrainArrival,
        // MinutesAway: minAway,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    alert("Train successfully added");
});

//Adds a train to the database and rows into the html
//Current time
var currentTime = new Date()
nextArrival = currentTime - firstTrainTime


dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frecuency);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().nextTrainArrival);

    // Store everything into a variable
    $("#DisplayTrainName").append("<div class='well'><span>" + childSnapshot.val().trainName + "</span></div>")
    $("#DisplayDestination").append("<div class='well'><span>" + childSnapshot.val().destination + "</span></div>")
    $("#DisplayFrecuency").append("<div class='well'><span>" + childSnapshot.val().frecuency + "</span></div>")
    $("#DisplayNextArrival").append("<div class='well'><span>" + childSnapshot.val().nextTrainArrival + "</span></div>")
    $("#DisplayMinsAway").append("<div class='well'><span>" + childSnapshot.val().minAway + "</span></div>")


    var frecuency;
    var firstTrainTime;
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);






    //difference between the times
    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("diference in time" + differenceTime)
    //time apart
    // var tRemainer = differenceTime % frecuency;
    // console.log(tRemainer);
    //minute until train
    // var tMinUntilTrain = frecuency - tRemainer;
    // console.log ("min until train arrive" + tMinUntilTrain);
    //next train
    // var nextTrain = moment().add(tMinUntilTrain, "minutes")
    // Handle the errors

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    // $("#DisplayTrainName").text(snapshot.val().trainName);
    // $("#DisplayDestination").text(snapshot.val().destination);
    // $("#DisplayFrecuency").text(snapshot.val().frecuency);
    // $("#DisplayNextArrival").text(snapshot.val().nextArrival);
    // $("#DisplayMinsAway").text(snapshot.val().minAway);
});
