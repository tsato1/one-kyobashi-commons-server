import "dotenv/config";
import { db } from "./index";
import { events } from "./schema";

async function main() {
  const eventData = [
    {
      name: "Sample event 1"
    },
    {
      name: "Sample event 2"
    }
  ];

  const createdEvents = [];
  for (const event of eventData) {
    const [createdEvent] = await db
      .insert(events)
      .values(event)
      .returning()
    createdEvents.push(createdEvent)
  }

  console.log("Seed completed: createdEvents=", createdEvents)
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})