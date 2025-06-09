import request from "supertest";
import app from "../src/index";

describe("E2E - CRUD de Produto", () => {
  let produtoId: number;
  let categoriaId: number;

  beforeAll(async () => {
    const categoriaRes = await request(app)
      .post("/api/categorias")
      .send({ nome: "Suplementos" });
    categoriaId = categoriaRes.body.id || categoriaRes.body.categoria?.id;
  });

  it("deve criar, listar, atualizar e excluir um produto", async () => {
    const createRes = await request(app)
      .post("/api/produtos")
      .send({
        name: "Whey Protein",
        marca: "Growth",
        descricao: "Proteína concentrada",
        categoriaId,
        precoValor: 99.9,
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body.name).toBe("Whey Protein");
    produtoId = createRes.body.id || createRes.body.produto?.id;

    const listRes = await request(app).get("/api/produtos");
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.some((p: any) => p.id === produtoId)).toBe(true);

    const updateRes = await request(app)
      .put(`/api/produtos/${produtoId}`)
      .send({
        name: "Whey Protein Isolado",
        descricao: "Proteína isolada",
        precoValor: 120.0,
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe("Whey Protein Isolado");

    const deleteRes = await request(app).delete(`/api/produtos/${produtoId}`);
    expect(deleteRes.status).toBe(204);

    const afterDeleteRes = await request(app).get(`/api/produtos/${produtoId}`);
    expect(afterDeleteRes.status).toBe(404);
  });
});