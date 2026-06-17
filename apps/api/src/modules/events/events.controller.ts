import {
    Body,
    Controller,
    Post,
    ServiceUnavailableException,
} from "@nestjs/common"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { RabbitmqService } from "../../core/rabbitmq/rabbitmq.service.js"
import { PingDto } from "./dto/ping.dto.js"

@ApiTags("Events")
@Controller("events")
export class EventsController {
    constructor(private readonly rabbitmq: RabbitmqService) {}

    @Post("ping")
    @ApiOperation({ summary: "Publish a ping event to the queue" })
    async ping(@Body() body: PingDto) {
        try {
            const event = await this.rabbitmq.publishPing(
                body.message ?? "ping from API",
            )
            return { published: true, event }
        } catch {
            throw new ServiceUnavailableException("Message broker unavailable")
        }
    }
}
