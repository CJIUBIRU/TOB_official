import "../App.css";
import NavbarComp from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DonateList from "./DonateList";
import UploadDemand from "./UploadDemand";
import UploadDemandSec from "./UploadDemandSec";
import UploadDemandThird from "./UploadDemandThird";
import Signin from "./Signin";
import MyDemand from "./MyDemand";
import Profile from "./Profile";
import DonateListSec from "./DonateListSec";
import DonateListThird from "./DonateListThird";
import DonateRecord from "./DonateRecord";
import DonateRecordList from "./DonateRecordList";
import Process from "./Process";
import ProcessRecordList from "./ProcessRecordList";
import ViewRecord from "./ViewRecord";
import CharityInfo from "./CharityInfo";
import SetPassword from "./SetPassword";
import PasswordSuccess from "./PasswordSuccess";
import UploadSuccess from "./UploadSuccess";
import Charity from "./Charity";
import CharityDetail from "./CharityDetail";
import CharityInfoSuccess from "./CharityInfoSuccess";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationUpload from "./ApplicationUpload";
import ManagerProveData from "./ManagerProveData";
import PointsActivity from "./PointsActivity";
import PointsItem from "./PointsItem";
import PointsItemDetails from "./PointsItemDetails";
import PointsItemSuccess from "./PointsItemSuccess";
import ManagerProve from "./ManagerProve";
import ManagerProveMail from "./ManagerProveMail";
import SignUp from "./SignUp";
import UploadGoods from "./UploadGoods";
import UploadGoodsSec from "./UploadGoodsSec";
import ApplicationUpload2 from "./ApplicationUpload2";
import ApplicationUpload3 from "./ApplicationUpload3";
import ApplicationUpload4 from "./ApplicationUpload4";
import ForgetPasseord from "./ForgetPassword";
import UserUpdatePassword from "./UserUpdatePassword";
import AddStores from "./AddStores";
import UploadGoodsSuccess from "./UploadGoodsSuccess";
import AllGoods from "./AllGoods";
import AllStores from "./AllStores";
import UpdateStores from "./UpdateStores";
import UpdateGoods from "./UpdateGoods";
import SetUserName from "./SetUserName";
import UpdateMyDemand from "./UpdateMyDemand";
import QrcodePage from "./QrcodePage";
import AllQrcode from "./AllQrcode";
import AllQrcodeData from "./AllQrcodeData";
import CharityLogo from "./CharityLogo";
import Faq from "./Faq";
import FaqHome from "./FaqHome";
import Gain from "./Gain";
import Response from "./Response";
import ResponseSec from "./ResponseSec";
import ResponseThird from "./ResponseThird";
import ResponseSuccess from "./ResponseSuccess";
import ExchangeGoods from "./ExchangeGoods";
import ExchangeGoodsSec from "./ExchangeGoodsSec";
import ExchangeGoodsThird from "./ExchangeGoodsThird";
import AboutUs from "./AboutUs";
import QrCodeList from "../elements/qrCodeList";
import SetMailData from "./SetMailData";
import HomeNo from "./HomeNo";
import Home from "./Home";
import UploadOpenData from "./UploadOpenData";
import UploadOpenDataSuccess from "./UploadOpenDataSuccess";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeNo />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/uploadGoods" element={<UploadGoods />} />
          <Route path="/uploadGoodsSec" element={<UploadGoodsSec />} />
          <Route path="/signIn" element={<Signin />} />
          <Route path="/donateList" element={<DonateList />} />
          <Route path="/uploadDemandSec" element={<UploadDemandSec />} />
          <Route path="/uploadDemand" element={<UploadDemand />} />
          <Route path="/uploadDemandThird" element={<UploadDemandThird />} />
          <Route path="/myDemand" element={<MyDemand />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donateListSec" element={<DonateListSec />} />
          <Route path="/donateListThird" element={<DonateListThird />} />
          <Route path="/process" element={<Process />} />
          <Route path="/processRecordList" element={<ProcessRecordList />} />
          <Route path="/viewRecord" element={<ViewRecord />} />
          <Route path="/applicationInfo" element={<ApplicationInfo />} />
          <Route path="/applicationUpload" element={<ApplicationUpload />} />
          <Route path="/applicationUpload2" element={<ApplicationUpload2 />} />
          <Route path="/applicationUpload3" element={<ApplicationUpload3 />} />
          <Route path="/applicationUpload4" element={<ApplicationUpload4 />} />
          <Route path="/uploadSuccess" element={<UploadSuccess />} />
          <Route path="/managerProve" element={<ManagerProve />} />
          <Route path="/managerProveMail" element={<ManagerProveMail />} />
          <Route path="/managerProveData" element={<ManagerProveData />} />
          <Route path="/setPassword" element={<SetPassword />} />
          <Route path="/passwordSuccess" element={<PasswordSuccess />} />
          <Route path="/charityInfo" element={<CharityInfo />} />
          <Route path="/charityInfoSuccess" element={<CharityInfoSuccess />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/charityDetail" element={<CharityDetail />} />
          <Route path="/pointsActivity" element={<PointsActivity />} />
          <Route path="/pointsItem" element={<PointsItem />} />
          <Route path="/pointsItemDetails" element={<PointsItemDetails />} />
          <Route path="/pointsItemSuccess" element={<PointsItemSuccess />} />
          <Route path="/forgetPassword" element={<ForgetPasseord />} />
          <Route path="/userUpdatePassword" element={<UserUpdatePassword />} />
          <Route path="/addStores" element={<AddStores />} />
          <Route path="/uploadGoodsSuccess" element={<UploadGoodsSuccess />} />
          <Route path="/allGoods" element={<AllGoods />} />
          <Route path="/allStores" element={<AllStores />} />
          <Route path="/updateStores" element={<UpdateStores />} />
          <Route path="/updateGoods" element={<UpdateGoods />} />
          <Route path="/setUserName" element={<SetUserName />} />
          <Route path="/donateRecord" element={<DonateRecord />} />
          <Route path="/donateRecordList" element={<DonateRecordList />} />
          <Route path="/updateMyDemand" element={<UpdateMyDemand />} />
          <Route path="/qrcodePage" element={<QrcodePage />} />
          <Route path="/allQrcode" element={<AllQrcode />} />
          <Route path="/allQrcodeData" element={<AllQrcodeData />} />
          <Route path="/charityLogo" element={<CharityLogo />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faqHome" element={<FaqHome />} />
          <Route path="/gain" element={<Gain />} />
          <Route path="/response" element={<Response />} />
          <Route path="/responseSec" element={<ResponseSec />} />
          <Route path="/responseThird" element={<ResponseThird />} />
          <Route path="/responseSuccess" element={<ResponseSuccess />} />
          <Route path="/exchangeGoods" element={<ExchangeGoods />} />
          <Route path="/exchangeGoodsSec" element={<ExchangeGoodsSec />} />
          <Route path="/exchangeGoodsThird" element={<ExchangeGoodsThird />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/setMailData" element={<SetMailData />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uploadOpenData" element={<UploadOpenData />} />
          <Route path="/uploadOpenDataSuccess" element={<UploadOpenDataSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
