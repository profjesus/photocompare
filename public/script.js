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
    return;
}