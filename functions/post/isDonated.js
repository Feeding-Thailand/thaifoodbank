const fb = require("firebase-admin")
const db = fb.firestore()
module.exports = async (req,res) => {
    try{
        const id = req.params.id
        if(!id){
            res.status(400).send("document id not found")
            return
        }
        var query = await db.collection("posts")
            .doc(id)
            .collection('donors')
            .where('uid','==',req.authId)
            .get()
        var data = []
        query.forEach((doc)=>{
            data.push(doc.data())
        })
        if(data.length>0){
            res.send({
                isDonated: true,
                data: data[0]
            })
        }
        res.send({ isDonated: false })
    }
    catch(err){
        console.log(err)
        res.status(500).send("error")
    }
}