import env from "dotenv";

env.config();

export const { NODE_ENV } = process.env;
export const IS_DEV_MODE = NODE_ENV === "development";
