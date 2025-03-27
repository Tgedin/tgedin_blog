import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { path: pathParts } = req.query;
  
  // Ensure pathParts is an array
  const pathArray = Array.isArray(pathParts) ? pathParts : [pathParts];
  const filePath = path.join(process.cwd(), 'content', ...pathArray);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return res.status(404).json({ error: 'File not found' });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    // Set appropriate content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    
    res.setHeader('Content-Type', contentType);
    return res.send(fileBuffer);
  } catch (error) {
    console.error(`Error serving file ${filePath}:`, error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
