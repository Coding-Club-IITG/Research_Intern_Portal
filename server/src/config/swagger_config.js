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
  apis: ["./src/students/models/*.js","./src/recruiter/models/*.js","./src/auth/models/*.js","./src/admin/models/*.js","./src/recruiter/routes/*.js", "./src/students/routes/*.js", "./src/users/routes/*.js", "./src/auth/routes/*.js","./src/admin/routes/*.js"],
}

const specs = swaggerJsDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};
