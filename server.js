const express = require("express")
const mongoose  = require("mongoose")
const Item = require("./itemModel")

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 6000

const MongoDB_URL = "mongodb+srv://Ameerah:Ameerah1@cluster0.wqgqkvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MongoDB_URL) 
.then(()=>{
    console.log("MongoDB connected...")

    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
})



app.get("/", (req, res)=>{
    response.json({message: "Welcome to the campus Lost & Found system!"})
})

app.get("/all-items", async (req,res)=>{

    const all_items = await Item.find() 

    res.status(200).json({
        message: "success",
        all_items
    }) 
})




// add a found item.
app.post("/item-found", async (req, res)=>{
    const { itemName, description, locationFound, dateFound, claimed } = req.body

    if(!itemName || !description){
        return res.status(400).json({
            message: "Please input all details."
        })
    }

    const newItem = new Item({itemName, description, locationFound, dateFound, claimed})
    await newItem.save()

    res.status(201).json({
        message: "Entry succcessful.",
        newItem
    })
})


// View all unclaimed items
app.get("/all-unclaimed-items", async (req, res)=>{

    const unclaimedItems = await Item.find({claimed: false})

    res.status(200).json({
        message: "Success",
        unclaimedItems
    })
})


// View one item by ID
app.get("/one-item/:id", async (req, res)=>{
    const { id } = req.params
    const item = await Item.findById(id)

    if(!item){
        return res.status(404).json({message: "Item not found."}) 
    }

     res.status(200).json({
        message: "success",
        item
    })
})



// Update an item’s details or mark as claimed
app.put("/edit-item/:id", async (req, res)=>{
    const { id } = req.params
    const { itemName, description, locationFound, dateFound, claimed } = req.body
    const updatedItem = await Item.findByIdAndUpdate(
        id,
        { itemName, description, locationFound, dateFound, claimed },
        { new:true }
    )
    res.status(201).json({
        message: "Update successful",
        updatedItem
    })
})


// Delete old/irrelevant entries
app.delete("/delete-item", async (req, res)=>{
    const { id } = req.body
    const deletedItem = await Item.findByIdAndDelete(id)

    res.status(200).json({ message: "Item successfully deleted." })
})