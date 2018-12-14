// Firebase Settings
  var config = {
    apiKey: "AIzaSyDHllXHQGNLNwC4NB8QijMSlNrV3sp_4yo",
    authDomain: "trainscheduler-f404a.firebaseapp.com",
    databaseURL: "https://trainscheduler-f404a.firebaseio.com",
    projectId: "trainscheduler-f404a",
    storageBucket: "trainscheduler-f404a.appspot.com",
    messagingSenderId: "973777506341"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#trainadd').on("click", function (event) {
    event.preventDefault();

    var addTrain = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: addTrain,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    };

    database.ref().push(newTrain);

    alert("Train was successfully added!");

    // Clear Values
    $('#trainName').val("");
    $('#destination').val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    
    var addTrain = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    var timeArray= firstTime.split(":")
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var nextTrain = moment().diff(trainTime, "minutes");
    var minutesAway = nextTrain % frequency;
    var timeToNextTrain = frequency - minutesAway;
    var nextArrival = moment().add(timeToNextTrain, "minutes")

    var newRow = $("<tr>").append(
        $("<td>").text(addTrain),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(timeToNextTrain)
        
    );
    $("#insert-schedule > tbody").append(newRow);
});