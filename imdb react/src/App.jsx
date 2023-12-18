import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSetRecoilState } from "recoil";
import { configUrlState } from "./recoilState";
// import ProtectedRoute from "./components/ProtectedRoute";

// Swiper
// import Swiper from "swiper";
// import { Navigation } from "swiper/modules";
// // import Swiper and modules styles
// import "swiper/css";
// import "swiper/css/navigation";
// // init Swiper:
// const swiper = new Swiper(".swiper", {
//   // configure Swiper to use modules
//   modules: [Navigation],
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

function App() {
  const setConfigUrl = useSetRecoilState(configUrlState);

  useEffect(() => {
    const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
        const configUrl = {
          // backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          // profile: res.images.secure_base_url + "original",
        };
        setConfigUrl(configUrl);
      });
    };
    fetchApiConfig();
  }, [setConfigUrl]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
