import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource"; // adjust path

export const client = generateClient<Schema>();
