var I = Object.defineProperty;
var h = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty,
  E = Object.prototype.propertyIsEnumerable;
var x = (e, n, o) =>
    n in e ? I(e, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[n] = o),
  P = (e, n) => {
    for (var o in n || (n = {})) M.call(n, o) && x(e, o, n[o]);
    if (h) for (var o of h(n)) E.call(n, o) && x(e, o, n[o]);
    return e;
  };
import {
  r as i,
  C as v,
  aJ as A,
  aK as N,
  aL as $,
  aM as _,
  aN as V,
  t as W,
  aO as R,
  aP as D,
  aQ as T,
  aR as l,
  aS as U,
  aT as Y,
  aU as z,
  aV as B,
  aW as b,
  aX as G,
  aY as J,
  a as K,
  u as L,
  aZ as Q,
  j as X,
  l as Z,
} from "./index-BpSF5Wtu.js";
import { w as k } from "./roundedArrow-Y7rqzAmY.js";
var q = function (e, n) {
  var o = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && n.indexOf(t) < 0 && (o[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, t = Object.getOwnPropertySymbols(e); s < t.length; s++)
      n.indexOf(t[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, t[s]) &&
        (o[t[s]] = e[t[s]]);
  return o;
};
const H = (e) => {
    const {
        prefixCls: n,
        className: o,
        closeIcon: t,
        closable: s,
        type: c,
        title: O,
        children: d,
        footer: w,
      } = e,
      g = q(e, [
        "prefixCls",
        "className",
        "closeIcon",
        "closable",
        "type",
        "title",
        "children",
        "footer",
      ]),
      { getPrefixCls: p } = i.useContext(v),
      m = p(),
      a = n || p("modal"),
      C = A(m),
      [j, S, F] = N(a, C),
      f = `${a}-confirm`;
    let u = {};
    return (
      c
        ? (u = {
            closable: s != null ? s : !1,
            title: "",
            footer: "",
            children: i.createElement(
              $,
              Object.assign({}, e, {
                prefixCls: a,
                confirmPrefixCls: f,
                rootPrefixCls: m,
                content: d,
              })
            ),
          })
        : (u = {
            closable: s != null ? s : !0,
            title: O,
            footer: w !== null && i.createElement(_, Object.assign({}, e)),
            children: d,
          }),
      j(
        i.createElement(
          V,
          Object.assign(
            { prefixCls: a, className: W(S, `${a}-pure-panel`, c && f, c && `${f}-${c}`, o, F, C) },
            g,
            { closeIcon: R(a, t), closable: s },
            u
          )
        )
      )
    );
  },
  ee = k(H);
function y(e) {
  return l(J(e));
}
const r = D;
r.useModal = T;
r.info = function (n) {
  return l(U(n));
};
r.success = function (n) {
  return l(Y(n));
};
r.error = function (n) {
  return l(z(n));
};
r.warning = y;
r.warn = y;
r.confirm = function (n) {
  return l(B(n));
};
r.destroyAll = function () {
  for (; b.length; ) {
    const n = b.pop();
    n && n();
  }
};
r.config = G;
r._InternalPanelDoNotUseOrYouWillBeFired = ee;
const se = (e) => {
  const n = K(),
    { isOpen: o } = L(Q),
    t = () => {
      n(Z({ type: "", isOpen: !1 }));
    };
  return X.jsx(r, P({ open: o, centered: !0, onCancel: t }, e));
};
export { se as A };
