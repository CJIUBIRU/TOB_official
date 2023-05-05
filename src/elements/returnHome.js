import React from "react";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

function ReturnHome() {
  return (
    <div>
      <Button
        as={Link}
        to="/"
        className="homeBtnStyle"
        variant="primary"
        type="button"
      >
        {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
        <FontAwesomeIcon icon={faArrowRotateLeft} />
        &nbsp;&nbsp;回首頁
      </Button>
    </div>
  );
}

export default ReturnHome;
