
const manageInventory = require("./inventory");

describe("Inventory Manager Tests", () => {

    let inventory;

    beforeEach(() => {
        inventory = [
            { id: 1, name: "Laptop", quantity: 10 },
            { id: 2, name: "Mouse", quantity: 20 },
            { id: 3, name: "Keyboard", quantity: 5 }
        ];
    });

    test("should successfully reduce product quantity", () => {
        const result = manageInventory(inventory, 2, 3);

        expect(result[1].quantity).toBe(17);
    });

    test("should allow purchasing the entire available stock", () => {
        const result = manageInventory(inventory, 3, 5);

        expect(result[2].quantity).toBe(0);
    });

    test("should throw error if product does not exist", () => {
        expect(() => manageInventory(inventory, 99, 2))
            .toThrow("Product not found");
    });

    test("should throw error if requested quantity exceeds stock", () => {
        expect(() => manageInventory(inventory, 1, 15))
            .toThrow("Insufficient stock");
    });

    test("should throw error if quantity is zero", () => {
        expect(() => manageInventory(inventory, 1, 0))
            .toThrow("Quantity must be a positive integer");
    });

    test("should throw error if quantity is negative", () => {
        expect(() => manageInventory(inventory, 1, -5))
            .toThrow("Quantity must be a positive integer");
    });

    test("should throw error if inventory is empty and product is not found", () => {
        expect(() => manageInventory([], 1, 2))
            .toThrow("Product not found");
    });

    test("should throw error if inventory is not an array", () => {
        expect(() => manageInventory(null, 1, 2))
            .toThrow("Inventory must be an array");
    });

    test("should not modify the original inventory", () => {
        const originalInventory = [...inventory];

        manageInventory(inventory, 1, 3);

        expect(inventory).toEqual(originalInventory);
    });

});
