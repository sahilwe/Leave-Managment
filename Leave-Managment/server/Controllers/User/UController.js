const users = require("../../Database/Models/userSchema");
const UserModel = require("../../Database/Models/UserModel");

exports.getAccountInfo = async (req, res) => {
    try {
        const {email} = req.body;
        const accountTableData = await users.findOne({email});

        const responseData = {accountTableData: accountTableData};
        res.status(200).json(responseData);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error" });
      }
};

 
exports.leaveControl = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      startdate,
      enddate,
      leavetype,
      duration,
      purpose,
      kpurpose,
    } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!startdate) {
      return res.send({ message: "startdate is required" });
    }
    if (!enddate) {
      return res.send({ message: "enddate is required" });
    }
    if (!leavetype) {
      return res.send({ message: "leavetype is required" });
    }
    if (!duration) {
      return res.send({ message: "duration is required" });
    }
    if (!purpose) {
      return res.send({ message: "Purpose is required" });
    }
    if (!kpurpose) {
      return res.send({ message: "Workshop Name/Home is required" });
    }

    const user = await new UserModel({
      name,
      email,
      phone,
      startdate,
      enddate,
      leavetype,
      duration,
      purpose,
      kpurpose,
      status: 'pending', // Update the status to 'pending'
    }).save();

    res.status(200).send({
      success: true,
      message: "Request Send Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in leave Form",
      error,
    });
  }
};

exports.getLeaveRecords = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user based on the email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all leave records for the user
    const leaveRecords = await UserModel.find({ email }).sort({ date: -1 });

    // Map the leave records to include the required fields
    const transactions = leaveRecords.map((record) => ({
      username: user.name,
      status: record.status,
      email: record.email,
      leavetype: record.leavetype,
      date: record.createdAt,
    }));

    console.log('Leave Logs:', transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

