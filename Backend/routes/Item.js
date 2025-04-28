const router = require("express").Router();
let Item = require("../models/Item");

router.route("/add-to-inventory").post((req,res) =>{

    const itemName = req.body.itemName;
    const category = req.body.category;
    const quentity = req.body.quentity;
    const MfdDate = req.body.MfdDate;
    const ExpDate = req.body.ExpDate;
    const minThreshold = req.body.minThreshold;
    
    

    const newItem = new Item({

        itemName,
        category,
        quentity,
        MfdDate,
        ExpDate,
        minThreshold
    })


    newItem.save().then(() =>{

        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res) =>{
    Item.find().then((Item)=>{
        res.json(Item)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{

    let ItemId = req.params.id;

    const{itemName, category, quentity, MfdDate, ExpDate, minThreshold} = req.body;

    const updateItem = {
        itemName,
        category,
        quentity,
        MfdDate,
        ExpDate,
        minThreshold

    }

    const update = await Item.findByIdAndUpdate(ItemId, updateItem).then(() =>{

        res.status(200).send({status: "Item Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Update!"});
    })

    

})

router.route("/delete/:id").delete(async(req,res)=>{
    let ItemId = req.params.id;

    await Item.findByIdAndDelete(ItemId).then(()=>{
        res.status(200).send({status: "Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Delete"});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let itemId = req.params.id;
    await Item.findById(itemId).then((item) => {
        res.status(200).send({status: "Item fetched", item: item});
    }).catch((err) => { // Include err as a parameter
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    });
});




module.exports = router;