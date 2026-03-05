const connectDB = require("./config/database");
const app = require("./app");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});