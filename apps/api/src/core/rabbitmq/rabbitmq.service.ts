import { Injectable } from "@nestjs/common"
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq"
import { EVENTS_EXCHANGE, PING_ROUTING_KEY, type PingEvent } from "@repo/types"

// Publish blocks until a channel opens. If the broker is down this never
// resolves, so cap it with a timeout and fail fast instead of hanging.
const PUBLISH_TIMEOUT_MS = 5000

@Injectable()
export class RabbitmqService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async publishPing(message: string): Promise<PingEvent> {
        const event: PingEvent = {
            message,
            publishedAt: new Date().toISOString(),
        }
        await this.publishWithTimeout(EVENTS_EXCHANGE, PING_ROUTING_KEY, event)
        return event
    }

    private async publishWithTimeout(
        exchange: string,
        routingKey: string,
        payload: unknown,
    ): Promise<void> {
        let timer: ReturnType<typeof setTimeout>
        const timeout = new Promise<never>((_, reject) => {
            timer = setTimeout(
                () => reject(new Error("RabbitMQ publish timed out")),
                PUBLISH_TIMEOUT_MS,
            )
        })
        try {
            await Promise.race([
                this.amqpConnection.publish(exchange, routingKey, payload),
                timeout,
            ])
        } finally {
            clearTimeout(timer!)
        }
    }
}
