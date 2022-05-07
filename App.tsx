import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import myinterceptor from "./src/axios/interceptor";
import { useState } from "react";
import axios from "axios";
import { TICK_URL } from "./src/redux/endpoints";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [firstCall, setFirstCall] = useState(true);
  if (firstCall) {
    myinterceptor();
    setFirstCall(false);
    setInterval(() => {
      axios.get(TICK_URL);
    }, 60000);
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider style={{ backgroundColor: "#464646" }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
