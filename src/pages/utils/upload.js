
export async function uploadToCloudinary(api, file, folder = 'Material_HUB') {
  if (!file) throw new Error('No file provided to uploadToCloudinary');

  const sigRes = await api.post('/api/cloudinary/signature', { folder });
  const { signature, timestamp, apiKey, cloudName } = sigRes.data;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append("access_mode", "public");

  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!cloudRes.ok) {
    const text = await cloudRes.text();
    throw new Error('Cloudinary upload failed: ' + text);
  }

  const data = await cloudRes.json();
  return data;
}
