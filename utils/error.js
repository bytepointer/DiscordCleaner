let error = (message) => {

    console.error(`Alguma coisa deu errada: ${message}`);
    return process.exit();
}

export { error } 