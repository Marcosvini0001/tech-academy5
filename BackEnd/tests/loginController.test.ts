import request from "supertest";
import app from "../src/index"; // certifique-se que app é sua instância do Express

describe("Login Controller", () => {
  it("Deve retornar um token JWT para login bem-sucedido", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "Senha123!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Deve retornar erro para credenciais inválidas", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "SenhaErrada!",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid password.");
  });
});
