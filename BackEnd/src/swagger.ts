import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Music API',
            version: '1.0.0',
            description:
                'API documentation for the Music and Artist management system',
        },
        servers: [
            {
                url: 'https://gympoisonapp.local/api',
                description: 'Local server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Lucas Maeda',
                        },
                        email: {
                            type: 'string',
                            example: 'lucas@example.com',
                        },
                        cpf: {
                            type: 'string',
                            example: '12345678900',
                        },
                        endereco: {
                            type: 'string',
                            example: 'Rua Exemplo, 123',
                        },
                        cep: {
                            type: 'string',
                            example: '12345-678',
                        },
                        password: {
                            type: 'string',
                            example: 'hashedpassword123',
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};