/** @format */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "./App.css";
import DemoColumn from "./graph";
import { useCurrencyMutation } from "./Redux/services/currencyApi";

function App() {
  const [currencyListApi, { isLoading }] = useCurrencyMutation();
  const currencyValue = useSelector((state) => state.currencyState.currency);

  useEffect(() => {
    console.log("currencyValue : ", currencyValue);
  }, [isLoading, currencyValue]);

  useEffect(() => {
    getCurrencyValue(currencyValue?.base_code);
  }, [currencyValue.base_code]);

  const getCurrencyValue = (cur) => {
    currencyListApi(cur);
  };

  const handleChange = (value, option) => {
    let lables = JSON.parse(JSON.stringify(option));
    getCurrencyValue(lables?.label);
  };

  return (
    <div className="App">
      <div className="select">
        <h5>Select Currency :</h5>
        <Select
          defaultValue={currencyValue?.base_code}
          style={{ width: 120 }}
          onSelect={(a, b) => handleChange(a, b)}
          options={currencyValue?.currency_dropdown}
        />
      </div>
      <div className="chart">
        <DemoColumn />
      </div>
    </div>
  );
}

export default App;
