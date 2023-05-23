import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { db } from "../utils/firebase";
import { Chart } from "react-google-charts";
import { collection, query, onSnapshot } from "firebase/firestore";

function ExpChart() {
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
        let originalData = []
        const colorMap = [
            "#66cccc",
            "#99d8b9",
            "#77a88d",
            "#ff9966",
            "#fe7a7b",
            "#ffcc66",
            "#ccabd8"
        ];
        const q = query(collection(db, "supply"))

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                originalData.push({
                    ...doc.data(),
                });
            });

            const storeCounts = {};

            for (const item of originalData) {
                if (storeCounts[item.store]) {
                    storeCounts[item.store]++;
                } else {
                    storeCounts[item.store] = 1;
                }
            }

            const data2 = [
                ["Element", "合作店家累積上架費", { role: "style" }]
            ];

            for (const [index, store] of Object.keys(storeCounts).entries()) {
                const color = colorMap[index];
                data2.push([store, storeCounts[store], color]);
            }

            setData(data2)
        });
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

export default ExpChart;
