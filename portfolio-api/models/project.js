const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: {
      type: [String],
      required: true
    },
    lien: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;