import { s as t } from "../_chunks/datetime-utility-3.0.0.js";
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
