// 登录拦截，如果没有登录，拦截到登录页
$(function(){

  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
      // console.log(info);
      if(info.error == 400){
        location.href = "login.html"
      }
    }
  })





})