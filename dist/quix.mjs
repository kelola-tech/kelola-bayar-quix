function r(a) {
  return -1 < a.indexOf("main.js") || -1 < a.indexOf("main.ts") || -1 < a.indexOf("quix.js") || -1 < a.indexOf("quix.min.js");
}
function n(a) {
  for (var e, t = 0; t < a.length; t++)
    r(a[t].src) && (e = a[t]);
  return e && e.getAttribute("data-client-key") || null;
}
class o {
  constructor() {
    this.attached = !1;
  }
  get isMobile() {
    return window.innerWidth < 568;
  }
  get isVisible() {
    return this.iframe.style.display != "none";
  }
  get isAttached() {
    return this.attached;
  }
  setup() {
    try {
      var e = new URL("https://kelola-bayar.vercel.app/snap/pay"), t = window.location.origin, i = n(document.getElementsByTagName("script"));
      if (i)
        return this.sourceOrigin = t, this.targetOrigin = e.origin, this.clientKey = i, this.pageUrl = e + `?origin_host=${t}&digest=soon&client_key=` + i, this;
      throw new Error('Please add `data-client-key` attribute in the script tag <script type="text/javascript" src="...snap.js" data-client-key="CLIENT-KEY"><\/script>, Otherwise custom UI configuration will not take effect');
    } catch (s) {
      throw s;
    }
  }
  show() {
    if (this.isAttached)
      return this.iframe.style.display = "block", this.iframe;
    console.log("iframe doesn't attached completely");
  }
  hide() {
    if (this.isAttached)
      return this.iframe.style.display = "none", this.iframe;
    console.log("iframe doesn't attached completely");
  }
  attach() {
    this.isAttached || (this.iframe.name = "popup_" + new Date(), document.body.appendChild(this.iframe), this.attached = !this.attached);
  }
  detach() {
    this.isAttached && (document.body.removeChild(this.iframe), this.attached = !this.attached);
  }
  postMessage(e) {
    if (this.isAttached)
      return this.iframe.contentWindow.postMessage(e, this.targetOrigin), this;
  }
  render() {
    try {
      var e = this.setup(), t = document.createElement("iframe");
      t.src = e.pageUrl, t.id = "snap-kelar", t.style.cssText = "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; border: 0;", ["interactive", "complete"].includes(document.readyState) ? (this.iframe = t, this.attach()) : console.log("Current document ready state is: " + document.readyState);
    } catch (i) {
      console.log(i);
    }
  }
}
class d {
  constructor() {
    this.widget = new o();
  }
  init() {
    this.widget.render();
  }
  pay(e, t) {
    try {
      if (this.widget.isVisible)
        throw new Error("Snap is already open");
      if (!e)
        throw new Error("Snap Token is required");
      this.widget.isAttached && (this.widget.show(), this.widget.postMessage({ kelar: { data: { token: e } } }), t) && typeof t == "object" && window.addEventListener("message", (i) => {
        if (i.data.hasOwnProperty("kelar")) {
          var i = i.data.kelar, s = i.data;
          if (i.hasOwnProperty("status"))
            switch (i = i.status, s.hasOwnProperty("show") && !s.show && (this.widget.hide(), this.widget.detach(), this.widget.attach()), i) {
              case "success":
                t.onSuccess && t.onSuccess(s);
                break;
              case "error":
                t.onError && t.onError(s);
                break;
              case "pending":
                t.onPending && t.onPending(s);
                break;
              case "close":
                t.onClose && t.onClose(s);
            }
        }
      });
    } catch (i) {
      console.log(i);
    }
  }
  handleMessage(e) {
    try {
      e.data && e.data.hasOwnProperty("kelar") && e.data.kelar.hasOwnProperty("show") && !e.data.kelar.show && this.widget.isVisible && this.widget.hide();
    } catch (t) {
      throw new Error(t);
    }
  }
}
window.addEventListener && window.addEventListener("load", () => {
  window.kelar = new d(), window.kelar.init();
});
