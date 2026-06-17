import { Injectable, Logger } from '@nestjs/common'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import {
    EVENTS_EXCHANGE,
    PING_ROUTING_KEY,
    type PingEvent,
} from '@repo/types'

@Injectable()
export class EventConsumer {
    private readonly logger = new Logger(EventConsumer.name)

    @RabbitSubscribe({
        exchange: EVENTS_EXCHANGE,
        routingKey: PING_ROUTING_KEY,
        queue: 'worker.event.ping',
    })
    handlePing(event: PingEvent) {
        this.logger.log(
            `Received ping: "${event.message}" (published at ${event.publishedAt})`,
        )
    }
}
