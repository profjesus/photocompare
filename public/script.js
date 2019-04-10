getUsers();

$('#user').change(function() {
    getImagesForUser($(this).val());
});

function getUsers() {
    $.get("http://localhost:8080/users/", function (data) {
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
    $("#imageleft").append('<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="original"><img src="/photos/' + user + '/original" width="100%"/></button>');
    $("#imageright").append('<button type="button" data-toggle="modal" data-target="#resultModal" class="btn" id="edited"><img src="/photos/' + user + '/edited" width="100%"/></button>');
    $('#original').click(function() {
        $('#resultModalLabel').append("Oooops!");
        $('#resultModalBody').append("You chose poorly");
    });
    $('#edited').click(function() {
        $('#resultModalLabel').append("Great!");
        $('#resultModalBody').append("That was indeed the edited image");
    });
    $("#images").show();
}