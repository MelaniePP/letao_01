$(function(){

  var currentPage = 1;
  var size = 5;
  render();
  function render(){

    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:size
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        $("tbody").html(template("tmp",info));
        // 分页标签初始化
        
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          page:1,
          pageSize:5,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }


})