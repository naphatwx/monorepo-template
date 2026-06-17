import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.example.create({
        data: { name: "Hello from seed" },
    })
    console.log("Seed done")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        void prisma.$disconnect()
    })
