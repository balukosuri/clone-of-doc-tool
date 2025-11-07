import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'user@docbolt.local' },
    update: {},
    create: {
      id: 'default-user-id',
      name: 'Default User',
      email: 'user@docbolt.local',
      emailVerified: new Date(),
    },
  });

  console.log('✓ Created default user:', user.email);
  console.log('\nDatabase seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
