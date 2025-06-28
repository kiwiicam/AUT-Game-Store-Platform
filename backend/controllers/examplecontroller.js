
export async function exampleController(req, res) {
  try {
    const data = {
        name: "name"
    }
    res.status(200).json({ yoooo: data.name });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
}