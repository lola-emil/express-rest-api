function handler() {
    throw new Error("Estopatol");
}

try {
    handler();
} catch(error) {
    console.error(error);
}