# Props

Props used are given below.

## All Props

Method: startPayment

| Prop name          | Description                                      | Type    | Values                   | Default      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------ |
| url                | YOUR_PAYMENT_REDIRECT_URL                        | String  | -                        |     |
| target             | key to be used to show listing data ( just one ) | String  | -                        | _blank |
| options            | Cordova Plugin Options ( cordova-plugin-inappbrowser ) | String  | [Options](https://github.com/apache/cordova-plugin-inappbrowser#example-1)       | location=no,hidenavigationbuttons=yes,hideurlbar=yes,hardwareback=no,fullscreen=yes        |
| callbackSuccessURL | YOUR_PAYMENT_FAILURE_URL                        | String  | -                | success      |
| callbackErrorURL   | YOUR_PAYMENT_SUCCESS_URL                      | String  | - | failed       |
