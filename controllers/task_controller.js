const express = require('express');
const app = express();
const Task = require("./../models/task");

app.get('/', function (req, res) {
    res.json({
        'success': true,
        'message' : 'Welcome to NODEJS + MONGODB + COMPASS + EXPRESSS',
        'data' : []
    })
});


//Listar Tareas
app.get('/task', function (req, res) {
    Task.find({})
            .exec( (err, taskList) => {
                if(err){
                    return res.json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(taskList == ''){
                    return res.json({
                        'success': false,
                        'message' : 'List Empty',
                        'data' : []
                    })
                }
                return res.json({
                    'success': true,
                    'message' : 'Task List',
                    'data' : [taskList]
                })
                
            });

});
  
//Agregar Tareas
app.post('/task', function (req, res) {
    let data = req.body;
    let task = new Task({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
    });

    task.save((err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task saved successfully',
            'data' : [taskDB]
        })
    });
});


//Buscar una tarea
app.get('/task/:id', function (req, res) {
    let id = req.params.id;

    Task.findById(id)
            .exec( (err, taskDetail) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(!taskDetail){
                    return res.json({
                        'success': false,
                        'message' : 'Task doesnt found',
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Task Detail',
                    'data' : [taskDetail]
                })
            });
});


//Actualizar una tarea
app.put('/task/:id', function (req, res) {
    let id = req.params.id;
    let data = {title : req.body.title, description: req.body.description}
    Task.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task updated successfully',
            'data' : [taskDB]
        })
    });
});


//Cambiar el estado de una tarea
app.patch('/task/:id', function (req, res) {
    let id = req.params.id;
    let data = { active : req.body.active };
    Task.findByIdAndUpdate(id, data, {new : false,  runValidators: true}, (err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!taskDB){
            return res.json({
                'success': false,
                'message' : 'Task doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task update successfully',
            'data' : [taskDB]
        })
    });
});


//Eliminar una tarea
app.delete('/task/:id', function (req, res) {
    let id = req.params.id;
    Task.findByIdAndDelete(id, (err, taskDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!taskDB){
            return res.json({
                'success': false,
                'message' : 'Task doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Task deleted successfully',
            'data' : [taskDB]
        })
    });
});
module.exports = app;