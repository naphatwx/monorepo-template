import { NestFactory } from "@nestjs/core"
import { Logger } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ZodValidationPipe, cleanupOpenApiDoc } from "nestjs-zod"
import { AppModule } from "./app.module.js"

async function bootstrap() {
    const logger = new Logger("Bootstrap")
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix("api")

    app.enableCors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        credentials: true,
    })

    app.useGlobalPipes(new ZodValidationPipe())

    const swaggerConfig = new DocumentBuilder()
        .setTitle("API")
        .setDescription("Monorepo template API")
        .setVersion("1.0")
        .build()

    const rawDocument = SwaggerModule.createDocument(app, swaggerConfig)
    const document = cleanupOpenApiDoc(rawDocument)
    SwaggerModule.setup("api/docs", app, document)

    const port = process.env.PORT ?? 4000
    await app.listen(port)
    logger.log(`API server running on http://localhost:${port}`)
    logger.log(`Swagger docs at http://localhost:${port}/api/docs`)
}
void bootstrap()
