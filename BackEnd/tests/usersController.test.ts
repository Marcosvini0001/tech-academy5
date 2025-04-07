import request from "supertest";
import app from "../src/index";

describe("Users Controller", () => {
  it("Deve atualizar o endereço do usuário com sucesso", async () => {
    const token = "seu_token_aqui"; 
    const response = await request(app)
      .put("/users/1/address")
      .set("Authorization", `Bearer ${token}`)
      .send({
        endereco: "Novo Endereço",
        senha: "Senha123!",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Endereço atualizado com sucesso.");
  });

  it("Deve retornar erro ao fornecer senha incorreta", async () => {
    const token = "seu_token_aqui"; 
    const response = await request(app)
      .put("/users/1/address")
      .set("Authorization", `Bearer ${token}`)
      .send({
        endereco: "Novo Endereço",
        senha: "SenhaErrada!",
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Senha incorreta.");
  });
});