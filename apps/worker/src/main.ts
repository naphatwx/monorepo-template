import { NestFactory } from "@nestjs/core"
import { Logger } from "@nestjs/common"
import { AppModule } from "./app.module.js"

async function bootstrap() {
    const logger = new Logger("Worker")
    const app = await NestFactory.createApplicationContext(AppModule)

    const enabled = process.env.RABBITMQ_ENABLE === "true"
    logger.log(
        enabled
            ? "Worker started — consuming RabbitMQ events"
            : "Worker started — RabbitMQ disabled, no consumers running",
    )

    const shutdown = async () => {
        logger.log("Shutting down worker...")
        await app.close()
        process.exit(0)
    }

    process.on("SIGINT", () => void shutdown())
    process.on("SIGTERM", () => void shutdown())
}

void bootstrap()
