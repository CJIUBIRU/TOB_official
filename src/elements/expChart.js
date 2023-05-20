import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { db } from "../utils/firebase";
import app from "../utils/firebase";
import { firebase } from "../utils/firebase";
import { Chart } from "react-google-charts";

function UploadGoods() {
    const cardStyle = {
        width: "90%",
        color: "black",
        left: "50%",
        marginTop: "35px",
        transform: `translate(${-50}%, ${-5}%)`,
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        letterSpacing: "1px",
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = app.firestore();
            const collectionRef = db.collection('stores');

            try {
                const snapshot = await collectionRef.get();
                const formattedData = [['Element', '合作店家累積上架費', { role: 'style' }]];

                snapshot.forEach((doc) => {
                    const { name, exp, color } = doc.data();
                    formattedData.push([name, exp, color]);
                });

                setData(formattedData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();    
    }, []);
    return (
        <div>
            <div style={{ marginBottom: "50px" }}>
                <Card style={cardStyle}>
                    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
                </Card>
            </div>
        </div>
    );
}

export default UploadGoods;
