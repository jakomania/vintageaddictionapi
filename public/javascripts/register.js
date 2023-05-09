const form = document.getElementById('reg_form');

function getAvatar(id)
{
    const avatars = document.getElementsByName("avatars");

    avatars.forEach( avatar =>
        {
            avatar.classList.remove('selected');
            avatar.classList.add('unselected');
        }

    );

    var element = document.getElementById(id);

    element.classList.remove('unselected');
    element.classList.add("selected");


    form.elements['avatar'].value = element.src;

}

$("button").on("touchsart mousedown", function () {
    $(this).addClass("clicked");
});

$("button").on("touchend mouseup", function () {
    $(this).removeClass("clicked");
    $(this).blur();
});