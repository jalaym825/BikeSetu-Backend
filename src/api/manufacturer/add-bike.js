const prisma = require('../../utils/PrismaClient');

module.exports = async function(req, res)  {
    try {
        const { modalId, manufacturerId, currentLocation } = req.body;

        const bikeModal = await prisma.bikeModals.findUnique({
            where: { id: modalId },
        });

        if (!bikeModal) {
            return res.status(404).json({ error: 'Bike modal not found' });
        }

        const manufacturer = await prisma.location.findFirst({
            where: { id: manufacturerId, type: 'MANUFACTURER' },
        });

        if (!manufacturer) {
            return res.status(404).json({ error: 'Manufacturer not found' });
        }

        const newBike = await prisma.bike.create({
            data: {
                modalId,
                manufacturerId,
                status: 'MANUFACTURING',
                currentLocation,
                arrivalDate: new Date(),
            },
        });

        res.status(201).json(newBike);
    } catch (error) {
        console.error('Error adding new bike:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
