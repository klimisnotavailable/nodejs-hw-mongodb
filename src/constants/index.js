import path from "node:path";
export const sortOrderList = ["asc","desc"];
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const TEMPLATES_DIR = path.resolve("src","templates","verify-email.html");
export const TEMP_UPLOAD_DIR = path.resolve("src", 'temp');
export const UPLOAD_DIR = path.resolve('src', 'uploads');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
