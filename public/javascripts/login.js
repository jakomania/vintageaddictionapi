$("button").on("touchsart mousedown", function () {
    $(this).addClass("clicked");
});

$("button").on("touchend mouseup", function () {
    $(this).removeClass("clicked");
    $(this).blur();
});