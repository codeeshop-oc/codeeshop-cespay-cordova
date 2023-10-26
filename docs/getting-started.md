# Getting Started

## Installation

### Prerequisites

- [Cordova](https://cordova.apache.org/docs/en/9.x/) version 9 or higher.
- Easy & Fast to integrate

Cordova Codeeshop Cespay can be used on new project, or be installed into an existing project. In both cases, you can install it with:

::: code-group

```sh [npm - (Recommended)]
$ cordova plugin add cordova-codeeshop-cespay
```

```sh [repo]
$ cordova plugin add https://github.com/codeeshop-oc/cordova-codeeshop-cespay.git
```

:::

::: tip NOTE

Cordova Codeeshop Cespay is tested on 2 payment gateways. You can try it with new payment methods and can create a pull request for payment gateways you have worked on.

:::

::: details Required Dependencies
If using cordova, you will notice a missing peer warning for [`cordova-plugin-inappbrowser`](https://www.npmjs.com/package/cordova-plugin-inappbrowser). You need to add dependency:

```sh [npm]
$ cordova plugin add cordova-plugin-inappbrowser
```