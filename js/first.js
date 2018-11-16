$(function(){
  var currentPage = 1;
  var size = 5;
  render();
  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:size
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $("tbody").html(template("firstTmp",info));
        // 分页标签
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 添加分类模态框
  $(".add-btn").on("click",function(){
    $("#addmodal").modal("show");

  })

  // 表单校验
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }


    }
  })
  

  // 表单校验成功事件
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.success){
          $("#addmodal").modal("hide");
          currentPage = 1;
          render();

          // 重置表单
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
 
  

})