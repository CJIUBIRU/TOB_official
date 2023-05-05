import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../App.css";

function ExchangeGoodsTable({ key, id, name, store, quantity, state, availability, received, exchangeList, setExchangeList }) {
    const btnDashStyle = {
        backgroundColor: "#002B5B",
        width: "30px",
        height: "30px",
        paddingTop: "0px",
        textAlign: "left",
        border: "none",
        borderRadius: "100px",
        marginLeft: "3px",
        marginRight: "3px",
    };
    const btnAddStyle = {
        backgroundColor: "#002B5B",
        width: "30px",
        height: "30px",
        paddingTop: "0px",
        textAlign: "left",
        border: "none",
        borderRadius: "100px",
        marginLeft: "3px",
        marginRight: "3px",
        paddingLeft: "9px",
    };
    const inputStyle = {
        border: "1.5px solid #90AACB",
        width: "20%",
        height: "30px",
    };

    const [newInput, setNewInput] = useState({ id: '', exchangeQuantity: 1 })
    // console.log(newInput);

    function handleClickAdd(checkId) {
        // alert(`id: ${checkId}`)
        let val = Number(newInput.exchangeQuantity) + 1;
        if (val <= availability) {
            let updatedNewInput = { id: checkId, exchangeQuantity: val }
            setNewInput(updatedNewInput);
            updateExchangeList(updatedNewInput);
        }
    }

    function handleClickMinus(checkId) {
        // alert(`id: ${checkId}`)
        let val = Number(newInput.exchangeQuantity) - 1;
        if (val < 1) {
            let updatedNewInput = { id: checkId, exchangeQuantity: 1 };
            setNewInput(updatedNewInput);
            updateExchangeList(updatedNewInput);
        }
        else {
            let updatedNewInput = { id: checkId, exchangeQuantity: val };
            setNewInput(updatedNewInput);
            updateExchangeList(updatedNewInput);
        }
    }

    function handleInput(id, value) {
        // alert(`id: ${id}, value: ${value}`)
        if (Number(value) >= 1 && Number(value) <= Number(availability)) {
            let updatedNewInput = { id: id, exchangeQuantity: Number(value) };
            setNewInput(updatedNewInput);
            updateExchangeList(updatedNewInput);
        }
        else if (Number(value) > Number(availability)) {
            let updatedNewInput = { id: id, exchangeQuantity: Number(availability) };
            setNewInput(updatedNewInput);
            updateExchangeList(updatedNewInput);
        }
    }

    function updateExchangeList(updatedNewInput) {
        let updatedExchangeList = exchangeList.map(item => {
            if (item.id === updatedNewInput.id) {
                return updatedNewInput;
            } else {
                return item;
            }
        });
        setExchangeList(updatedExchangeList);
    }

    function handleCheck(checkedId, isChecked) {
        // alert(`id: ${checkedId}, isChecked: ${isChecked}`)
        if (newInput.exchangeQuantity === 1) {
            if (isChecked) {
                let newExchangeList = { id: checkedId, exchangeQuantity: 1 };
                setNewInput(newExchangeList);
                // append id into exchangeList
                setExchangeList(prevList => [...prevList, newExchangeList]);
            } else {
                // remove the specific id in exchangeList
                setExchangeList(prevList => prevList.filter(item => item.id !== checkedId));
            }
        } else {
            if (isChecked) {
                // append id into exchangeList
                setExchangeList(prevList => [...prevList, newInput]);
            } else {
                // remove the specific id in exchangeList
                setExchangeList(prevList => prevList.filter(item => item.id !== checkedId));
            }
        }

    }

    return (
        <>
            <td scope="row" data-th = "#"  key={key}>
                {
                    (availability <= 0 || state === '徵求完畢')
                        ? (
                            <Form.Check
                                disabled
                                id={id}
                                aria-label={id}
                                onChange={(e) => handleCheck(e.target.id, e.target.checked)}
                            />
                        )
                        : (
                            <Form.Check
                                id={id}
                                aria-label={id}
                                onChange={(e) => handleCheck(e.target.id, e.target.checked)}
                            />
                        )
                }
            </td>
            <td data-th = "物資名稱" >{name}</td>
            <td data-th = "提供物資商家" >{store}</td>
            <td data-th = "物資需求狀態">{state}</td>
            <td data-th = "需求數量">{quantity}</td>
            <td data-th = "可兌換數量">{availability}</td>
            <td data-th = "已兌換數量">{received}</td>
            <td data-th = "欲兌換數量">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        lineHeight: "30px",
                    }}
                >
                    {
                        (availability <= 0 || state === '徵求完畢')
                            ? (
                                <>
                                    <Button disabled id={id} style={btnDashStyle} variant="primary" onClick={(e) => handleClickMinus(e.target.id)}>
                                        -
                                    </Button>
                                    <Form.Control
                                        disabled
                                        id={id}
                                        type="text"
                                        style={inputStyle}
                                        value="0"
                                        onChange={(e) => handleInput(e.target.id, e.target.value)}
                                    />
                                    <Button disabled id={id} style={btnAddStyle} variant="primary" onClick={(e) => handleClickAdd(e.target.id)}>
                                        +
                                    </Button>
                                </>
                            )
                            : (
                                <>
                                    <Button id={id} style={btnDashStyle} variant="primary" onClick={(e) => handleClickMinus(e.target.id)}>
                                        -
                                    </Button>
                                    <Form.Control
                                        id={id}
                                        type="text"
                                        style={inputStyle}
                                        value={newInput.exchangeQuantity}
                                        onChange={(e) => handleInput(e.target.id, e.target.value)}
                                    />
                                    <Button id={id} style={btnAddStyle} variant="primary" onClick={(e) => handleClickAdd(e.target.id)}>
                                        +
                                    </Button>
                                </>
                            )
                    }
                </div>
            </td>
        </>
    )
}

export default ExchangeGoodsTable;