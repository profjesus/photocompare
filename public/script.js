getUsers();

var timerDisplay = document.querySelector('#crono');
var startTime, tInterval, seconds;
var first = true;
var currentUser;

$('#user').change(function() {
    currentUser = $(this).val();
    getImagesForUser(currentUser);
});

function getUsers() {
    $.get("/users/", function (data) {
        if (data) {
            for (var i=0; i<data.length; i++) {
                $("#user").append('<option value="' + data[i] + '">' + data[i] + '</option>');
            }
        } else {
            $("#user").append('<option value="">Non hai usuarios</option>');
        }
    });
}

function getImagesForUser(user) {
    var htmlOriginalImg = '<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="original"><img src="/photos/'
    htmlOriginalImg += user + '/original';
    htmlOriginalImg += first ? '1' : '2';
    htmlOriginalImg += '" width="100%"/></button>';
    var htmlEditedImg = '<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="edited"><img src="/photos/'
    htmlEditedImg += user + '/edited';
    htmlEditedImg += first ? '1' : '2';
    htmlEditedImg += '" width="100%"/></button>';
    if (Math.random() >= 0.5) {
        $("#imageleft").html(htmlOriginalImg);
        $("#imageright").html(htmlEditedImg);
    } else {
        $("#imageleft").html(htmlEditedImg);
        $("#imageright").html(htmlOriginalImg);
    }
    $('#original').click(function() {
        $('#resultModalLabel').html("Vaia!");
        $('#resultModalBody').html("Escolliches a imaxe orixinal, non a editada");
        clearInterval(tInterval); // Stop timer
    });
    $('#edited').click(function() {
        $('#resultModalLabel').html("Xenial!");
        $('#resultModalBody').html("Esa era a imaxe editada. Levoute <strong>" + seconds + "</strong> segundos descubrila");
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
    first = !first;
    if (!first) {
        getImagesForUser(currentUser);
    } else {
        $("#images").hide();
    }    
});