export const isJsonString = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return error
    }
}