$(function () {
  fn()
  //拿到layer
  let layer = layui.layer
  //实现退出功能
  $('#btnremove').on('click', function () {
    layer.confirm(' 确认退出吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = './login.html'
      layer.close(index);
    });
  })
})
function fn () {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',

    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取信息失败');
      }
      readeruser(res.data)
    }
   
  })
}
//渲染用户信息
function readeruser (user) {
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

  //判断是否有头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    //拿到用户的第一个字,是字母就大写
    let na = name[0].toUpperCase()
    $('.text-avatar').html(na)
  }
}