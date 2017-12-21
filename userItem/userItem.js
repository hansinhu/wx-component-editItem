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
    startLeft: 0,//滑动j开始left
    endLeft: 1, //滑动结束left
    offsetLeft: 0, //记录上一次的偏移量
    nowLeft: 0, //实时left偏移量
    isClick: true, //是单击还是滑动（不需要了）
    transitonDone: false, //过渡效果
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
      this.setData({
        startLeft: e.touches[0].pageX,
        isClick: true,
        transitonDone: false
      })
    },
    touchmoveFn: function (e) {
      let vx = e.touches[0].pageX - this.data.startLeft; //相对起始点距离
      let left = this.data.nowLeft;
      if (this.data.offsetLeft < 0) {
        left = vx - 250
      } else {
        left = vx;
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
      let inLeft = this.data.offsetLeft < 0;
      if (inLeft && left > -200) {//如果已经在左侧，向右拉50就复位
        left = 0
      } else if (!inLeft && left > -100) {//如果不在左侧，需要拉动超过100才生效
        left = 0;
      } else {
        left = -250;
      }
      this.setData({
        startLeft: 0,
        endLeft: 0,
        offsetLeft: left,
        nowLeft: left,
        transitonDone: true
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
