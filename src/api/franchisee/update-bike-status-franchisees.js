const prisma = require('../../utils/PrismaClient');

module.exports = async function(req, res) {
    try {
        const { id } = req.params;
        const { newStatus, customerId } = req.body;

        const bike = await prisma.bike.findUnique({
            where: { id, franchiseeId: req.user.sys_id },
            include: { franchisee: true }
        });

        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }

        // Define valid status transitions for franchisee managers
        const validTransitions = {
            'IN_TRANSIT_TO_FRANCHISEE': 'AT_FRANCHISEE',
            'AT_FRANCHISEE': 'DELIVERED_TO_CUSTOMER'
        };

        if (validTransitions[bike.status] === newStatus) {
            const updateData = {
                status: newStatus,
                arrivalDate: newStatus === 'AT_FRANCHISEE' ? new Date() : bike.arrivalDate,
                deliveryDate: newStatus === 'DELIVERED_TO_CUSTOMER' ? new Date() : bike.deliveryDate
            };

            if (newStatus === 'DELIVERED_TO_CUSTOMER') {
                if (!customerId) {
                    return res.status(400).json({ error: 'Customer ID is required for delivery' });
                }
                updateData.customerId = customerId;
            }

            const updatedBike = await prisma.bike.update({
                where: { id },
                data: updateData
            });

            res.json(updatedBike);
        } else {
            res.status(400).json({ error: 'Invalid status transition' });
        }
    } catch (error) {
        console.error('Error updating bike status:', error);
        res.status(500).json({ error: 'An error occurred while updating the bike status' });
    }
}
