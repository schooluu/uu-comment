"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "help",
  setup(__props) {
    const searchKey = common_vendor.ref("");
    const categories = common_vendor.ref([
      { id: 1, name: "账号相关", icon: "👤" },
      { id: 2, name: "订单物流", icon: "📦" },
      { id: 3, name: "售后退款", icon: "💰" },
      { id: 4, name: "会员权益", icon: "👑" },
      { id: 5, name: "支付问题", icon: "💳" },
      { id: 6, name: "商品相关", icon: "🛍️" }
    ]);
    const hotQuestions = common_vendor.ref([
      {
        id: 1,
        title: "如何修改收货地址？",
        isHot: true,
        content: '1. 进入"我的"-"收货地址"<br>2. 点击需要修改的地址<br>3. 修改后点击保存即可'
      },
      {
        id: 2,
        title: "退款多久能到账？",
        isHot: true,
        content: "退款到账时间说明：<br>1. 原路退回：1-3个工作日<br>2. 退回余额：实时到账<br>3. 退回银行卡：3-5个工作日"
      }
      // ... 更多热门问题
    ]);
    common_vendor.ref([
      {
        id: 1,
        title: "账号相关",
        icon: "👤",
        expanded: false,
        items: [
          { id: 101, title: "如何注册新账号？" },
          { id: 102, title: "忘记密码怎么办？" },
          { id: 103, title: "如何绑定手机号？" }
        ]
      },
      {
        id: 2,
        title: "订单物流",
        icon: "📦",
        expanded: false,
        items: [
          { id: 201, title: "发货需要多久？" },
          { id: 202, title: "如何查看物流信息？" },
          { id: 203, title: "收货地址可以修改吗？" }
        ]
      }
      // ... 更多分组
    ]);
    const currentQuestion = common_vendor.ref(null);
    const answerPopup = common_vendor.ref(null);
    const handleSearch = () => {
    };
    const selectCategory = (category) => {
    };
    const showAnswer = (question) => {
      currentQuestion.value = question;
      answerPopup.value.open();
    };
    const closeAnswer = () => {
      answerPopup.value.close();
    };
    const toggleGroup = (group) => {
      group.expanded = !group.expanded;
    };
    const handleFeedback = (isResolved) => {
      common_vendor.index.showToast({
        title: isResolved ? "感谢您的反馈" : "正在为您转接人工客服",
        icon: "none"
      });
      if (!isResolved) {
        handleContact("online");
      }
      closeAnswer();
    };
    const handleContact = (type) => {
      if (type === "online")
        ;
      else if (type === "phone") {
        common_vendor.index.makePhoneCall({
          phoneNumber: "400-123-4567"
        });
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.o([($event) => searchKey.value = $event.detail.value, handleSearch]),
        b: searchKey.value,
        c: common_vendor.f(categories.value, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.icon),
            b: common_vendor.t(category.name),
            c: category.id,
            d: common_vendor.o(($event) => selectCategory(), category.id)
          };
        }),
        d: !searchKey.value
      }, !searchKey.value ? {
        e: common_vendor.f(hotQuestions.value, (question, k0, i0) => {
          return common_vendor.e({
            a: question.isHot
          }, question.isHot ? {} : {}, {
            b: common_vendor.t(question.title),
            c: question.id,
            d: common_vendor.o(($event) => showAnswer(question), question.id)
          });
        })
      } : {}, {
        f: common_vendor.f(_ctx.displayFaqs, (group, k0, i0) => {
          return {
            a: common_vendor.t(group.icon),
            b: common_vendor.t(group.title),
            c: group.expanded ? 1 : "",
            d: common_vendor.o(($event) => toggleGroup(group), group.id),
            e: common_vendor.f(group.items, (item, k1, i1) => {
              return {
                a: common_vendor.t(item.title),
                b: item.id,
                c: common_vendor.o(($event) => showAnswer(item), item.id)
              };
            }),
            f: group.expanded,
            g: group.id
          };
        }),
        g: common_vendor.o(($event) => handleContact("online")),
        h: common_vendor.o(($event) => handleContact("phone")),
        i: common_vendor.o(closeAnswer),
        j: common_vendor.t((_a = currentQuestion.value) == null ? void 0 : _a.title),
        k: (_b = currentQuestion.value) == null ? void 0 : _b.content,
        l: common_vendor.o(($event) => handleFeedback(true)),
        m: common_vendor.o(($event) => handleFeedback(false)),
        n: common_vendor.sr(answerPopup, "4420fbd2-0", {
          "k": "answerPopup"
        }),
        o: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
qq.createPage(_sfc_main);
