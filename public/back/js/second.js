/**
 * Created by ALLENWARE on 2018/6/26.
 */
(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
function render() {
  $.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:"json",
    success:function (info) {
      console.log(info);
      var htmp = template("tmp",info);
      $('tbody').html(htmp);

    }
  })
}

  $("#addBtn").click(function () {
      $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page: currentPage,
        pageSize : 100
      },
      success:function (info) {
        console.log(info);
        var ltmp = template("tmp2",info);
        $(".dropdown-menu").html(ltmp);
      }
    })
  });
  $(".dropdown-menu").on('click',"a",function () {
      var txt = $(this).text();
    $("#dropdownTxt").text(txt);
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e,data) {
        var picUrl = data.result.picAddr;

      $("#imgBox img").attr("src",picUrl);

      $('[name="brandLogo"]').val(picUrl);

      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });

  $("#form").bootstrapValidator({
    excluded:[],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields: {
      //categoryId 用户选择一级分类 id
      //brandName  用户输入二级分类名称
      //brandLogo  上传的图片地址
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
            message: "请上传图片"
          }
        }
      }
    }
  })
  //$("#addBtn2").click(function () {
  //  $.ajax({
  //    type:"post",
  //    url:"/category/addSecondCategory",
  //    data:$('#form').serialize(),
  //    success:function ( info ) {
  //      render();
  //    }
  //  })
  //
  //})

  $("#form").on("success.form.bv",function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      success:function (info) {
          if(info.success){
            $("#addModal").modal("hide");

            $("#form").data("bootstrapValidator").resetForm(true);
            currentPage = 1;
            render();

            $("#dropdownTxt").text("请选择一级分类");
            $("#imgBox img").attr("src","images./none.png");
          }
      }
    })
  })

})()