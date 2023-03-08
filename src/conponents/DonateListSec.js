import { Container } from "react-bootstrap";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ProductStep2 from "../elements/productStep2";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import Button from "../elements/button";

const DonateList = () => {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const donPageStyle = {
    marginTop: "70px",
  };
  const nextStepStyle = {
    marginLeft: "10px",
  };
  const returnStepStyle = {
    marginLeft: "39%",
  };
  const stepBtnStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "40px",
    marginTop: "20px",
  };
  return (
    <div>
      <Navbar />
      <div style={donPageStyle}>
        <TitleSec name="捐贈物資列表" color="#F4D19B"/>
        <Container>
          <TitleStep color="#F58D59" name="STEP2&nbsp;-&nbsp;填寫資料" />
          <div>
            <ProductStep2 />
          </div>
          <div>
            <ProductStep2 />
          </div>
          <div style={stepBtnStyle}>
            <div style={returnStepStyle}>
              <Button color="#F58D59" to="/donate" name="返回" />
            </div>
            <div style={nextStepStyle}>
              <Button color="#F58D59" to="/donateListThird" name="下一步" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DonateList;
