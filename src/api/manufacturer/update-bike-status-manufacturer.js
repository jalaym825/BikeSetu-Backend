const prisma = require('../../utils/PrismaClient');

module.exports = async function(req, res)  {
    try {
        const { bikeId } = req.params;
        const { status, currentLocation } = req.body;

        const bike = await prisma.bike.findUnique({
            where: { id: bikeId },
        });

        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }

        if (bike.status !== 'MANUFACTURING' && status === 'MANUFACTURED') {
            return res.status(400).json({ error: 'Can only update to MANUFACTURED status from MANUFACTURING status' });
        }

        const updatedBike = await prisma.bike.update({
            where: { id: bikeId },
            data: {
                status,
                currentLocation,
                departureDate: status === 'MANUFACTURED' ? new Date() : undefined,
            },
        });

        res.json(updatedBike);
    } catch (error) {
        console.error('Error updating bike status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
