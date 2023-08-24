import React from "react";
import TableImg from "../table-allocation.png";
import Image from "next/image";

function TableAllocation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
      }}
    >
      <div>
        <h1>Table Allocation</h1>
      </div>
      <div style={{
        marginTop: "2rem",
        padding: "3rem",
      }}>
        <Image width={500} height={800} src={TableImg} alt="Table Allocation" />
      </div>
    </div>
  );
}

export default TableAllocation;
