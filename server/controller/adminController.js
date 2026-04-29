const adminModel = require("../models/adminModel");


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Admin login attempt:", { email, password });

    
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      console.log("Admin not found:", email);
      return res.status(401).json({ message: "Admin not found" });
    }

    console.log("Admin found:", { email: admin.email, storedPass: admin.password, type: typeof admin.password });

    
    const storedPass = String(admin.password).trim();
    const inputPass = String(password).trim();

    if (storedPass !== inputPass) {
      console.log("Password mismatch:", { storedPass, inputPass });
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("Admin login success:", email);

    res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: error.message });
  }
};
