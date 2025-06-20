import request from "supertest";
import app from "../src/index";

describe("E2E - Cadastro e Login de Usuário", () => {
  const userData = {
    name: "João Teste",
    email: "joao@teste.com",
    password: "Senha@123",
    endereco: "Rua Exemplo, 123",
    cpf: "12345678901",
    cep: "12345678",
  };

  let token: string;

  it("deve criar um novo usuário com sucesso", async () => {
    const res = await request(app).post("/users").send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(userData.email);
  });

  it("deve fazer login com sucesso e retornar um token", async () => {
    const res = await request(app).post("/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("não deve fazer login com senha incorreta", async () => {
    const res = await request(app).post("/login").send({
      email: userData.email,
      password: "SenhaErrada123!",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid password.");
  });

  it("não deve criar usuário com e-mail duplicado", async () => {
    const res = await request(app).post("/users").send(userData);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "E-mail já cadastrado.");
  });
});
