$(function () {

  var currentPage = 1;
  var size = 5;
  render();
  function render() {

    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: size
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        $("tbody").html(template("tmp", info));
        // 分页标签初始化

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
// 为操作按钮绑定事件，需要事件委托
  $(".lt_main tbody").on("click", ".btn", function () {
    $("#usermodal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(id, isDelete);
    $("#confirmBtn").click(function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: "json",
        success: function (info) {
          // console.log(info);
          if (info.success) {
            $("#usermodal").modal("hide");
            render();
          }
        }
      })
    })
  })


  
})
