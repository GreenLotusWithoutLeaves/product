//在$.get(),$.post,$.ajax()
// 真正发起请求前，都会执行，$.ajaxPrefilter这个方法
// 函数内的参数指的是ajax的每一个配置文件

$.ajaxPrefilter(function (op) {
  op.url = 'http://big-event-api-t.itheima.net' + op.url
  //op.url等于我触发的ajax中，请求的url地址
  //通过拼接根路径，将请求的地址，进行修改
  //方便后期路径修改
  if (op.url.indexOf('/my/') !== -1) {
    //token相当于令牌，可以说是用户的id
    op.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  //无论成功于否都执行
  op.complete = function (res) {
    // console.log(res)
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      //清空toekn，有些虽然有token但有可能过期了
      localStorage.removeItem('token')
      location.href = './login.html'
    }
  }
})