import { Module } from "@nestjs/common"
import { ConfigModule as NestConfigModule } from "@nestjs/config"
import { apiEnvSchema } from "@repo/types"

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env", "../../.env"],
            validate: (config) => apiEnvSchema.parse(config),
        }),
    ],
})
export class ConfigModule {}
