const Import = require('../models/Import');

// GET all imports
exports.getImports = async (req, res) => {
  try {
    const imports = await Import.find().sort({ importedAt: -1 });
    res.json(imports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE import record
exports.createImport = async (req, res) => {
  try {
    const importRecord = new Import(req.body);
    const savedImport = await importRecord.save();
    res.status(201).json(savedImport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE import record
exports.deleteImport = async (req, res) => {
  try {
    const deletedImport = await Import.findByIdAndDelete(req.params.id);

    if (!deletedImport) {
      return res.status(404).json({ message: 'Import record not found' });
    }

    res.json({ message: 'Import record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};