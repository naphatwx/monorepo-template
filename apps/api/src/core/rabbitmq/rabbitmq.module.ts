import { Module } from "@nestjs/common"
import { RabbitMQModule as GolevelupRabbitMQModule } from "@golevelup/nestjs-rabbitmq"
import { ConditionalModule, ConfigService } from "@nestjs/config"
import { EVENTS_EXCHANGE } from "@repo/types"
import { RabbitmqService } from "./rabbitmq.service.js"

// The broker connection only loads when RABBITMQ_ENABLE is true, so api can
// run without RabbitMQ. RabbitmqService stays available either way; it fails
// fast on publish when the connection is absent.
@Module({
    imports: [
        ConditionalModule.registerWhen(
            GolevelupRabbitMQModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    uri: config.getOrThrow<string>("RABBITMQ_URL"),
                    exchanges: [{ name: EVENTS_EXCHANGE, type: "topic" }],
                    connectionInitOptions: { wait: false },
                }),
            }),
            (env) => env.RABBITMQ_ENABLE === "true",
        ),
    ],
    providers: [RabbitmqService],
    exports: [RabbitmqService],
})
export class RabbitmqModule {}
