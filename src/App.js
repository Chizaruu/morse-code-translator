import styles from "./App.module.scss";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
export default App;
