/**
 * Created by qqy on 15/12/17.
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
    var height = avatar.css("width");
    avatar.css("height", height);
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
