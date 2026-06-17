import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module.js'

async function bootstrap() {
    const logger = new Logger('Worker')
    const app = await NestFactory.createApplicationContext(AppModule)

    logger.log('Worker started — consuming RabbitMQ events')

    const shutdown = async () => {
        logger.log('Shutting down worker...')
        await app.close()
        process.exit(0)
    }

    process.on('SIGINT', () => void shutdown())
    process.on('SIGTERM', () => void shutdown())
}

void bootstrap()
