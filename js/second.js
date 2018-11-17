$(function () {
  var currentPage = 1;
  var size = 5;
  render();
  // 发送ajax请求，获取数据，渲染页面
  function render(){

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: size
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        $("tbody").html(template("secondTmp", info));
        // 分页标签
        $("#paginator").bootstrapPaginator({
      
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    });
  }

  // 显示添加分类模态框
  $(".add-btn").on("click",function(){
    $("#addCategory").modal("show");
  })


})