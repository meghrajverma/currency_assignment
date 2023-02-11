/** @format */
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useSelector } from "react-redux";

export default function DemoColumn() {
  const [row, setRow] = useState([]);
  const [collumn, setCollumn] = useState([]);
  const currencyValue = useSelector((state) => state.currencyState.currency);

  useEffect(() => {
    let rows = [];
    let cols = [];
    currencyValue?.currency_dropdown.map((data) => {
      let lbl = data?.label;
      rows.push(lbl);
      let val = data?.value;
      cols.push(val);
    });
    setRow(rows);
    setCollumn(cols);
  }, [currencyValue]);

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: row,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: collumn,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <>
      <ReactEcharts
        option={options}
        style={{ width: "600px", height: "300px" }}
      ></ReactEcharts>
    </>
  );
}
