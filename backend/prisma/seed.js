const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Zentry Hub database...')

  const hash = await bcrypt.hash('ZentryAdmin@2026', 12)
  const admin = await prisma.adminUser.upsert({
    where:  { email: 'admin@zentryhub.in' },
    update: {},
    create: { email: 'admin@zentryhub.in', password_hash: hash },
  })
  console.log('✓ Admin user:', admin.email)

  const projects = [
    {
      title: 'Hushpod', category: 'Audio Engineering',
      description: 'High-performance synchronized audio player. Engineered for zero-latency playback and flawless audio synchronization across distributed networks.',
      tech_stack: ['Python', 'WebSockets', 'Audio API'],
      image_url: 'https://via.placeholder.com/800x500/1C2333/B87333?text=Hushpod',
      is_featured: true, display_order: 1,
    },
    {
      title: 'Smart Campus', category: 'Enterprise Systems',
      description: 'Comprehensive Attendance and Student Management System architected for high-throughput database operations and real-time campus analytics.',
      tech_stack: ['Java', 'Spring Boot', 'PostgreSQL'],
      image_url: 'https://via.placeholder.com/800x500/1C2333/4A6FA5?text=Smart+Campus',
      is_featured: true, display_order: 2,
    },
    {
      title: 'Genome Storage', category: 'Data Architecture',
      description: 'Research and algorithmic encoding for DNA Data Storage — translating digital binaries into biological sequences for ultra-dense long-term archival.',
      tech_stack: ['Python', 'Bioinformatics', 'Algorithms'],
      image_url: 'https://via.placeholder.com/800x500/1C2333/F0EDE8?text=Genome+Storage',
      is_featured: true, display_order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
    console.log('✓ Project seeded:', project.title)
  }

  console.log('\n✅ Seed complete!')
  console.log('   Email:    admin@zentryhub.in')
  console.log('   Password: ZentryAdmin@2026')
  console.log('   ⚠  Change this password after first login!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
