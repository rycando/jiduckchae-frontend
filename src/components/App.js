import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch } from "react-router-dom"
import Auth from "../hoc/auth"
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadPage from "./views/UploadPage/UploadPage";
import MyPage from './views/MyPage/MyPage';
import EntUploadPage from './views/EntUploadPage/EntUploadPage';
import ArtistUploadPage from './views/ArtistUploadPage/ArtistUploadPage';
import ProdDetailPage from './views/ProdDetailPage/ProdDetailPage';
import ArtistDetailPage from './views/ArtistDetailPage/ArtistDetailPage';
import ProdModifyPage from './views/ProdModifyPage/ProdModifyPage'
// import Footer from "./views/Footer/Footer";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadPage, true)} />
          <Route exact path="/myPage" component={Auth(MyPage, true)} />
          <Route exact path="/uploadEnt" component={Auth(EntUploadPage, true)} />
          <Route exact path="/uploadArtist" component={Auth(ArtistUploadPage, true)} />
          <Route exact path="/prod/:prodId" component={Auth(ProdDetailPage, null)} />
          <Route exact path="/artist/:artistId" component={Auth(ArtistDetailPage, null)} />
          <Route exact path="/modify/:prodId" component={Auth(ProdModifyPage, true)} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
