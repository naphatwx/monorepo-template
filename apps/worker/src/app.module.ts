import { Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module.js'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js'
import { ConsumersModule } from './consumers/consumers.module.js'

@Module({
    imports: [ConfigModule, RabbitmqModule, ConsumersModule],
})
export class AppModule {}
