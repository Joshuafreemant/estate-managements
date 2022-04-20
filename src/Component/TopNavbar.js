

import { Fragment, useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import Dashboard from '../Modules/Admin/Dashboard/Dashboard';


import "antd/dist/antd.css";

import usericon from '../Images/usericon.png';
import notif from '../Images/notif.png';

function TopNavbar(props) {
    const { user } = props






    return (
        <>

            <div className="flex px-12 bg-white h-1/6 py-4 items-center justify-between">
                <div className="w-full  flex  items-center justify-between">
                    <h1 className="text-black text-lg font-semibold">{user}</h1>
                    <div className="w-5/12 bg-gray-100 h-00 rounded-3xl py-2 flex items-center px-8">
                        <input
                            type="text"
                            name=""
                            placeholder="search here..."
                            id=""
                            className="focus:outline-none bg-transparent w-11/12"
                        />

                        <RiSearch2Line />

                    </div>

                    <div className="border-r-1 text-lg">

                        <img src={notif} alt="" className="w-10 h-10" />

                    </div>

                    <div className="w-3/12 flex justify-between gap-4">
                        <div className="bg-black w-12 h-12 rounded-full">
                            <img src={usericon} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h4>Giovanni</h4>
                            <p className="text-xs -mt-1">Superadmin</p>
                        </div>

                        <div className="w-4/12">
                            <select name="" id="" className="border rounded-3xl px-4 py-2 w-11/12">
                                <option value="English">EN</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default TopNavbar
