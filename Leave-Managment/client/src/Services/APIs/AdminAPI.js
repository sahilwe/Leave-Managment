import { commonrequest } from "../APIcall";
import { BACKEND_URL } from "../helper";

export const usergetfunc = async (search, gender, status, sort, page) => {
  return await commonrequest(
    "GET",
    `${BACKEND_URL}/admin/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
    ""
  );
};

export const deletfunc = async (id) => {
  return await commonrequest(
    "DELETE",
    `${BACKEND_URL}/admin/delete/${id}`,
    {}
  );
};

export const registerfunc = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/admin/register`,
    data,
    header
  );
};

export const singleUsergetfunc = async (id) => {
  return await commonrequest(
    "GET",
    `${BACKEND_URL}/admin/${id}`,
    ""
  );
};

export const editfunc = async (id, data, header) => {
  return await commonrequest(
    "PUT",
    `${BACKEND_URL}/admin/${id}`,
    data,
    header
  );
};

export const ALeaveLogs = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/admin/Logs`,
    data
  );
};



export const statuschangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BACKEND_URL}/Admin/status/${id}`,{data})
}