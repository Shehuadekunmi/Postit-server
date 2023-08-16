const router = require("express").Router()

const {getAllStories, getAStory, getAUserStory,
    getAllUserStories, createStory, editStory, deleteStory} = require("../controller/storyController");


   


    // route for uuser
    router.route("/").get(getAllUserStories).post(createStory);
    router.route("/:storyId").get(getAUserStory).patch(editStory).delete(deleteStory);



module.exports = router