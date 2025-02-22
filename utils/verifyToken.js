const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.access_token;

		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}
		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.user = decode;
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
}