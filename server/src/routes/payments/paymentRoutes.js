// const { Router } = require("express");
// const PaymentService = require("./PaymentService");
// const PaymentController = require("./PaymentControllers");
// const router = Router();

// const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/linkpayment", function (req, res, next) {
//     try{
//        PaymentInstance.getPaymentLink(req, res); 
//     } catch(error){
//         next(error)
//     }
    
//   });
  
//   router.get("/subscription", function (req, res, next) {
//     try{
//       PaymentInstance.getSubscriptionLink(req, res);  
//     } catch(error){
//         next(error)
//     }
    
//   });