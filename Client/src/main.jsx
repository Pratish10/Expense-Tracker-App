import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Analytics } from "@vercel/analytics/react"

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Analytics>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{ style: { fontFamily: "Pixelify Sans" } }}
        />
      </PersistGate>
    </Provider>
  </Analytics>
);
