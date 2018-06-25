/**
 * Created by ALLENWARE on 2018/6/25.
 */

$(function() {

  // 表单校验初始化
  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      username: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在 2-6位"
          },
          callback: {
              message:"用户名不存在"
          }
        }
      },
      password: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在 6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post" ,
      data:$('#form').serialize(),
      url: "/employee/employeeLogin" ,
      success: function ( info ) {
          if(info.success){
            location.href = "index.html";
          }
        if(info.error === 1000){
          $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
        }
        if(info.error === 1001){
          $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
        }
      }
    })
  });


  //重置表单BUG
  $('[type="reset"]').click(function () {
    $("#form").data('bootstrapValidator').resetForm()
  })
});

