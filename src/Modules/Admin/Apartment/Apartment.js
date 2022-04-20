import { Fragment, useState,useRef, useEffect } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { render } from 'react-dom';

import { Dialog,Menu, Transition } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid'
import {
  RiNotificationLine,
  RiDashboardLine,
  RiKeyLine,
  RiUserLine,
  RiSearch2Line,
  RiSecurePaymentLine,
  RiCalendarLine,
  RiShape2Line,
} from 'react-icons/ri';

// @ts-ignore
import reqwest from 'reqwest';

import 'antd/dist/antd.css';

import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';
import photo from '../../../Images/photo.png';

import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Apartment() {
  //The editor  library
  let _contentState = ContentState.createFromText('Sample content state');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);

  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [img, setImg] = useState([]);
  const [pagination, setPagination] = useState({});

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const customFetch = async (params = {}) => {
    console.log('params:', params);
    setIsLoading(true);
    const response = await reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 5,
      },
      type: 'json',
    });
    console.log('response.results', response.results);
    console.log('response.results phone', response.results.phone);

    setUserList(response.results);
    setIsLoading(false);
  };

  useEffect(() => {
    customFetch({});
  }, []);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'picture',

      sorter: (a, b) => (a.picture.thumbnail > b.picture.thumbnail ? 1 : -1),
      render: (picture) => (
        <div>
          <img className="-mr-16 rounded-md" src={picture.thumbnail} />
        </div>
      ),
      width: '1%',
    },

    {
      dataIndex: 'name',

      render: (name) => (
        <div>
          <label htmlFor="" className="font-semibold">
            {name.first} {name.last}
          </label>
          <p className="text-xx text-gray-600 font-light">Updated 1 day ago</p>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Service',

      render: () => (
        <div>
          <p className="font-semibold text-sm">#40,000</p>
        </div>
      ),

      sorter: (a, b) => (a.email.first > b.email.first ? 1 : -1),
    },
    {
      title: 'Date Created',
      dataIndex: '',

      render: () => (
        <div>
          <p className="font-semibold text-xs">Oct 24th, 2020</p>
          <p className="font-semibold text-xx">08:29 AM</p>
        </div>
      ),
      sorter: (a, b) =>
        a.gender.male > <b className="gender female"></b> ? 1 : -1,

      width: '20%',
    },
    {
      title: 'Residents',
      dataIndex: 'dob',
      render: () => (
        <div>
          <p className="font-semibold text-xs">37</p>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'nat',
      render: (dataIndex) =>
        dataIndex === 'FR' ? (
          <div className=" border p-1 border-green-600 rounded-3xl flex items-center justify-center">
           Active
          </div>
        ) : (
          <div className=" border p-1 border-red-400 rounded-3xl flex items-center justify-center">
            Inactive
          </div>
        ),
      width: '10%',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => (
        // <button
        //   type="button"
        //   // onClick={e => openModal(e)}
        //   className="px-4 py-2 text-xl font-medium text-black font-bold"
        // >
        //   ...
        // </button>


  <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="px-4 py-2 text-xl font-medium text-black font-bold">
            ...
           
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-32 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? ' text-white' : 'text-red-500'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                      
                        Suspend Access
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? ' text-white' : 'text-red-500'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                      
                        Delete
                      </button>
                    )}
                  </Menu.Item>
            </div>
           
          </Menu.Items>
        </Transition>
      </Menu>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    customFetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // setSelectedRowKeys({ selectedRowKeys });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  

  return (
    <div>












    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl border border-gray-100">
                <Dialog.Title
                  as="h3"
                  className="text-base font-medium leading-6 text-gray-900"
                >
                  New Apartment
                </Dialog.Title>

                <div className="w-12 h-12 bg-gray-300">
                  <img src={photo} alt="" />
                </div>
                <div className="mt-4">
                  <form action="">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="border border-gray-200 p-2 focus:outline-none rounded-sm"
                        placeholder="Enter Apartment name"
                      />
                    </div>

                    <div className="flex gap-2 mt-4 ">
                      <div className="flex flex-col w-1/2">
                        <label htmlFor="" className="text-xs mb-1">
                          Category
                        </label>
                        <select
                          name=""
                          className="border border-gray-200 p-2 focus:outline-none rounded-sm"
                          id=""
                        >
                          <option value="">Choose</option>
                          <option value="">Male</option>
                          <option value="">Female</option>
                        </select>
                      </div>

                      <div className="flex flex-col w-1/2">
                        <label htmlFor="" className="text-xs mb-1">
                          Service Fee
                        </label>
                        <input
                          type="date"
                          name=""
                          id=""
                          className="border border-gray-200 p-2 focus:outline-none rounded-sm"
                          placeholder="Enter service fee"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="" className="text-xs mb-1">
                        Apartment Details
                      </label>

                      <Editor
                        defaultContentState={contentState}
                        onContentStateChange={setContentState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                      />
                    </div>
                  </form>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm">
                    {' '}
                    Add Levy
                  </button>

                  <button
                    type="button"
                    className=" bg-customm p-color py-2  px-3 text-sm font-medium    rounded-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="flex">
        <LeftNavbar />

        <div className="w-10/12 flex flex-col  body-bg">
          <TopNavbar user="Apartments" />

          <div className="flex justify-between ml-12 w-11/12 items-center mt-8">
            <div className="bg-white p-2  w-3/12 rounded-2xl px-6 flex items-center">
              <input
                type="text"
                name=""
                placeholder="search here..."
                id=""
                className="focus:outline-none bg-transparent w-11/12"
              />

              <RiSearch2Line />
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">
                <RiCalendarLine />
                Generate Report
              </button>

              <button
                onClick={(e) => openModal(e)}
                className="button-bg py-2 px-3 text-white font-medium  text-xs  rounded-sm"
              >
                {' '}
                Add Apartment
              </button>
            </div>
          </div>

          <div className=" w-11/12 ml-12 mt-8">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={userList}
              loading={isLoading}
              onChange={handleTableChange}
              pagination={pagination}
              rowKey="email"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apartment;
