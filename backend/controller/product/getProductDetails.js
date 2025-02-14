const productModel = require("../../models/productModel")

const getProductDetails=async(req,res)=>{
    try{
        const {productId} =req.body

        const product=await productModel.findById(productId)

        res.json({
            data:product,
            message:"OK",
            error:false,
            success:true
        })

    }
    catch(err){
        res.json({
            message:err?.message || err,
            error:true,
            success:false
            
        })

    }
}

module.exports =getProductDetails