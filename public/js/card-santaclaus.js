/**
 * Created by cathleenzhang on 15/12/17.
 */

// 初始化裁剪窗口
$("#clipArea").photoClip({
    width: 140,
    height: 96,
    file: "#file",
    view: "#hit",
    ok: "#clipBtn",
    outputType: "png",
    clipFinish: function (dataURL) {
        $('#hit').attr('src', dataURL);
        saveImageInfo();
    }
});

// 选择照片后的 onchange 事件
function clip() {
    $('#myModal').modal('show');
}

// 保存图片
function saveImageInfo() {
    var img_data = $('#hit').attr('src');
    if (img_data == "") {
        console.log('null');
    }

    // 渲染到页面
    render(img_data);

    // dataURL 的格式为 “data:image/png;base64,****”, 只取逗号之后的内容
    img_data = img_data.split(',')[1];

    var data = {
        "avatar": img_data
    };

    $.ajax({
        type: "POST",
        url: commonUrl + 'greetingCard/avatar',
        data: data,
        success: function (data) {
            if (data.ret_code === 0) {
                $("#upload-btn").css("z-index", "-1");
                $("#imgUrl").val(data.ret_values);
                $('#myModal').modal('hide');
            }
            else {
                $('#myModal').modal('hide');
                $('#my-message').text("上传失败");
                $('#textModal').modal('show');
            }
        },
        error: function () {
            $('#myModal').modal('hide');
            $('#my-message').text("上传失败");
            $('#textModal').modal('show');
        }
    });
}

// 渲染 Image 缩放尺寸
function render(src) {
    var MAX_HEIGHT = 96;//Image 缩放尺寸
    var MAX_WIDTH = 140;

    // 创建一个 Image 对象
    var image = new Image();

    // 绑定 load 事件处理器，加载完成后执行
    image.onload = function () {
        // 获取 canvas DOM 对象
        var canvas = document.getElementById("myCanvas");
        // 如果高度超标
        if (image.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image.width = MAX_WIDTH;
            image.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        var ctx = canvas.getContext("2d");
        // canvas清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;        // 重置canvas宽高
        canvas.height = image.height;
        // 将图像绘制到canvas上
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // !!! 注意，image 没有加入到 dom之中

        var dataurl = canvas.toDataURL("image/png");
        var imagedata = encodeURIComponent(dataurl);
        $('#plan2').attr('data-src', dataurl);
        $('#plan2').show();
    };
    // 设置src属性，浏览器会自动加载。
    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。
    image.src = src;
}

// 提交预览
$('#save').on('click', function () {
    var description = $('#description').val();
    var avatarUrl = $('#imgUrl').val();

    if (description.length === 0 || avatarUrl.length === 0) {
        $('#my-message').text("请填写完成哦~");
        $('#textModal').modal('show');
    } else if (description.length > 25) {
        $('#my-message').text("祝福语太长啦,不能超过24个字符哦~");
        $('#textModal').modal('show');
    } else {
        var data = {
            "title": "圣诞老人",
            "description": description,
            "avatarUrl": avatarUrl
        };
        $.ajax({
            type: 'POST',
            url: commonUrl + 'greetingCard/saveUser',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                if (data.ret_code === 0) {
                    location.href = "card-show-santaclaus.html?id=" + data.ret_values.id;
                }
                else {
                    $('#my-message').text("提交失败");
                    $('#textModal').modal('show');
                }
            },
            error: function () {
                $('#my-message').text("提交失败");
                $('#textModal').modal('show');
            }
        });
    }
});