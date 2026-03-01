import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database...")

    // Clear existing
    await prisma.roleSkill.deleteMany()
    await prisma.userSkill.deleteMany()
    await prisma.jobRole.deleteMany()
    await prisma.skill.deleteMany()
    await prisma.userProfile.deleteMany()

    // 1. Create Skills
    const skillsData = [
        { name: "Python", category: "Programming" },
        { name: "JavaScript", category: "Programming" },
        { name: "TypeScript", category: "Programming" },
        { name: "Java", category: "Programming" },
        { name: "C++", category: "Programming" },
        { name: "Go", category: "Programming" },
        { name: "Ruby", category: "Programming" },
        { name: "React", category: "Frontend" },
        { name: "Next.js", category: "Frontend" },
        { name: "HTML/CSS", category: "Frontend" },
        { name: "Tailwind CSS", category: "Frontend" },
        { name: "Node.js", category: "Backend" },
        { name: "Express", category: "Backend" },
        { name: "Django", category: "Backend" },
        { name: "FastAPI", category: "Backend" },
        { name: "SQL", category: "Database" },
        { name: "PostgreSQL", category: "Database" },
        { name: "MongoDB", category: "Database" },
        { name: "Redis", category: "Database" },
        { name: "Docker", category: "DevOps" },
        { name: "Kubernetes", category: "DevOps" },
        { name: "AWS", category: "DevOps" },
        { name: "CI/CD", category: "DevOps" },
        { name: "Machine Learning", category: "AI/Data" },
        { name: "Deep Learning", category: "AI/Data" },
        { name: "NLP", category: "AI/Data" },
        { name: "Data Analysis", category: "AI/Data" },
        { name: "Pandas", category: "AI/Data" },
        { name: "PyTorch", category: "AI/Data" },
        { name: "TensorFlow", category: "AI/Data" },
        { name: "Figma", category: "Design" },
        { name: "UI/UX Design", category: "Design" },
        { name: "Agile", category: "Management" },
        { name: "Git", category: "Tools" },
        { name: "Linux", category: "OS" }
    ]

    const skills: Record<string, any> = {}
    for (const s of skillsData) {
        // Add random mock MVP data for new advanced fields
        const difficulties = [1, 2, 3, 4, 5];
        const trends = ["Rising", "Stable", "Declining"];
        const boosts = [2000, 5000, 10000, 15000];

        const enhancedSkill = {
            ...s,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            demandTrend: trends[Math.floor(Math.random() * trends.length)],
            avgSalaryBoost: boosts[Math.floor(Math.random() * boosts.length)]
        };
        skills[s.name] = await prisma.skill.create({ data: enhancedSkill })
    }

    // 2. Create Roles
    const rolesData = [
        { title: "Frontend Developer", description: "Builds user interfaces", demandScore: 8.5 },
        { title: "Backend Developer", description: "Builds server-side logic and APIs", demandScore: 8.7 },
        { title: "Full Stack Developer", description: "Handles both frontend and backend", demandScore: 9.2 },
        { title: "Data Scientist", description: "Analyzes and models data", demandScore: 9.5 },
        { title: "Machine Learning Engineer", description: "Builds scalable AI models", demandScore: 9.8 },
        { title: "DevOps Engineer", description: "Manages infrastructure and deployments", demandScore: 9.0 },
        { title: "UI/UX Designer", description: "Designs user experiences", demandScore: 8.0 },
        { title: "Product Manager", description: "Manages product lifecycle", demandScore: 8.5 },
        { title: "Data Analyst", description: "Extracts insights from data", demandScore: 8.2 },
        { title: "Cloud Architect", description: "Designs cloud infrastructure", demandScore: 9.4 },
        { title: "Cybersecurity Analyst", description: "Secures systems and networks", demandScore: 9.1 },
        { title: "Mobile Developer", description: "Builds iOS and Android apps", demandScore: 8.3 },
        { title: "Game Developer", description: "Builds interactive games", demandScore: 7.5 },
        { title: "QA Engineer", description: "Ensures software quality", demandScore: 7.8 },
        { title: "System Administrator", description: "Manages IT systems", demandScore: 7.0 }
    ]

    const roles: Record<string, any> = {}
    for (const r of rolesData) {
        roles[r.title] = await prisma.jobRole.create({ data: r })
    }

    // 3. Associate Roles with Skills
    const roleSkillMappings = [
        { role: "Frontend Developer", skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"] },
        { role: "Backend Developer", skills: ["Python", "Node.js", "SQL", "PostgreSQL", "Docker", "Git", "Go", "Java"] },
        { role: "Full Stack Developer", skills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Tailwind CSS"] },
        { role: "Data Scientist", skills: ["Python", "Machine Learning", "Data Analysis", "Pandas", "SQL"] },
        { role: "Machine Learning Engineer", skills: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "Docker", "AWS", "SQL"] },
        { role: "DevOps Engineer", skills: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD", "Python", "Git"] },
        { role: "UI/UX Designer", skills: ["Figma", "UI/UX Design", "HTML/CSS"] },
        { role: "Data Analyst", skills: ["Python", "Data Analysis", "SQL", "Pandas"] },
        { role: "Cloud Architect", skills: ["AWS", "Linux", "Docker", "Kubernetes", "Python"] }
    ]

    for (const mapping of roleSkillMappings) {
        const roleId = roles[mapping.role].id
        for (const skillName of mapping.skills) {
            if (skills[skillName]) {
                await prisma.roleSkill.create({
                    data: {
                        roleId,
                        skillId: skills[skillName].id,
                        importance: Math.floor(Math.random() * 3) + 3 // 3, 4, or 5
                    }
                })
            }
        }
    }

    // 4. Create Mock Learning Resources
    console.log("Generating Learning Resources...");
    const providers = ["Coursera", "Udemy", "edX", "YouTube", "Pluralsight"];
    const costs = ["Free", "$15", "$49/mo", "Free", "$299"];
    const durations = ["4 Weeks", "10 Hours", "3 Months", "2 Hours", "6 Weeks"];

    for (const skillName of Object.keys(skills)) {
        const skillId = skills[skillName].id;

        // Create 2 resources per skill
        for (let i = 1; i <= 2; i++) {
            await prisma.learningResource.create({
                data: {
                    skillId,
                    title: `${skillName} Masterclass: Zero to Hero`,
                    provider: providers[Math.floor(Math.random() * providers.length)],
                    url: `https://example.com/learn-${skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                    cost: costs[Math.floor(Math.random() * costs.length)],
                    duration: durations[Math.floor(Math.random() * durations.length)]
                }
            });
        }
    }

    console.log("Database seeded successfully!")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
