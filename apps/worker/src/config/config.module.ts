import { Module } from "@nestjs/common"
import { ConfigModule as NestConfigModule } from "@nestjs/config"
import { workerEnvSchema } from "@repo/types"

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env", "../../.env"],
            validate: (config) => workerEnvSchema.parse(config),
        }),
    ],
})
export class ConfigModule {}
