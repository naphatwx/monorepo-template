import { Module } from "@nestjs/common"
import { ConditionalModule } from "@nestjs/config"
import { ConfigModule } from "./config/config.module.js"
import { RabbitmqModule } from "./rabbitmq/rabbitmq.module.js"
import { ConsumersModule } from "./consumers/consumers.module.js"

// Consumers only load when RABBITMQ_ENABLE is true. With it off the worker
// boots but stays idle, so api and web can run without a broker.
const whenEnabled = (env: NodeJS.ProcessEnv) => env.RABBITMQ_ENABLE === "true"

@Module({
    imports: [
        ConfigModule,
        ConditionalModule.registerWhen(RabbitmqModule, whenEnabled),
        ConditionalModule.registerWhen(ConsumersModule, whenEnabled),
    ],
})
export class AppModule {}
