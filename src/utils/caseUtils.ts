export const toCamelCase = (str: string) => {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "");
}