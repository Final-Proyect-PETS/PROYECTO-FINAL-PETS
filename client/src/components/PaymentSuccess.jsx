import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useLocation().search;
  const purchaseId = params.slice(params.indexOf("=") + 1, params.indexOf("&"));
  console.log(purchaseId);

  return <div>Probando</div>;
}
