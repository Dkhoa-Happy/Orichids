import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Main from "./components/Main";
import { ThemeProvider } from "./ThemeContext";
import Detail from "./components/detail/detail";
import "./index.css";
import ContactUs from "./pages/Contact/Contact";
import AboutUs from "./pages/AboutUs/AboutUs";
import News from "./pages/NewsPage/news";
import Origin from "./pages/OriginPage/origin";
import Dashboard from "./pages/DashBoard/dashboard";
import Protected from "./Protected Route/protectedRoute";
import Add from "./pages/AddPage/add";
import EditPage from "./pages/EditPage/editPage";
import Login from "./components/Login/Login";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/natural" element={<Origin />}></Route>
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        ></Route>
        <Route
          path="/add"
          element={
            <Protected>
              <Add />
            </Protected>
          }
        ></Route>
        <Route
          path="/edit"
          element={
            <Protected>
              <EditPage />
            </Protected>
          }
        ></Route>
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
