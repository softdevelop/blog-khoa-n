const UserRepository = require("../repository/UserRepository");
const bcrypt =require("bcrypt");
const { generateToken } = require("../utils/jwt");


const AuthController ={};

AuthController.register= async(req,res)=>{
    const { username, email, password } = req.body;

	const userByUsername = await UserRepository.getUserByUsername(username);

	if (userByUsername){
        return res
				.status(400)
				.send(JSON.stringify({
                    message:"Username exist!"
                }));
    }

    const hashPassword = await bcrypt.hash(password,12);

    const newUser = await UserRepository.newUser({
        username,
        email,
        password: hashPassword
    });
    
    res.status(200).json(newUser);
};

AuthController.login = async (req, res) => {
	const username = req.body.username || 'test';
	const password = req.body.password || '12345';

	const user = await UserRepository.getUserByUsername(username);
	if (!user) {
		return res.status(401).send(JSON.stringify({
                    message:"Account does not exist!"
                }));
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send(JSON.stringify({
                    message:"password is incorrect!"
                }));
	}

	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send(JSON.stringify({
                    message:"Login failed!"
                }));
	}

	return res.json({
		msg: 'Login success.',
		accessToken,
		user,
	});
};

module.exports =AuthController;
