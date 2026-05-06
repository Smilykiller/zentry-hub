// prisma/seed.js
// Run: npm run seed
// Creates initial admin user + 3 starter projects

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Zentry Hub database...')

  // ── Admin User ─────────────────────────────────────────────
  // CHANGE THIS PASSWORD before running in production!
  const hash = await bcrypt.hash('ZentryAdmin@2026', 12)

  const admin = await prisma.adminUser.upsert({
    where:  { email: 'admin@zentryhub.in' },
    update: {},
    create: {
      email:         'admin@zentryhub.in',
      password_hash: hash,
    },
  })
  console.log('✓ Admin user created:', admin.email)

  // ── Projects ───────────────────────────────────────────────
  const projects = [
    {
      title:         'Hushpod',
      category:      'Audio Engineering',
      description:   'A high-performance synchronized audio player. Engineered a deep tech roadmap to ensure zero-latency playback and flawless audio synchronization across distributed networks.',
      tech_stack:    ['Python', 'WebSockets', 'Audio API'],
      image_url:     'https://via.placeholder.com/800x500/1C2333/B87333?text=Hushpod',
      is_featured:   true,
      display_order: 1,
    },
    {
      title:         'Smart Campus',
      category:      'Enterprise Systems',
      description:   'A comprehensive Attendance and Student Management System. Architected a robust, full-stack environment to handle high-throughput database operations and real-time campus analytics.',
      tech_stack:    ['Java', 'Web Architecture', 'SQL'],
      image_url:     'https://via.placeholder.com/800x500/1C2333/4A6FA5?text=Smart+Campus',
      is_featured:   true,
      display_order: 2,
    },
    {
      title:         'Genome Storage',
      category:      'Data Architecture',
      description:   'Research and algorithmic encoding for DNA Data Storage. Developed methodologies for translating digital binaries into biological sequences for ultra-dense, long-term archival.',
      tech_stack:    ['Algorithms', 'Python', 'Bioinformatics'],
      image_url:     'https://via.placeholder.com/800x500/1C2333/F0EDE8?text=Genome+Storage',
      is_featured:   true,
      display_order: 3,
    },
  ]

  for (const project of projects) {
    const created = await prisma.project.upsert({
      where:  { id: projects.indexOf(project) + 1 },
      update: project,
      create: project,
    })
    console.log('✓ Project seeded:', created.title)
  }

  console.log('\n✅ Seed complete!')
  console.log('   Admin email:    admin@zentryhub.in')
  console.log('   Admin password: ZentryAdmin@2026')
  console.log('   ⚠  Change the admin password immediately after first login!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
