import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';


export default function RootLayout() {
 
  return (
   <>
      <StatusBar style="light" />
      <Stack 
      screenOptions={
       { headerStyle:false,
        contentStyle:{backgroundColor:'white '},
        animation:'slide_from_right',
        header:()=> null,
        navigationBarHidden:true
       }
      }>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </>
  );
}
