const users = require("../../Database/Models/userSchema");
const usermodel= require("./../../Database/Models/UserModel")
const moment = require('moment');



// register user
exports.userpost = async (req, res) => {
    const { fname, lname, email, mobile, gender, position, branch } = req.body;
  
    if (!fname || !lname || !email || !mobile || !gender || !branch || !position) {
      return res.status(400).json('All inputs are required');
    }
  
    try {
      const preuser = await users.findOne({ email: email });
  
      if (preuser) {
        return res.status(400).json('This user already exists in our database');
      } else {
        const datecreated = moment().format('YYYY-MM-DD hh:mm:ss');
  
        const userData = new users({
          fname,
          lname,
          email,
          mobile,
          gender,
          position,
          branch,
          datecreated,
        });
  
        await userData.save();
        return res.status(200).json(userData);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  };


// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// userget
exports.userget = async (req, res) => {

    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4;


    const query = {
        fname: { $regex: search, $options: "i" }
    }

    if (gender !== "All") {
        query.gender = gender
    }

    if (status !== "All") {
        query.status = status
    }

    try {

        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await users.countDocuments(query);

        const usersdata = await users.find(query)
            .sort({ datecreated: sort == "new" ? -1 : 1 })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            usersdata
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

// chnage status
exports.userstatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const userstatusupdate = await users.findByIdAndUpdate({ _id: id }, { status: data }, { new: true });
        res.status(200).json(userstatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}

// single user get
exports.singleuserget = async (req, res) => {

    const { id } = req.params;

    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, location, status, profile: file, dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getAllLeaveRequests = async (req, res) => {
  try {
    // Retrieve all leave requests from the database
    const leaveRequests = await usermodel.find();

    // Map the leave requests to include the required fields
    const transactions = leaveRequests.map((request) => ({
      id: request._id,
      status: request.status,
      email: request.email,
      leavetype: request.leavetype,
      date: request.createdAt,
    }));

    console.log('Leave Requests:', transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateTransactionStatus = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const { status } = req.body;
  
      // Update the status in the user model using the transactionId
      const user = await usermodel.findOneAndUpdate(
        { transactions: { $elemMatch: { id: transactionId } } },
        { $set: { 'transactions.$.status': status } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User or transaction not found' });
      }
  
      // Update the status in the leave request model
      const leaveRequest = user.transactions.find((transaction) => transaction.id === transactionId);
      if (!leaveRequest) {
        return res.status(404).json({ status: 'error', message: 'Leave request not found' });
      }
  
      leaveRequest.status = status;
      await user.save();
  
      res.json({ status: 'success', data: leaveRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Failed to update transaction status' });
    }
  };
  

exports.userstatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const userstatusupdate = await usermodel.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );

    if (!userstatusupdate) {
      // If userstatusupdate is null or undefined
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userstatusupdate);
  } catch (error) {
    console.log(error); // Log the error for debugging purposes

    res.status(500).json({ error: 'Internal server error' });
  }
};
