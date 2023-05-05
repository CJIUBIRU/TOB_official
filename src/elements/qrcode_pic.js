import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
// import img from "../img/tablet.jpg";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";


function Qrcode_pic(props) {

    return (
        <div>
            <p>兌換條碼：{props.QRcodeId}</p>
            <QRCode
                style={{ width: "200px", height: "200px" }}
                value={`https://donation-platform-54f2b.web.app/allQrcodeData?id=${props.QRcodeId}`}
            />
            <div style={{ color: "#e74a3b", paddingTop: "10px", fontWeight: "bold" }}>
                ※注意：請至合作店家櫃台，出示此QRCode，即可領取物資。
            </div>
        </div>
    );
}

export default Qrcode_pic;
