import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "User crud api",
        description: "API Documentation for User CRUD operations using File Storage",
    },
    host: "localhost:5000",
    schema: ["http"],
};

const outputFile = "./swagger-output.json";
const route = ["../routes/userRoutes.js"];

swaggerAutogen()(outputFile, route).then(() => {
    console.log("Swagger JSON file generated");
})