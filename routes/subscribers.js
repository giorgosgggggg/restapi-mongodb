const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")


//Getting all
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)

    } catch (err) {
        res.status(500).json({ message: err.message })

    }

})
//Getting one
router.get("/:id", getSubscriber, (req, res) => {
    res.send(res.subscriber)


})
//Creating one
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToNewsletter: req.body.subscribedToNewsletter

    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})
//Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToNewsletter != null) {
        res.subscriber.subscribedToNewsletter = req.body.subscribedToNewsletter
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})
//Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.send({ message: "Succesfully deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})


async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "We can't find this subscriber" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })

    }

    res.subscriber = subscriber
    next()
}

module.exports = router;