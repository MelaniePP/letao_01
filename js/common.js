// 进度条插件nprogress
// NProgress.start();//开启进度条

// NProgress.done();//关闭进度条
// ajax全局事件


  // ajaxStart
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  // ajaxStop在ajax请求结束时触发
  $(document).ajaxStop(function(){
    setTimeout(function(){

      NProgress.done();
    },1000);
  })
  // $(document).ajaxStart(function() {
  //   // 第一个ajax发送时调用, 开启进度条
  //   NProgress.start();
  // });
  
  
  // // 所有的ajax请求完成时, 关闭进度条
  // $(document).ajaxStop(function() {
  //   setTimeout(function() {
  //     // 关闭进度条
  //     NProgress.done();
  //   }, 500);
  // });

  
$(function(){
  // 功能一：二级菜单的显示和隐藏
  var $category = $(".category");
  $category.click(function(){
    // alert("1");
    $(this).next().stop().slideToggle();
  })

  // 功能2: 左侧菜单列表切换功能
 $(".icon_left").click(function(){

   $(".lt_aside").toggleClass("hidemenu");
   $(".lt_main").toggleClass("hidemenu");
   $(".lt_topbar").toggleClass("hidemenu");
 })

//  三：退出功能
$(".icon_right").click(function(){
  // 显示模态框
  $('#logoutmodal').modal().show();
});
  $("#logoutBtn").click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })

})