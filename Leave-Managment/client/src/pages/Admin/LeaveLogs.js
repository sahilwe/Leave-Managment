import React, { useState, useEffect } from "react";
import { ALeaveLogs, updateStatus } from '../../Services/APIs/AdminAPI';
import Navbar from './../../components/Sidebar/Navbar';
import Header from "../../components/Headers/Headers"
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { statuschangefunc } from "../../Services/APIs/AdminAPI"
import toast, { Toaster } from 'react-hot-toast';

const TransactionRecords = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
      const username = localStorage.getItem('currentUser');
      console.log("username: ", username);
  
      const fetchLeaveLogs = async () => {
        try {
          const response = await ALeaveLogs({ email: username });
          console.log(response);
          setTransactions(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchLeaveLogs();
    }, []);
  
    console.log('transactions:', transactions);
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleChange = async (id, status) => {
        const response = await statuschangefunc(id, status);
    
        if (response.status === 200) {
          
          toast.success("Status Updated")
        } else {
          toast.error("error ")
        }
      }

  return (
    <>
      
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Leave Logs</h1>
          </div>
          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(transactions) && transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {transaction.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {transaction.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {transaction.leavetype}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
  {formatDate(transaction.date)}
</td>
<td className='d-flex align-items-center'>
  <Dropdown className='text-center'>
    <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
      <Badge bg={transaction.status === "Accept" ? "primary" : "danger"}>
        {transaction.status} <i className="fa-solid fa-angle-down"></i>
      </Badge>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => handleChange(transaction.id, "Accept")}>Accept</Dropdown.Item>
      <Dropdown.Item onClick={() => handleChange(transaction.id, "Reject")}>Reject</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</td>

</tr>
))}
</tbody>
</table>
</div>
</main>
</div>
<Toaster position="top-right"
                    reverseOrder={false} />
</>
);
};

export default TransactionRecords;
