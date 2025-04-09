const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    completed: {type: Boolean, default: false},
});

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    status: {type: String, enum: ['Pending', 'In-Progress', 'Completed'], default: 'Pending'},
    dueDate: {type: Date, required: true},
    assignedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    attachments: [{type: String}], // URLs or file paths
    todoCheckList: [todoSchema],
    progress: {type: Number, min: 0, max: 100, default: 0},
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);