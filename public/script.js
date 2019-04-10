getUsers();

var timerDisplay = document.querySelector('#crono');
var startTime, tInterval, seconds;

$('#user').change(function() {
    getImagesForUser($(this).val());
});

function getUsers() {
    $.get("/users/", function (data) {
        if (data) {
            for (var i=0; i<data.length; i++) {
                $("#user").append('<option value="' + data[i] + '">' + data[i] + '</option>');
            }
        } else {
            $("#user").append('<option value="">No users</option>');
        }
    });
}

function getImagesForUser(user) {
    $("#imageleft").html('<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="original"><img src="/photos/' + user + '/original" width="100%"/></button>');
    $("#imageright").html('<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="edited"><img src="/photos/' + user + '/edited" width="100%"/></button>');
    $('#original').click(function() {
        $('#resultModalLabel').html("Oooops!");
        $('#resultModalBody').html("You chose poorly");
        clearInterval(tInterval); // Stop timer
    });
    $('#edited').click(function() {
        $('#resultModalLabel').html("Great!");
        $('#resultModalBody').html("That was indeed the edited image. It took you <strong>" + seconds + "</strong> seconds to find out");
        clearInterval(tInterval); // Stop timer
    });
    $("#images").show();
    startTime = new Date().getTime();
    printTime();
    tInterval = setInterval(printTime, 1000);
}

// Showing timer
function printTime(){
    var updatedTime = new Date().getTime();
    var difference =  updatedTime - startTime;
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    timerDisplay.innerHTML = seconds;
}

$('#resultModalClose').click(function() {
    $("#images").hide();
});