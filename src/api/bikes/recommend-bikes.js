const prisma = require('../../utils/PrismaClient');
const axios = require("axios");

module.exports = async function(req, res) {
    try {
        const {prompt} = req.body;
        const sql = await axios.post(process.env.AIML_SERVER + '/recommend-bikes', {prompt});
        const bikes = await prisma.$queryRaw`${sql.data}`;
        res.json(bikes);
    } catch (error) {
        console.error('Error fetching bikes:', error);
        res.status(500).json({ error: 'An error occurred while fetching bikes' });
    }
}
