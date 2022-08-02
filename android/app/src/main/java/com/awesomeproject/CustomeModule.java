package com.awesomeproject; 
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.widget.Toast;  
import android.util.Log;
import android.content.Context;

public class CustomeModule extends ReactContextBaseJavaModule {
    Context context;
   CustomeModule(ReactApplicationContext context) {
       super(context);
       this.context = context.getApplicationContext();
   }


@Override
public String getName() {
   return "CustomeModule";
}

@ReactMethod
public void createEvent(String name, String location) {
      Log.d("CalendarModule", "Create event called with name: " + name
   + " and location: " + location);
Toast.makeText(context,"Congrats!, Bridging is succesfully done",Toast.LENGTH_SHORT).show();  
}

}
