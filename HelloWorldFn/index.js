const names = ['John', 'Paul', 'George', 'Ringo'];

const generate = () => {
    const index = getRandomInt(names.length);
    return names[index];
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default generate;