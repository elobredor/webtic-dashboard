export async function urlToFile(url: string): Promise<File> {
  try {
    // Cambié 'no-cors' a 'cors' para permitir leer la respuesta si el servidor lo permite
    const response = await fetch(url, {
      method: 'GET',  // Cambié aquí a 'cors' para poder acceder a los datos
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Verifica si el contenido es una imagen
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("image")) {
      throw new Error("La respuesta no contiene una imagen.");
    }

    // Convierte la respuesta a Blob (esto solo funciona si tienes acceso al cuerpo de la respuesta)
    const blob = await response.blob();

    // Crea el objeto File a partir del blob
    return new File([blob], getFilenameFromUrl(url), { type: blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw new Error('Failed to convert URL to File');
  }
}

export function generateUniqueId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function getFilenameFromUrl(url: string): string {
  const filename = url.split('/').pop()?.split('?')[0] || 'image';
  return filename;
}

export function isWebPSupported(): boolean {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}