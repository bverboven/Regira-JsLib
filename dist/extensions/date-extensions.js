import { s as t } from "../_chunks/datetime-utility-Ca9RTNE1.js";
const o = {
  use() {
    Date.prototype.toJSON = function() {
      return t(this);
    };
  }
};
export {
  o as default
};
