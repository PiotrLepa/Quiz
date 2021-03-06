package com.quiz;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Arrays;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import org.pgsqlite.SQLitePluginPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                // eg. new VectorIconsPackage()
                new AsyncStoragePackage(),
                new SplashScreenReactPackage(),
                new SQLitePluginPackage(),
                new SnackbarPackage(),
                new NetInfoPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
