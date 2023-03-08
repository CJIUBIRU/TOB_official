import React, { useState, useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../navLinkCharity.css";

function Task({ id, email, level, name }) {
  const [user] = useAuthState(auth);
  return (
    <div>
      {email === user.email && level === "charity" && (
        <div>
          <NavDropdown
            title="登出"
            id="basic-nav-dropdown"
            style={{ fontSize: "17px" }}
          >
            <div style={{ textAlign: "center" }}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="profilePhoto"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                ></img>
              )}
              {!user.photoURL && (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                    backgroundColor: "#fef1e6",
                    textAlign: "center",
                    marginLeft: "34%",
                    fontSize: "13px",
                  }}
                >
                  使用者
                </div>
              )}
              {/* {!user.displayName && <h6>使用者，您好！</h6>}
                {user.displayName && <h6>{user.displayName}，您好！</h6>} */}
              <h6>{name}，您好！</h6>
              <Button
                onClick={() => auth.signOut()}
                style={{
                  backgroundColor: "#002B5B",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                登出
              </Button>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/faq"
                href="#action/3.3"
                style={{ fontWeight: "bold", color: "#002B5B" }}
              >
                常見問題
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/profile"
                href="#action/3.4"
                style={{ fontWeight: "bold", color: "#002B5B" }}
              >
                個人檔案管理
              </NavDropdown.Item>
            </div>
          </NavDropdown>
        </div>
      )}
      {email === user.email && level === "admin" && (
        <div>
          <NavDropdown
            title="登出"
            id="basic-nav-dropdown"
            style={{ fontSize: "17px" }}
          >
            <div style={{ textAlign: "center" }}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="profilePhoto"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                ></img>
              )}
              {!user.photoURL && (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                    backgroundColor: "#fef1e6",
                    textAlign: "center",
                    marginLeft: "34%",
                    fontSize: "13px",
                  }}
                >
                  使用者
                </div>
              )}
              {/* {!user.displayName && <h6>使用者，您好！</h6>}
                {user.displayName && <h6>{user.displayName}，您好！</h6>} */}
              <h6>{name}，您好！</h6>
              <Button
                onClick={() => auth.signOut()}
                style={{
                  backgroundColor: "#069A8E",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                登出
              </Button>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/faq"
                href="#action/3.3"
                style={{ fontWeight: "bold", color: "#069A8E" }}
              >
                常見問題
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/profile"
                href="#action/3.4"
                style={{ fontWeight: "bold", color: "#069A8E" }}
              >
                個人檔案管理
              </NavDropdown.Item>
            </div>
          </NavDropdown>
        </div>
      )}
      {email === user.email && level === "member" && (
        <div>
          <NavDropdown
            title="登出"
            id="basic-nav-dropdown"
            style={{ fontSize: "17px" }}
          >
            <div style={{ textAlign: "center" }}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="profilePhoto"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                ></img>
              )}
              {!user.photoURL && (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginBottom: "15px",
                    marginTop: "10px",
                    backgroundColor: "#fef1e6",
                    textAlign: "center",
                    marginLeft: "34%",
                    fontSize: "13px",
                  }}
                >
                  使用者
                </div>
              )}
              {/* {!user.displayName && <h6>使用者，您好！</h6>} */}
              <h6>{name}，您好！</h6>
              <Button
                onClick={() => auth.signOut()}
                style={{
                  backgroundColor: "#F58D59",
                  border: "none",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                登出
              </Button>
            </div>

            <NavDropdown.Divider style={{ marginTop: "20px" }} />
            <NavDropdown.Item
              as={Link}
              to="/process"
              href="#action/3.1"
              style={{ fontWeight: "bold", color: "#F58D59" }}
            >
              認購進度追蹤
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/donateRecord"
              href="#action/3.3"
              style={{ fontWeight: "bold", color: "#F58D59" }}
            >
              認購紀錄
            </NavDropdown.Item>
            {/* <NavDropdown.Item
              as={Link}
              to="/viewRecord"
              href="#action/3.3"
              style={{ fontWeight: "bold", color: "#F58D59" }}
            >
              瀏覽紀錄
            </NavDropdown.Item> */}
            <NavDropdown.Item
              as={Link}
              to="/faq"
              href="#action/3.3"
              style={{ fontWeight: "bold", color: "#F58D59" }}
            >
              常見問題
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              as={Link}
              to="/profile"
              href="#action/3.4"
              style={{ fontWeight: "bold", color: "#F58D59" }}
            >
              個人檔案管理
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </div>
  );
}
function Logout() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <h3
        style={{
          textAlign: "center",
          color: "#002b5b",
          fontWeight: "bold",
          height: "0px",
          lineHeight: "65px",
        }}
      >
        網頁載入中...
      </h3>
    );
  return (
    <div>
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          level={item.data.level}
          email={item.data.email}
          name={item.data.name}
        />
      ))}
    </div>
  );
}

export default Logout;
