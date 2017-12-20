// components/common/userItem/userItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userItem: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startLeft: 0,
    endLeft: 1,
    offsetLeft: 0,
    nowLeft: 0,
    isClick: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData: function () {
      this.setData({
        startLeft: 0,
        endLeft: 1,
        offsetLeft: 0,
        nowLeft: 0,
        isClick: true,
      })
    },
    touchstartFn:function(e){
      //let id = e.currentTarget.dataset.id || e.target.dataset.id || e.target.id;
      let offsetLeft = e.target.offsetLeft;
      this.setData({
        startLeft: e.touches[0].pageX,
        offsetLeft: offsetLeft,
        isClick: true
      })
    },
    touchmoveFn: function (e) {
      let vx = e.touches[0].pageX - this.data.startLeft; //相对起始点距离
      let left = this.data.nowLeft;
      if (this.data.offsetLeft < 0) {
        left = vx - 250
        if (left < -250) {
          left = -250
        }
      } else {
        left = vx;
        if (left < -250) {
          left = -250
        } else if (left > 100) {
          left = 100
        }
      }

      this.setData({
        nowLeft: left,
        isClick: false
      })
    },
    touchendFn: function (e) {
      let id = this.properties.userItem.personId;
      if (this.data.isClick) {
        this.initData()
        wx.navigateTo({
          url: '/pages/contact/contactDetail/contactDetail?contactId=' + id + '&contactType=0',
        })
        return;
      }
      let left = this.data.nowLeft;
      if( left > -150 ){ //向右拉或者向左拉伸不到100则复位
        left = 0
      }else{
        left = -250
      }
      this.setData({
        startLeft: 0,
        endLeft: 0,
        offsetLeft: 0,
        nowLeft: left
      })
    },
    editUser: function (e) {
      this.initData()
      wx.navigateTo({
        url: '/pages/contact/contactAdd/contactAdd?id=' + this.properties.userItem.personId,
      })
      //console.log(e.currentTarget.dataset.id)
    },

    deletEvent: function () {
      this.initData()
      //var myEventDetail = {} // detail对象，提供给事件监听函数
      //var myEventOption = {} // 触发事件的选项
      this.triggerEvent('deletEvent', this.properties.userItem);
    },
  }
})
