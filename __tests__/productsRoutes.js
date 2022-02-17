const request = require("supertest");
const { server } = require("../ApiService/server");

let token;
let product;
beforeAll((done) => {
    request(server)
        .post('/v1/auth/login')
        .send({
            username: "admin",
            password: "admin123",
        })
        .end((err, response) => {
            token = response.body.token; // save the token!
            server.listen().close();
            done();
        });
});

describe("Test products", () => {
    // Get All
    describe("Get All Method", () => {
        it("It should get a list with all the products", async () => {
            const res = await request(server).get("/v1/products");
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // Get One by ID
    describe("Get One Method", () => {
        it("It should get a single product based on ID sent", async () => {
            let id = '6127d405427728296db1c21a';
            const res = await request(server).get(`/v1/products/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    // // Post without Files
    // describe("Post a single product", () => {
    //     it("It should create a single record based on parameters given.", async () => {
    //         const body = {
    //             name: "nuevoprod",
    //             stock: 3,
    //             brand: [
    //                 "6127d299427728296db1c218"
    //             ],
    //             categories: [
    //                 "6127d1a0427728296db1c216"
    //             ],
    //             tags: [
    //                 "LGA 1151",
    //                 "8th / 9th Gen",
    //                 "mATX"
    //             ]
    //         }
    //         const res = await request(server).post("/v1/products/")
    //         .send(body)
    //         .set('Authorization', `Bearer ${token}`)
    //         expect(res.statusCode).toBe(201);
    //         product = res.body._id;
    //     });
    // });

    // Delete by ID
    describe("Delete a product by ID", () => {
        it("It should delete the product", async () => {
            let id = "61fa9c45a6fba554458ced14";
            const res = await request(server).delete(`/v1/products/${id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(404);
        });
    });
});