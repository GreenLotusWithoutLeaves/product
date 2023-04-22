$(function () {
  let layer = layui.layer
  let form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6 && value.length != 0) {
        return '昵称不能超过六位'
      }
    }
  })

  // layer.msg('昵称不能超过六位,且不能为空值', { icon: 5 });
  //获取基本信息
  function msguser () {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(1);
        if (res.status !== 0) {
          return layer.msg('获取信息失败', { icon: 5 })
        }
        // 修改名字里面的内容为获取的名字
        // $('.username').val(res.data.username)
        //通过class="layui-form" 所在元素属性 lay-filter="" 对应的值
        form.val('formuserinfo', res.data)
      }
    })
  }
  msguser()

  //重置
  $('.btnreset').click(function (e) {
    e.preventDefault()
    msguser()
  })

  //表单修改
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    console.log($(this).serialize());
    // let name = $('[ name="username"]').val()
    // let nkname = $('[name="nickname"]').val()
    // let emi = $('[name="email"]').val()

    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      // data: {
      //   username: name,
      //   nickname: nkname,
      //   email: emi,
      // },
      data: $(this).serialize(),
      success: function (res) {

        if (res.status !== 0) {
          return layer.msg('更新失败', { icon: 5 })
        }
        layer.msg('更新信息完成', { icon: 6 })

        //成功更新昵稱顯示头部
        window.parent.fn()
        console.log(2)
      }
    })
  })
})