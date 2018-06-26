/**
 * Created by ALLENWARE on 2018/6/25.
 */

if(location.href.indexOf("login.html")=== -1){
  $.ajax({
    type:"get",
    url:" /employee/checkRootLogin",
    dataType:'json',
    success:function ( info ) {
        if(info.error === 400){
          location.href = "login.html";
        }
    }
  })
}



$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();

  },5000)
});


$('.category').click(function () {
    $('.child').stop().slideToggle();
})

$('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemeau');
    $('.lt_main').toggleClass('hidemeau');
    $('.lt_main .nav').toggleClass('hidemeau')
})

$('.icon_logout').click(function () {
    $('#logoutModal').modal("show");
})

$('#logoutBtn').click(function () {
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      if ( info.success ) {
        // 跳转到登录页面
        location.href = "login.html";
      }
    }
  })
})