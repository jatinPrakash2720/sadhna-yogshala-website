import "dotenv/config";

import { defineConfig } from "@prisma/config";
import { config } from "./src/lib/config";
export default defineConfig({
  datasource: {
    // 1. For Migrations (CLI), we MUST use the Direct URL
    //    because migrations cannot run through a connection pooler.
    url: config.directUrl, 
  },
});