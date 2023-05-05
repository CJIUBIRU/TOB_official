import React from "react";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Accordion from "react-bootstrap/Accordion";
import { Container } from "react-bootstrap";
import "../App.css";

function Faq() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="常見問題" color="#F4D19B" />
      <div style={{ marginBottom: "50px" }}>
        <Container>
          <div style={{ width: "80%", marginLeft: "10%" }}>
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【認識我們】
            </p>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>關於捐捐不息？</span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  「捐捐不息，愛心長流」為我們團隊的核心理念，希冀大眾捐贈的善行能永不止息，並透過捐捐不息此平台，透過物資認購，突破現有物資捐贈的困境，將大眾的愛心廣流至臺灣各地，溫暖不曾被發現的角落。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    捐捐不息如何運作
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  我們與便利商店或量販店進行合作，合作機構從商家所販賣之常態性商品中提出物資需求，認購者於線上認購物資，進行線上付款後，合作機構便能向鄰近商家兌換物資，達成其物資需求。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【合作機構-註冊登入】
            </p>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何成為合作機構？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要三步驟，就能輕鬆成為合作機構：
                  <br />
                  （1）點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【成為合作機構】
                  </span>
                  ，上傳註冊切結書、法人登記書等相關文件
                  <br />
                  （2）待系統人員審核後（約需3至5個工作天），便會將審核結果寄送至您的電子信箱，開啟信件，按下認證連結，設定密碼。
                  <br />
                  （3）密碼設定完成後，可進一步上傳機構簡介，提出物資需求。
                  <br />
                  歡迎
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    點選這裡
                  </span>
                  ，立刻註冊成為合作機構吧！
                  <br />
                  <span style={{ color: "#e74a3b" }}>
                    特別提醒：須於審核結果寄送後7天內進行查收，否則須重新申請。
                  </span>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    為什麼要提供那麼多資料才能成為合作機構？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  為符合物資認購合法性與正當性，以及讓認購者安心認購，我們要求合作機構須為政府立案之合法機構，而為進行驗證才會請您提供相關資料，感謝您的配合。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    忘記密碼怎麼辦？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  若您忘記登入密碼，請點擊「登入」頁面的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【忘記密碼，請點擊這裡】
                  </span>
                  提交申請。系統會發送認證連結至您登記的電子郵件信箱；登入後，系統將請您重設密碼。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【合作機構-物資領取】
            </p>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何提出物資需求？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要四步驟，就能輕鬆提出物資需求：
                  <br />
                  （1）點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【刊登物資需求】
                  </span>
                  ，進入「刊登物資需求」頁面。 <br />
                  （2）選擇所有想要的需求物資。 <br />
                  （3）填寫物資需求數量及說明。 <br />
                  （4）再次確認物資需求。
                  <br />
                  若想要對物資需求進行更動，也可再次
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    修改或刪除物資需求
                  </span>
                  。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    沒有我想要的需求物資怎麼辦？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  很抱歉造成您的不便，需求物資以合作的便利商店或量販店所販賣之常態性商品為可選擇項目，期待未來也能提供更多樣化的商品作為需求物資，滿足您的需求，感謝您的諒解。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    物資需求是否有募集期限？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  沒有，若您沒有自行刪除該物資需求，您所提出的物資需求會持續募集至達成需求數量。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何修改物資需求？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要三步驟，就能輕鬆修改物資需求：
                  <br />
                  （1） 點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【我的需求】
                  </span>
                  ，進入「我的需求」頁面。
                  <br />
                  （2） 點擊【修改】的圖示，並重新輸入或修改需求數量及說明。
                  <br />
                  （3） 再次確認物資需求後便可成功修改物資需求。
                  <br />
                  <span style={{ color: "#e74a3b" }}>
                    特別提醒：須注意修改物資需求次數有一定上限，若超過次數上限，恕無法修改物資需求。
                  </span>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何刪除物資需求？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【我的需求】
                  </span>
                  ，在進入「我的需求」頁面後，點擊【刪除】的圖示，並再次確認欲刪除物資需求後，便可成功刪除物資需求。
                  <br />
                  <span style={{ color: "#e74a3b" }}>
                    特別提醒：若已有認購者進行認購，該物資需求則無法進行刪除。
                  </span>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何查看可/已領取數量？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    我的需求
                  </span>
                  ，在進入「我的需求」頁面後，便可查看每個物資需求目前可/已領取數量。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何獲得取件條碼？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要四步驟，就能輕鬆獲得取件條碼：
                  <br />
                  （1）點選導覽列上的我要兌換，進入「我要兌換」頁面。
                  <br />
                  （2）選取所有欲兌換之可領取物資。
                  <br />
                  （3）輸入各物資欲兌換的數量。
                  <br />
                  （4）再次確認欲兌換資訊後，平台便會生成【取件條碼】。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>如何領取物資？</span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要三步驟，就能輕鬆領取物資：
                  <br />
                  （1）點選導覽列上的我的兌換條碼，進入「我的兌換條碼」頁面。
                  <br />
                  （2）選取與欲兌換物資相符的兌換條碼。
                  <br />
                  （3）至合作商家出示此條碼並掃碼，便可領取物資。
                  <br />
                  <span style={{ color: "#e74a3b" }}>
                    特別提醒：須注意物資需求有領取期限，請於領取期限截止前進行領取。
                  </span>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    需求物資募集完畢是否需要自己刪除物資需求？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  不須擔心！我們會自動將該物資需求下架，避免不必要的誤會。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【認購者-註冊】
            </p>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何成為認購者？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【註冊/登入】
                  </span>
                  ，目前提供以一般電子郵件作為帳號，並設定密碼後，便可完成註冊；或是可透過Google及Facebook帳號直接進行註冊。
                  <br />
                  歡迎
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    點選這裡
                  </span>
                  ，立刻註冊成為認購者吧！
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    忘記密碼怎麼辦？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  若您忘記登入密碼，請點擊「登入」頁面的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【忘記密碼，請點擊這裡】
                  </span>
                  提交申請。系統會發送認證連結至您登記的電子郵件信箱；登入後，系統將請您重設密碼。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【認購者-物資認購】
            </p>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何進行物資認購？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  只要四步驟，就能輕鬆認購物資：
                  <br />
                  （1）點選導覽列上的【物資需求列表】，進入「物資需求列表」頁面。
                  <br />
                  （2）選擇欲認購物資，並點擊【加入認購箱】。點擊【】，進入「」頁面。
                  <br />
                  （3）輸入欲認購數量。
                  <br />
                  （4）確認認購物資資訊並進行付款。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    有哪些付款方式？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  我們透過綠界科技提供第三方支付線上金流服務，包含信用卡、ATM
                  轉帳、網路
                  ATM超商條碼、代碼等支付方式，也期待未來能提供給您更多元的支付方式。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    是否可以申請退款？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  很抱歉，目前並沒有提供退款的服務，請您於謹慎考慮後再進行付款。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    機構所提出的物資需求資訊是否正確且即時？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  是的，當認購者進行付款後，物資需求便會立即更新需求數量。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何追蹤物資認購的進度？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【認購進度追縱】
                  </span>
                  ，進入「認購進度追縱」頁面，目前物資認購的進度便會顯示於認購的每項物資右方。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            <p
              style={{ color: "#F58D59", fontWeight: "bold", fontSize: "18px" }}
            >
              【認購者-機構】
            </p>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    合作機構有哪些類型？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  目前有長者關懷、兒童教育、偏鄉教育等不同的類型，也期待未來會有更多不同類型的機構加入。
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span style={{ letterSpacing: "1.5px" }}>
                    如何了解機構的相關資訊？
                  </span>
                </Accordion.Header>
                <Accordion.Body
                  style={{ letterSpacing: "1.5px", lineHeight: "28px" }}
                >
                  點選導覽列上的
                  <span
                    style={{ textDecoration: "underLine", color: "#90aacb" }}
                  >
                    【合作機構一覽】
                  </span>
                  ，進入「合作機構一覽表」頁面，便可了解合作機構所協助的類型及聯絡資訊，並點擊【了解更多】，深入了解機構的相關資訊。
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Faq;
