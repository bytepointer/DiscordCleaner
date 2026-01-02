//this is used to freeze the thread for the sent time;

let sleep = async(ms) => {

    console.log(ms)
    const start = Date.now();

    while(Date.now() - start < ms) {

    }

    return;
}

export { sleep }