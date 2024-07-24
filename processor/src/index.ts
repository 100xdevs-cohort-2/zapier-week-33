import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs";

const TOPIC_NAME = "zap-events"

const client = new PrismaClient();

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer =  kafka.producer();
    await producer.connect();

    while(1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        console.log(pendingRows);

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })  

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
}

main();