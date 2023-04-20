$(document).ready(function () {
  //给a标签数组绑定单击事件
  //单击后，父元素隐藏，兄弟父元素显示
  $('a').click(function () {
    //当前元素
    let n = $(this)
    $(this).parent().parent().parent().hide()         //隐藏当前父元素
    $('a').each(function (i, e) {
      //指向同一个html元素，但这两个jquery对象不相等
      // console.log($(e), n)
      // console.log($(e) === n)
      if (!$(e).is(n)) {    //判断当前对象与n是否相等
        $(e).parent().parent().parent().show()
      }
    })
  })

  //直接通过verify绑定
  let form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能为空格!'],
    //定义验证密码
    repwd: function (value) {
      let n = $('.reg-box [name=password]').val()
      if (value !== n) {
        return '两次密码不一样'
      }
    }
  })

  //注册信息
  $('.form-reg').on('submit', function (e) {
    e.preventDefault()
    console.log($('form-reg [name=username]').val())
    console.log($('form-reg [name=password]').val())
    $.post('/api/reguser', {
      username: $('.form-reg [name=username]').val(), password: $('.form-reg [name=password]').val()
    }, function (res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.alert(res.message, { icon: 5 });
      }
      layer.alert('注册成功', { icon: 6 });
      $('#reg-btn').click()
    })
  })

  //登录
  $('.form-login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.alert(res.message, { icon: 5 });
        }
        localStorage.setItem('token', res.token)
        layer.alert('登录成功', { icon: 6 });
        location.href = './index.html'
      }
    })
  })
})