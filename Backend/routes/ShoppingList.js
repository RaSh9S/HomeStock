const router = require("express").Router();
let shoppingList = require("../models/ShoppingList");

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
    }).catch((err) => { // Include err as a parameter
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    });
});

module.exports = router;