/**
 * Created by ALLENWARE on 2018/6/26.
 */
(function () {

  var currentPage = 1 ;
  var pageSize = 2;
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      dataType:"json",
      data:{
        page: currentPage,
        pageSize : pageSize
      },
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
      $("#addBtn").click(function () {
        $("#addModal").modal("show");
      })

      $("#addBtn2").click(function () {
        $.ajax({
          type:"post",
          url:"/category/addTopCategory",
          data:$("#form").serialize(),
          dataType:"json",
          success:function (info) {
              render();
          }
        })
      })

})()