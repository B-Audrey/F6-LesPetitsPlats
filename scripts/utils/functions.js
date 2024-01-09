export const getData = async () => {
    const response = await fetch('../../recipes.json')
    return await response.json();
};

export const isLenghtThreeOrMore =(string) => {
    return string.length >= 3;
}