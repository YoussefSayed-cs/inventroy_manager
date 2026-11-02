
function manageInventory(inventory, productId, quantity) {
    // Validate inventory
    if (!Array.isArray(inventory)) {
        throw new Error("Inventory must be an array");
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
    }

    // Linear Search
    let productIndex = -1;

    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id === productId) {
            productIndex = i;
            break;
        }
    }

    // Check if product exists
    if (productIndex === -1) {
        throw new Error("Product not found");
    }

    // Check available stock
    if (inventory[productIndex].quantity < quantity) {
        throw new Error("Insufficient stock");
    }

    // Create a new inventory without modifying the original
    const updatedInventory = [...inventory];

    updatedInventory[productIndex] = {
        ...inventory[productIndex],
        quantity: inventory[productIndex].quantity - quantity
    };

    return updatedInventory;
}

module.exports = manageInventory;
