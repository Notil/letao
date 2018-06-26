/**
 * Created by ALLENWARE on 2018/6/26.
 */
(function () {
    var currentPage = 1 ;
    var pageSize = 5;
    var currentId;
    var isDelete;
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function (info) {
        console.log(info);
        var htmp = template("tmp",info);
        $('tbody').html(htmp);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
          currentPage:currentPage,//指定当前页
          totalPages:Math.ceil(info.total/pageSize),//指定总页数
          onPageClicked:function (a,b,c, page) {
            //page指的是点击的页码,修改了当前页
            currentPage = page;
            //重新渲染
            render();
          }
        });
      }
    })
  }



  $("tbody").on('click','.btn',function () {
    $('#sureModal').modal("show");
      currentId = $(this).parent().parent().data("id");
    console.log(currentId);
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    console.log(isDelete);
  })

  $("#sureBtn").click(function () {
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function ( info ) {
        $('#sureModal').modal("hide");
          render();
      }

    })
  })
})()