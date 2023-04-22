$(function () {
  let form = layui.form
  let layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码为6到12位，且不能为空'],
    setold: function (value) {
      if (value == $('[name="oldPwd"]').val()) {
        return '新旧密码不能相同'
      }
    },
    setnew: function (value) {
      if (value !== $('[name="newPwd"]').val()) {
        return '两次密码不一致'
      }
    }

  })
  //修改密码
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      //忘了提交数据
      data: $('.layui-form').serialize(),
      success: function (res) {
        //密码判断后端做
        if (res.status !== 0) {
          return layer.msg('修改密码失败', { icon: 5 })
        }
        layer.msg('修改成功', { icon: 6 })
        //父船体页面跳转
        window.parent.location.href = '../login.html'
      }
    })
  })
})