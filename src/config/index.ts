const config = {
	apiURL: process.env.NEXT_PUBLIC_API_URL,
	mongoURL: process.env.MONGO_URL,
	JWTSecret: process.env.JWT_SECRET,
	firebasePvtKey: process.env.FIREBASE_PVT_KEY,
};

export default config;
