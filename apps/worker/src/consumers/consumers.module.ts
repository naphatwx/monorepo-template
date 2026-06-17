import { Module } from '@nestjs/common'
import { EventConsumer } from './event.consumer.js'

@Module({
    providers: [EventConsumer],
})
export class ConsumersModule {}
