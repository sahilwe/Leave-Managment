import { commonrequest }  from "../APIcall";
import { BACKEND_URL } from "../helper";

export const GetAccountInfo = async(data) => {
    return await commonrequest("POST", `${BACKEND_URL}/User/Home`, data);
}

export const LeaveLogs = async(data) => {
    return await commonrequest("POST", `${BACKEND_URL}/User/Logs`, data)
}
