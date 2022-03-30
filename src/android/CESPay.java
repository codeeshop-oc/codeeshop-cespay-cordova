package com.codeeshop;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class CESPay extends CordovaPlugin {
    private static final String TAG = "CESPay";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.i(TAG, "Actions: " + action);
        if (action.equals("startPayment")) {
            String url = args.getString(0);
            this.startPayment(url, callbackContext);
            return true;
        }

        return false;
    }

    private void startPayment(String url, CallbackContext callbackContext) {
        if (url != null && url.length() > 0) {
            callbackContext.success();
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
