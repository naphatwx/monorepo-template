import { Module } from "@nestjs/common"
import { RabbitMQModule as GolevelupRabbitMQModule } from "@golevelup/nestjs-rabbitmq"
import { ConfigService } from "@nestjs/config"
import { EVENTS_EXCHANGE } from "@repo/types"

@Module({
    imports: [
        GolevelupRabbitMQModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>(
                    "RABBITMQ_URL",
                    "amqp://guest:guest@localhost:5672",
                ),
                exchanges: [{ name: EVENTS_EXCHANGE, type: "topic" }],
                connectionInitOptions: { wait: false },
            }),
        }),
    ],
    exports: [GolevelupRabbitMQModule],
})
export class RabbitmqModule {}
