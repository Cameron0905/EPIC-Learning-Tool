const express = require('express');
const router = express.Router();

var module_controller =  require('../controllers/ModuleController');
var lesson_controller =  require('../controllers/LessonController');


router.get('/', module_controller.retrieveModuleNames)

router.get('/:moduleID', lesson_controller.retrieveLessonsList
    // Route path: /:moduleName
    // Request URL: http://localhost:3000/modules/5
    // req.params: { "moduleID": 5}
    
    // Retrieve Lesson names and res.render()
)

router.get('/:moduleID/lessons/:lessonID', lesson_controller.retrieveLesson)


module.exports = router;