import { Module } from '@nestjs/common'
import { ConfigModule } from './core/config/config.module.js'
import { RabbitmqModule } from './core/rabbitmq/rabbitmq.module.js'
import { EventsModule } from './modules/events/events.module.js'
import { HealthController } from './health.controller.js'

@Module({
    imports: [ConfigModule, RabbitmqModule, EventsModule],
    controllers: [HealthController],
})
export class AppModule {}
