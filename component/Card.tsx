import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/iesl.png";

const TicketCard: React.FC = () => {
  return (
    // <div className="max-w-full flex items-center justify-between mt-2 mb-2 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <div className="">
    //     <a href="#">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         Noteworthy technology acquisitions 2021
    //       </h5>
    //     </a>
    //     <a href="#">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         Noteworthy technology acquisitions 2021
    //       </h5>
    //     </a>
    //     <a href="#">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         Noteworthy technology acquisitions 2021
    //       </h5>
    //     </a>
    //   </div>
    //   <div>
    //     <span className="text-sm font-medium text-gray-900 dark:text-gray-200">dfdfg</span>
    //   </div>
    // </div>

    <div
      className="w-full mt-2 relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark"
      data-wow-delay=".1s"
    >
      <div className="p-2 sm:p-2 md:py-2 md:px-2 lg:p-2 xl:py-2 xl:px-2 2xl:p-2">
        <div className="sm:flex justify-around align-middle">
          <div className="justify-around align-middle w-full h-full flex-1 flex">
          <p className=" text-xl mt-1 font-medium text-body-color sm:mt-4 ">
              Table No :
            </p>
            <h3 className="block text-4xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-6xl">
              K-93
            </h3>
         
          </div>
          <div className="flex items-center flex-1">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By Jenny kelly
                </h4>
                <p className="text-xs text-body-color">Sold By</p>
              </div>
            </div>
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  John Doe
                </h4>
                <p className="text-xs text-body-color">Ticket Holder</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                23
              </h4>
              <p className="text-xs text-body-color">Ticket No</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
