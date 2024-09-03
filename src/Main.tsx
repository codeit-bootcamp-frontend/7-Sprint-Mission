import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage/HomePage";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import UsedMarketPage from "./pages/UsedMarketPage/UsedMarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import AddBoardPage from "./pages/AddBoardPage/AddBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import PrivacyPage from "./components/Layout/Footer/PrivacyPage";
import FaqPage from "./components/Layout/Footer/FaqPage";
import SignupAndLoginPage from "./pages/SignupAndLoginPage/SignupAndLoginPage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="boards" element={<BoardsPage />} />
          <Route path="board">
            <Route path=":id" element={<BoardPage />} />
          </Route>
          <Route path="items">
            <Route index element={<UsedMarketPage />} />
            <Route path=":productId" element={<ProductDetailPage />} />
          </Route>
          <Route path="addBoard" element={<AddBoardPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="edititem">
            <Route path=":id" element={<EditItemPage />} />
          </Route>
          <Route path="login" element={<SignupAndLoginPage />} />
          <Route path="signup" element={<SignupAndLoginPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
