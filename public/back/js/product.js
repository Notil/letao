/**
 * Created by ALLENWARE on 2018/6/28.
 */


$(function () {
  currentPage = 1;
  pageSize = 5;
  picArr=[];
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function ( info ) {
        console.log(info);
        var htmp = template("tmp",info);
        $('tbody').html(htmp);

        $('#pageinator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage:info.page,
          size:"mini",
          itemTexts:function (type,page,current) {
              switch (type){
                case "first":
                  return "首页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "伟业";
                case "page":
                  return page;
              }
          },
          tooltipTitles:function (type,page,current) {
            switch (type){

              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "前往"+page +"页";
            }
          },
            userBootstrapTooltip:true,

          onPageClicked:function (a,b,c,page) {
              currentPage = page;
            render();
          }
        })
      }
    })
  }

  $("#addBtn").click(function () {
      $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function ( info ) {

        console.log(info);
        var stmp = template("secondtmp",info);
        $(".dropdown-menu").html(stmp);
      }
    })
  });

  $(".dropdown-menu").on('click','a',function () {
      var txt = $(this).text();
    //console.log(txt);
    $("#dropdownTxt").text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );

    $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  $('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
        var picUrl = data.result.picAddr;
      console.log(picUrl);
      picArr.unshift(data.result);

      $('#imgBox').prepend('<img src="'+picUrl+'"width="100" height="100">');

      if(picArr.length >3){
        picArr.pop();

        $('#imgBox img:last-of-type').remove();
      }


      if(picArr.length ===3 ){
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }
      console.log(picArr);
    }
  })
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"商品库存必须是非零开头的数字"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"商品尺码必须是 xx-xx 的格式, 例如 32-40"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传3张照片"
          }
        }
      }

    }
  })

  $("#form").on('success.form.bv',function (e) {
    e.preventDefault();

    var paramasStr = $("form").serialize();

    paramasStr += "&picAddr1="+picArr[0].picAddr+ "&picName1="+picArr[0].picName;
    paramasStr += "&picAddr2="+picArr[1].picAddr+ "&picName2="+picArr[1].picName;
    paramasStr += "&picAddr3="+picArr[2].picAddr+ "&picName3="+picArr[2].picName;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramasStr,
      dataType:'json',
      success:function ( info ) {
        if(info.success){
        $('#addModal').modal("hide");
        $('#form').data('bootstrapValidator').resetForm(true);
        currentPage = 1;
          render();

          $('#dropdownTxt').text("请选择一级分类");
          $('#imgBox img').attr('src',"images/none.png");
        }
      }
    })
  })
})