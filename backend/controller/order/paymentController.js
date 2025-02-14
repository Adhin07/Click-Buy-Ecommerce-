const stripe=require("../../config/stripe")
const userModel = require("../../models/userModel")

const paymentController =async(request,response)=>{
    try{
        const {cartItems} =request.body

        const user=await userModel.findOne({_id :request.userId})
        
        const params={
            submit_type:"pay",
            mode:"payment",
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipping_options:[
                {
                    shipping_rate :'shr_1QrZzs2L5AOVKpul8BfzgAdT'
                }
            ],
            customer_email:user.email,
            metadata:{
                userId:request.userId
            },
            line_items :cartItems.map((Item,index)=>{
                return{
                    price_data:{
                     currency:"inr",
                     product_data:{
                        name: Item.productId.productName,
                        images:Item.productId.productImage,
                        metadata :{
                            productId:Item.productId._id
                        } 
                     },
                     unit_amount :Item?.productId.sellingPrice * 100  
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1
                    },
                    quantity:Item.quantity
                }
                
            }),

            success_url:`${process.env.FRONTEND_URL}/success`,
            cancel_url:`${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)
        
        response.status(303).json(session)

    }
    catch(error)
    {
        response.json
        ({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}

module.exports =paymentController