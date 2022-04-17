import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStore, combineReducers } from "redux";
import { Provider, useDispatch } from "react-redux";
import store from "./store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
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
