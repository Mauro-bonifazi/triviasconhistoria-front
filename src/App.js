import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TriviaPage from "./pages/TriviaPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PanelPage from "./pages/panel/PanelPage";
import theme from "./theme";
import TriviaSummaryPage from "./pages/TriviaSummaryPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import SearchPage from "./pages/SearchPage";
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRout";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questions/:id" element={<TriviaPage />} />
              <Route path="/trivia/resumen" element={<TriviaSummaryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/panel" element={<PanelPage />} />
              </Route>
            </Routes>
            <br />
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
