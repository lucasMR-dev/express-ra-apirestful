const request = require("supertest");
const { server } = require("../Api/server");

let token;

let family;
let category;
let brand;
let product;
beforeAll((done) => {
    request(server)
        .post('/v1/auth/login')
        .send({
            username: "admin",
            password: "admin123",
        })
        .end((err, response) => {
            token = response.body.token;
            server.listen().close();
            done();
        });
});

// Families
describe("Test Families", () => {
    // Get All
    describe("Get All Method", () => {
        it("It should get a list with all the families", async () => {
            const res = await request(server).get("/v1/families");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Post
    describe("Post a family", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name
            }
            const res = await request(server).post("/v1/families")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            family = res.body.id;
        });
    });

    // Get One by ID
    describe("Get One Method", () => {
        it("It should get a single family based on ID sent", async () => {
            const res = await request(server).get(`/v1/families/${family}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Delete by ID
    describe("Delete a family by ID", () => {
        it("It should delete the product", async () => {
            const res = await request(server).delete(`/v1/families/${family}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });
});

// Categories
describe("Test Categories", () => {
    // Get All
    describe("Get All Method", () => {
        it("It should get a list with all the categories", async () => {
            const res = await request(server).get("/v1/categories");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Post
    describe("Post a category", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name,
                family: '620f9e3d814d6e4040724720'
            }
            const res = await request(server).post("/v1/categories")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            category = res.body.id;
        });
    });

    // Get One by ID
    describe("Get One Method", () => {
        it("It should get a single category based on ID sent", async () => {
            const res = await request(server).get(`/v1/categories/${category}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Delete by ID
    describe("Delete a category by ID", () => {
        it("It should delete the product", async () => {
            const res = await request(server).delete(`/v1/categories/${category}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });
});

// Brands
describe("Test Brands", () => {
    // Get All
    describe("Get All Method", () => {
        it("It should get a list with all the brands", async () => {
            const res = await request(server).get("/v1/brands");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Post
    describe("Post a Brand", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name,
                categories: '6127d1a0427728296db1c216'
            }
            const res = await request(server).post("/v1/brands")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            brand = res.body.id;
        });
    });

    // Get One by ID
    describe("Get One Method", () => {
        it("It should get a single brand based on ID sent", async () => {
            const res = await request(server).get(`/v1/brands/${brand}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Delete by ID
    describe("Delete a brand by ID", () => {
        it("It should delete the brand", async () => {
            const res = await request(server).delete(`/v1/brands/${brand}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });
});

// Products
describe("Test products", () => {
    // Get All
    describe("Get All Method", () => {
        it("It should get a list with all the products", async () => {
            const res = await request(server).get("/v1/products");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Post without Files
    describe("Post a single product", () => {
        it("It should create a single record based on parameters given.", async () => {
            const body = {
                name: "nuevoprod",
                stock: 3,
                brand: "6127d299427728296db1c218",
                categories: "6127d1a0427728296db1c216",
                tags: [
                    "LGA 1151",
                    "8th / 9th Gen",
                    "mATX"
                ]
            }
            const res = await request(server).post("/v1/products/")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            product = res.body.id;
        });
    });

    // Get One by ID
    describe("Get One Method", () => {
        it("It should get a single product based on ID sent", async () => {
            const res = await request(server).get(`/v1/products/${product}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Delete by ID
    describe("Delete a product by ID", () => {
        it("It should delete the product", async () => {
            const res = await request(server).delete(`/v1/products/${product}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });
});