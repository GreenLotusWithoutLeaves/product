$(function () {
  let layer = layui.layer
  let imgage = $('#image')

  let option = {
    aspecRatio: 1,
    preview: $('.img-preview')
  }
  imgage.cropper(option)


  //单击按钮触发file单击
  $('.btnprev').click(function () {
    $('[type="file"]').click()
  })

  //当文件框发送变化触发
  $('[type="file"]').on('change', function (e) {
    console.log(e.target.files);
    let img = e.target.files[0]
    //将图片转换成路径
    let newfiles = URL.createObjectURL(img)

    //销毁原来图片
    imgage
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newfiles)  // 重新1设置图片路径
      .cropper(option)        // 重新初始化裁剪区域

  })

  //图片上传
  $('.layui-btn-danger').click(function () {
    var dataURL = imgage
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串




    //1.现在有base64的文件
    //2.可以更新数据，但里面却没有更新,只能说明没有id标识，确定改的是哪一个



    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: dataURL,
      success: function (res) {

        //直接修改成功，没刷新，应该是id标识不知道多少
        //token令牌应该有信息，但是res.data没数据,(后面写完在改)
        //post提交拿不到数据，错了
        console.log(res)
        if (res.status !== 0) {
          return layer.msg('修改失败', { icon: 5 })
        }
        layer.msg('修改成功', { icon: 6 })

        //调用父窗体的方法,渲染图片
        window.parent.fn()

      }
    })
  })
})