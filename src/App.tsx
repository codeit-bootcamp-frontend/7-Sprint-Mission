import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header.tsx";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Authentication/Login.tsx";
import Signup from "./pages/Authentication/Signup.tsx";
import MyPage from "./pages/Mypage/Mypage.tsx";
import Items from "./pages/Items/Items.tsx";
import AddItem from "./pages/Items/AddItem/AddItem.tsx";
import EditItem from "./pages/Items/AddItem/EditItem.tsx";
import Community from "./pages/Community/Community.tsx";
import ProductDetail from "./pages/Items/ProductDetail/ProductDetail.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ProductDetail />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/edititem/:id" element={<EditItem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
