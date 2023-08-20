import React from "react";
import TableImg from "../table-allocation.jpg";
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
      <div>
        <Image width={500} height={800} src={TableImg} alt="Table Allocation" />
      </div>
    </div>
  );
}

export default TableAllocation;
