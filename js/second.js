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
    // 获取下拉菜单数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $(".dropdown-menu").html(template("downTmp",info))
      }
    })
  })

  // 为下拉菜单注册电点击事件,事件委托
  $(".dropdown-menu").on("click","a",function(){
    // 获取value
    var txt = $(this).text();
    
    $(".text").text(txt);
    var id = $(this).data("id");
    console.log(txt,id);
    $('[name="categoryId"]').val(id);

    // 重置表单状态
    // 方法一
    // $('[name="categoryId"]').trigger("input");
    // 方法二
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")

  })

  // 文件初始化用fileupload插件
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data);
      var res = data.result;
      
      var url = res.picAddr;
      // console.log(url);
      $("#imgBox img").attr("src",url);
      $('[name="brandLogo"]').val(url);
      // 重置表单状态
      // 方法一
      // $('[name="brandLogo"]').trigger("input");
      // 方法二
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")

    }
});

// 表单校验
// $('#form').bootstrapValidator({
$("#form").bootstrapValidator({
  excluded:[],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
   // 校验字段
   fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: "请选择一级分类"
        }
      }
    },

    brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类名称"
        }
      }
    },

    brandLogo: {
      validators: {
        notEmpty: {
          message: "请选择图片"
        }
      }
    }
  }
})

})