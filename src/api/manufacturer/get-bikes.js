const prisma = require('../../utils/PrismaClient');

module.exports = async function(req, res)  {
    try {
        const { status } = req.query;

        if(!manufacturerId) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }

        const bikes = await prisma.bike.findMany({
            where: {
                manufacturerId: req.user.sys_id,
                status: status ? status : undefined,
            },
            include: {
                modal: true,
            },
        });

        res.json(bikes);
    } catch (error) {
        console.error('Error fetching manufacturer bikes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
