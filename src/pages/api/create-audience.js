import fs from 'fs';

export default (req, res) => {
  if (req.method === 'POST') {
    const { name, visitors, sessionTime, bounceRate } = req.body;

    // Read existing data from JSON file
    const data = JSON.parse(fs.readFileSync('./data/audiences.json'));
    const prefix = "id_";
    const uniqueId = prefix + Math.floor(Math.random() * 1000000).toString();
    
    // Add new audience to data object
    const newAudience = { id: data.length + uniqueId, name, visitors, sessionTime, bounceRate };
    data.push(newAudience);

    // Write updated data to JSON file
    fs.writeFileSync('./data/audiences.json', JSON.stringify(data));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
