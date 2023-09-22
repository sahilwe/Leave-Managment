import React, { useContext, useEffect, useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";
import { addData, dltdata, updateData } from '../../components/context/ContextProvider';
import { usergetfunc, deletfunc } from "../../Services/APIs/AdminAPI";
import Alert from 'react-bootstrap/Alert';
import "./../../styles/AdminHome.css";
import Headers from "../../components/Headers/Headers";
import { toast } from 'react-hot-toast';

  const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData) || {};
  const { update, setUpdate } = useContext(updateData) || {};
  const { deletedata, setDLtdata } = useContext(dltdata) || {};

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/Admin/register");
  };

  // get user
  const userGet = useCallback(async () => {
    const response = await usergetfunc(search, gender, status, sort, page);
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  }, [search, gender, status, sort, page]);

  // user delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response.status === 200) {
      userGet();
      setDLtdata(response.data);
    } else {
      toast.error("error");
    }
  };

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage((prevPage) => {
      if (prevPage === 1) return prevPage;
      return prevPage - 1;
    });
  };

  // handle next btn
  const handleNext = () => {
    setPage((prevPage) => {
      if (prevPage === pageCount) return prevPage;
      return prevPage + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [userGet]);
  return (
    <>
    <Headers />
      {
        useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added</Alert> : ""
      }

      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Successfully Updated</Alert> : ""
      }

      {
        deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()} Successfully Delete</Alert> : ""
      }

<div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4 d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="success" className='search_btn'>Search</Button>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}><i className="fa-solid fa-plus"></i>&nbsp; Add User</Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* sort by value */}
            <div className="filter_newold">
              <h3>Sort By Time</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
