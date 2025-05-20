import { migrate } from "drizzle-orm/node-postgres/migrator";
import { AbstractDatabaseConnect } from "./abstract-database-connect";
import { container } from "@project/node-decorator";
import { config } from "dotenv";

config({ path: ".dev.vars" });

const main = async () => {
    try {        console.log("⏳ Running migrations...");

        const start = Date.now();
        const dbConnect = container.resolve(AbstractDatabaseConnect);
        await dbConnect.onConnect();

        await migrate(dbConnect.db, { migrationsFolder: "drizzle" });

        const end = Date.now();

        console.log(`✅ Migrations completed in ${end - start}ms`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed");
        console.error(error);
        process.exit(1);
    }
};

main();