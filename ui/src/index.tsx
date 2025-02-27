import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./i18next"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
