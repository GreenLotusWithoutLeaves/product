//在$.get(),$.post,$.ajax()
// 真正发起请求前，都会执行，$.ajaxPrefilter这个方法
// 函数内的参数指的是ajax的每一个配置文件

$.ajaxPrefilter(function (op) {
  op.url = 'http://big-event-api-t.itheima.net' + op.url
  //op.url等于我触发的ajax中，请求的url地址
  //通过拼接根路径，将请求的地址，进行修改
  //方便后期路径修改
})