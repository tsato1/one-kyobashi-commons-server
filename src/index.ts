import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import serverless from "serverless-http"
import eventRoutes from "./routes/eventRoutes";
import crewRoutes from "./routes/crewRoutes";
import trusteeRoutes from "./routes/trusteeRoutes";
import { authMiddleware } from "./authMiddleware";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production"

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.options('/*wildcard', cors());
app.get("/", (req, res) => {
  res.send("Hello!\n");
});
app.use("/events", eventRoutes);
app.use("/crews", authMiddleware(["crew"]), crewRoutes);
app.use("/trustees", authMiddleware(["trustee"]), trusteeRoutes);

const port = process.env.PORT || 3001;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

const serverlessApp = serverless(app);
export const handler = async (event: any, context: any) => {
  return serverlessApp(event, context)
}