"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const chatInfo = {
      name: "张三",
      avatar: "https://example.com/avatar.jpg"
    };
    const messages = common_vendor.ref([
      {
        id: 1,
        content: "你好，请问这个商品还在吗？",
        time: "2024-01-20 10:30:00",
        isSelf: false,
        avatar: "https://example.com/avatar1.jpg"
      },
      {
        id: 2,
        content: "在的，您想了解什么？",
        time: "2024-01-20 10:31:00",
        isSelf: true,
        avatar: "https://example.com/avatar2.jpg"
      }
    ]);
    const inputMessage = common_vendor.ref("");
    const lastMessageId = common_vendor.computed(() => {
      const lastMsg = messages.value[messages.value.length - 1];
      return lastMsg ? "msg-" + lastMsg.id : "";
    });
    const showMessageTime = (index) => {
      if (index === 0)
        return true;
      const currentMsg = messages.value[index];
      const prevMsg = messages.value[index - 1];
      return dayjs(currentMsg.time).diff(dayjs(prevMsg.time), "minute") > 5;
    };
    const formatTime = (time) => {
      return dayjs(time).format("MM-DD HH:mm");
    };
    const sendMessage = () => {
      if (!inputMessage.value.trim())
        return;
      messages.value.push({
        id: messages.value.length + 1,
        content: inputMessage.value,
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        isSelf: true,
        avatar: "https://example.com/avatar2.jpg"
      });
      inputMessage.value = "";
    };
    const loadMoreMessages = () => {
      common_vendor.index.__f__("log", "at pages/city/chat/detail.vue:116", "加载更多消息");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(chatInfo.name),
        b: common_vendor.f(messages.value, (message, index, i0) => {
          return common_vendor.e({
            a: message.avatar,
            b: showMessageTime(index)
          }, showMessageTime(index) ? {
            c: common_vendor.t(formatTime(message.time))
          } : {}, {
            d: common_vendor.t(message.content),
            e: index,
            f: "msg-" + message.id,
            g: common_vendor.n(message.isSelf ? "self" : "other")
          });
        }),
        c: lastMessageId.value,
        d: common_vendor.o(loadMoreMessages),
        e: common_vendor.o(sendMessage),
        f: inputMessage.value,
        g: common_vendor.o(($event) => inputMessage.value = $event.detail.value),
        h: inputMessage.value ? 1 : "",
        i: common_vendor.o(sendMessage)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17ad3150"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/chat/detail.js.map
