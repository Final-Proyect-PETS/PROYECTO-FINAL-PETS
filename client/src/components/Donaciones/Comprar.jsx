// import { useEffect } from "react";
// //import axios from 'axios'

// export default function Comprar({ data }) {
//   // console.log(data);
//   useEffect(() => {

//     const script = document.createElement("script");
//     const attr_data_preference = document.createAttribute("data-preference-id");
//     attr_data_preference.value = data;
//     script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
//     script.setAttributeNode(attr_data_preference);
//     document.getElementById("form1").appendChild(script);
//     console.log(script)
    
//   }, [data]);

//   return (
//     <div>
//       <form id="form1"></form>
//     </div>
//   );
// }
