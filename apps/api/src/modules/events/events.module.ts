import { Module } from "@nestjs/common"
import { RabbitmqModule } from "../../core/rabbitmq/rabbitmq.module.js"
import { EventsController } from "./events.controller.js"

@Module({
    imports: [RabbitmqModule],
    controllers: [EventsController],
})
export class EventsModule {}
