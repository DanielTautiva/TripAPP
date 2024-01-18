
export function generateUniqueReference(): string {
    // Lógica para generar una referencia única, por ejemplo, utilizando timestamp y un sufijo aleatorio.
    const timestamp = new Date().getTime();
    const randomSuffix = Math.random().toString(36).substring(7);
  
    return `${timestamp}_${randomSuffix}`;
}