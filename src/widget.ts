import getClientKey from "./utils/getClientKey";

export default class Widget {
  public targetOrigin: string;
  public sourceOrigin: string;
  private pageUrl: string;
  private clientKey: string;
  private attached = false;
  private iframe: HTMLIFrameElement;

  get isMobile() {
    return window.innerWidth < 568;
  }

  get isVisible() {
    return this.iframe.style.display != "none";
  }

  get isAttached() {
    return this.attached;
  }

  protected setup() {
    try {
      const baseUrl = new URL('https://kelola-bayar.vercel.app/snap/pay');
      const sourceOrigin = window.location.origin;
      const digest = "soon";
      const elScripts = document.getElementsByTagName("script");
      const clientKey = getClientKey(elScripts);

      if (!clientKey) {
        throw new Error('Please add `data-client-key` attribute in the script tag <script type="text/javascript" src="...snap.js" data-client-key="CLIENT-KEY"></script>, Otherwise custom UI configuration will not take effect');
      }
      
      this.sourceOrigin = sourceOrigin;
      this.targetOrigin = baseUrl.origin; 
      this.clientKey = clientKey;
      this.pageUrl = `${baseUrl}?origin_host=${sourceOrigin}&digest=${digest}&client_key=${clientKey}`;

      return this;
    } catch (e) {
      throw e;
    }
  }

  show() {
    if (this.isAttached) {
      this.iframe.style.display = "block";
      return this.iframe;
    } else {
      console.log(`iframe doesn't attached completely`);
    }
  }

  hide() {
    if (this.isAttached) {
      this.iframe.style.display = "none";
      return this.iframe;
    } else {
      console.log(`iframe doesn't attached completely`);
    }
  }

  attach() {
    if (!this.isAttached) {
      this.iframe.name = "popup_" + new Date();
      document.body.appendChild(this.iframe);
      this.attached = !this.attached;
    }
  }

  detach() {
    if (this.isAttached) {
      document.body.removeChild(this.iframe);
      this.attached = !this.attached;
    }
  }

  postMessage(data: any) {
    if (this.isAttached) {
      this.iframe.contentWindow.postMessage(data, this.targetOrigin);

      return this;
    }
  } 

  render() {
    try {
      const setup = this.setup();
      let el: HTMLIFrameElement = document.createElement("iframe");
      el.src = setup.pageUrl;
      el.id = "snap-kelar";
      el.style.cssText =
        "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; border: 0;";
      if (["interactive", "complete"].includes(document.readyState)) {
        this.iframe = el;
        this.attach();
      } else {
        console.log(`Current document ready state is: ${document.readyState}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
