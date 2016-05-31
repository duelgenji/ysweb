/**
 * Created by cathleenzhang on 15/12/18.
 */

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

var id = GetQueryString("id");
if (id != null) {
    var id_ = decodeURIComponent(id);
}

$(document).ready(function () {
    var avatar = $("#avatar-content");
    var width = avatar.css("width");
    var height = avatar.css("height");
    avatar.css(width, height);
});

$.get(commonUrl + "greetingCard/getCard/" + id_, function (data) {
    if (data.ret_code === 0) {
        $("#wish").html(data.ret_values.description);
        $("#avatar").attr("src", data.ret_values.avatarUrl);
    }
});

$("#edit").on("touchstart", function () {
    location.href = "card-index.html";
});

$("#share").on("touchstart", function () {
    $('#myModal').modal('show');
});
