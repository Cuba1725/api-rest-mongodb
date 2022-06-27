export const errorsTokens = (message) => {
    switch (message) {
        case "jwt malformed":
            return "Formato no valido";
        case "invalid token":
        case "jwt expired":
        case "invalid signature":
            return "Token no valido";
        default:
            return message;
    }
}