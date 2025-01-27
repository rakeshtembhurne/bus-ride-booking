import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.route.create({
        data: {
            id: '1',  // Static ID for testing
            name: 'Test Route',
            fromLocationId: 'nagpur', // Example
            toLocationId: 'pune',     // Example
            // Add other necessary fields for testing
        },
    });

    console.log('Test route created');
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
