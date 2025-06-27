import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import data from "./server_config.js";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Research Intern Portal",
      version: "1.0.0",
      description: "CC Research intern project",
    },
    servers: [
      {
        url: `http://localhost:${data.PORT}`,
      },
    ],
  },
  apis: ["./model.js"],
};

const specs = swaggerJsDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};
