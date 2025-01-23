export async function blobToWebP(blob: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (webpBlob) => {
            if (webpBlob) {
              resolve(webpBlob);
            } else {
              reject(new Error('Failed to convert to WebP'));
            }
          },
          'image/webp',
          0.9 // Quality setting (0-1)
        );
      };
      
      img.onerror = (e) => reject(new Error('Failed to load image ' + e));
      img.src = URL.createObjectURL(blob);
    });
  }
  
  export async function dataUrlToWebP(dataUrl: string): Promise<string> {
    const response = await fetch(dataUrl,{mode: 'no-cors'});
    if (!response.ok) {
        throw new Error(`Failed to fetch resource: ${response.statusText}`);
      }
    const blob = await response.blob();
    const webpBlob = await blobToWebP(blob);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(webpBlob);
    });
  }