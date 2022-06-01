import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DB_PATH_FILENAME = path.resolve(
  __dirname,
  "..",
  "data/tasks.json"
);
