"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const messages = [
      {
        avatar: "https://example.com/avatar1.jpg",
        name: "张三",
        content: "你好，请问这个商品还在吗？",
        time: "10:30"
      },
      {
        avatar: "https://example.com/avatar2.jpg",
        name: "李四",
        content: "我对你的房子很感兴趣。",
        time: "昨天"
      }
      // ... 更多消息数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages, (message, index, i0) => {
          return {
            a: message.avatar,
            b: common_vendor.t(message.name),
            c: common_vendor.t(message.content),
            d: common_vendor.t(message.time),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7863d755"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/messages/index.js.map
