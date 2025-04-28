const router = require("express").Router();
let shoppingList = require("../models/ShoppingList");
const Item = require("../models/Item");

router.route("/add-to-list").post((req,res) =>{

    const itemName = req.body.itemName;
    const category = req.body.category;
    const quentity = req.body.quentity;

    const newShoppingList = new shoppingList({

        itemName,
        category,
        quentity
    })


    newShoppingList.save().then(() =>{

        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res) =>{
    shoppingList.find().then((shoppinglist)=>{
        res.json(shoppinglist)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{

    let listId = req.params.id;

    const{itemName, category, quentity} = req.body;

    const updateList = {
        itemName,
        category,
        quentity
    }

    const update = await shoppingList.findByIdAndUpdate(listId, updateList).then(() =>{

        res.status(200).send({status: "Item Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Update!"});
    })

    

})

router.route("/delete/:id").delete(async(req,res)=>{
    let listId = req.params.id;

    await shoppingList.findByIdAndDelete(listId).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Delete"});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let itemId = req.params.id;
    await shoppingList.findById(itemId).then((item) => {
        res.status(200).send({status: "Item fetched", item: item});
    }).catch((err) => { 
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    });
});

router.route("/auto-generate-shopping-list").get(async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to start of the day

        const soonDate = new Date();
        soonDate.setDate(today.getDate() + 7);
        soonDate.setHours(23, 59, 59, 999); // End of the 7th day

        const items = await Item.find({
            $or: [
                { $expr: { $lt: ["$quentity", "$minThreshold"] } },        // Low stock
                { ExpDate: { $lt: today } },                                 // Already expired
                { ExpDate: { $gte: today, $lte: soonDate } }                  // Expiring soon
            ]
        });

        // Add "reason" field to each item based on the condition met
        const enhancedItems = items.map(item => {
            let reason = "";
            
            if (item.quentity < item.minThreshold) {
                reason = "Low Stock";
            } else if (item.ExpDate < today) {
                reason = "Already Expired";
            } else if (item.ExpDate >= today && item.ExpDate <= soonDate) {
                reason = "Expiring Soon";
            }
            
            // Include the reason in the item
            return { ...item.toObject(), reason };
        });

        res.status(200).json(enhancedItems);
    } catch (err) {
        console.error("Error generating shopping list:", err);
        res.status(500).json({ error: "Failed to generate shopping list" });
    }
});








module.exports = router;