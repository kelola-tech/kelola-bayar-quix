import Widget from "./widget";

interface IKelarData {
  status?: 'pending' | 'success' | 'error' | 'close';
  message?: string;
  data?: any;

  show?: boolean;
}

interface IResponse {
  kelar: IKelarData;
}

interface IPayCallback {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
  onPending: (data: any) => void;
  onClose: (data: any) => void;
}

class Kelar {
  private widget: Widget;

  constructor() {
    this.widget = new Widget();
  }

  init() {
    this.widget.render();
  }

  pay(token: string, callback: IPayCallback) {
    try {
      if (this.widget.isVisible) {
        throw new Error("Snap is already open");
      }

      if (!token) {
        throw new Error("Snap Token is required");
      }
      
      if (this.widget.isAttached) {
        this.widget.show();

        this.widget.postMessage(
          {
            kelar: {
              data: {
                token,
              },
            },
          },
        );

        // Listen callback from widget
        if (callback && typeof callback === "object") {
          window.addEventListener("message", (event) => {
            if (event.data.hasOwnProperty("kelar")) {
              const payload = (event.data as IResponse).kelar;
              const data = payload.data;

              if (payload.hasOwnProperty("status")) {
                const status = payload.status;

                if (data.hasOwnProperty("show") && !data.show) {
                  this.widget.hide();
                  this.widget.detach();
                  this.widget.attach();
                }
  
                // Handle callback
                switch (status) {
                  case 'success': {
                    if (callback.onSuccess)
                      callback.onSuccess(data);
                    break;
                  };
                  case 'error': {
                    if (callback.onError)
                      callback.onError(data);
                    break;
                  };
                  case 'pending': {
                    if (callback.onPending)
                      callback.onPending(data);
                    break;
                  };
                  case 'close': {
                    if (callback.onClose)
                      callback.onClose(data);
                    break;
                  };
                }
              }
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleMessage(event: { origin: string; data: any }) {
    // @TODO: No need to block specific origin
    // if (event.origin && event.origin !== "http://localhost:5174") {
    //   return;
    // }

    try {
      if (event.data) {
        if (event.data.hasOwnProperty("kelar")) {
          // Close snap
          if (event.data.kelar.hasOwnProperty("show") && !event.data.kelar.show) {
            if (this.widget.isVisible) {
              this.widget.hide();
            }
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

if (window.addEventListener) {
  window.addEventListener("load", () => {
    // @TODO: BUG - Kelar was initialized twice when called pay method twice
    window.kelar = new Kelar();
    window.kelar.init();
  });
  
  // Listen message from widget
  // window.addEventListener("message", (event) => {
  //   window.kelar.handleMessage(event)
  // }, false);
}


