# Kelola Bayar Quix

Is a payment gateway widget by Kelola

![image-removebg-preview](https://user-images.githubusercontent.com/27531592/228733371-c5ea5804-3cb9-4259-a8e5-d4aaf8d67097.png)

# Integration Steps Overview

1. Acquire Quix transaction token on your backend
2. Display Quix payment page on frontend
3. Customer perform payment on payment page
4. Handling payment status update on your backend

# Requirements

| Field             | Value                        |
| ----------------- | ---------------------------- |
| Client Key        | Coming soon                  |
| `quix.js` url     | ...                          |
| Transaction Token | Retrieved from backend (API) |

# How to use

1. Append this script into your body html

```javascript
<script type="text/javascript"
    src="quix.js"`
    data-client-key="SET_YOUR_CLIENT_KEY_HERE"></script>
```

2. Call a quix method to process the transaction

```javascript
window.quix.pay("TRANSACTION_TOKEN");
```

3. You can also add an event callback

```javascript
window.quix.pay("TRANSACTION_TOKEN", {
  onPending: function (res) {
    alert("Waiting your payment");
  },
  onSuccess: function (res) {
    alert("Payment success");
  },
  onError: function (res) {
    alert("Payment failed");
  },
  onClose: function (res) {
    alert("Transaction widget was closed");
  },
});
```
