const request = require("supertest");
const { server } = require("../Api/server");
const config = require("../Api/config");

let token;
let family;
let category;
let brand;
let product;
beforeAll((done) => {
    request(server)
        .post('/v1/auth/login')
        .send({
            username: config.JEST_USER,
            password: config.JEST_PASS
        })
        .end((err, response) => {
            token = response.body.token;
            server.listen().close();
            done();
        });
});

// Get ALL
describe("Test GetAll", () => {
    // Families
    describe("Get All Families", () => {
        it("It should get a list with all the families", async () => {
            const res = await request(server).get("/v1/families");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Categories
    describe("Get All Categories", () => {
        it("It should get a list with all the categories", async () => {
            const res = await request(server).get("/v1/categories");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Brands
    describe("Get All Brands", () => {
        it("It should get a list with all the brands", async () => {
            const res = await request(server).get("/v1/brands");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Products
    describe("Get All Products", () => {
        it("It should get a list with all the products", async () => {
            const res = await request(server).get("/v1/products");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });
});

// Post
describe("Test Post", () => {
     // Family
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

    // Category
    describe("Post a category", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name,
                family: family
            }
            const res = await request(server).post("/v1/categories")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            category = res.body.id;
        });
    });

    // Brand
    describe("Post a Brand", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name,
                categories: category
            }
            const res = await request(server).post("/v1/brands")
                .send(body)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(201);
            brand = res.body.id;
        });
    });

    // Products
    describe("Post a Product", () => {
        it("It should create a single record based on parameters given.", async () => {
            let name = Math.random().toString(36).substring(2, 5);
            const body = {
                name: name,
                stock: 3,
                brand: brand,
                categories: category,
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
});

// Get One
describe("Test GetOne", () => {
    // Family
    describe("Get One Method", () => {
        it("It should get a single family based on ID sent", async () => {
            const res = await request(server).get(`/v1/families/${family}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Category
    describe("Get One Method", () => {
        it("It should get a single category based on ID sent", async () => {
            const res = await request(server).get(`/v1/categories/${category}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Brand
    describe("Get One Method", () => {
        it("It should get a single brand based on ID sent", async () => {
            const res = await request(server).get(`/v1/brands/${brand}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    //  Product
    describe("Get One Method", () => {
        it("It should get a single product based on ID sent", async () => {
            const res = await request(server).get(`/v1/products/${product}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });
});

// delete
describe("Test Delete", () => {
    // Family
    describe("Delete a family by ID", () => {
        it("It should delete the family", async () => {
            const res = await request(server).delete(`/v1/families/${family}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });

    // Category
    describe("Delete a category by ID", () => {
        it("It should delete the category", async () => {
            const res = await request(server).delete(`/v1/categories/${category}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });

    // Brand
    describe("Delete a brand by ID", () => {
        it("It should delete the brand", async () => {
            const res = await request(server).delete(`/v1/brands/${brand}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });

    // Product
    describe("Delete a product by ID", () => {
        it("It should delete the product", async () => {
            const res = await request(server).delete(`/v1/products/${product}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(204);
        });
    });
});