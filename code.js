<script>
    document.getElementById('simulator-form').addEventListener('submit', function(e) {
      e.preventDefault();

      calculateResults();
      calculateShippingPrice();
    });

    function calculateResults() {
      // Retrieve the form values
	  const confirmationRate = parseFloat(document.getElementById('confirmation-rate').value);
	  const deliveryRate = parseFloat(document.getElementById('delivery-rate').value);
      const leadCost = parseFloat(document.getElementById('lead-cost').value);
      const stock = parseInt(document.getElementById('stock').value);
      const productWeight = parseInt(document.getElementById('product-weight').value);
      const productCost = parseFloat(document.getElementById('product-cost').value);
      const sellingPrice = parseFloat(document.getElementById('selling-price').value);
      const country = document.getElementById('country').value;
	  const swap = document.getElementById('swap').value;
	 

	  const confirmationDeliveryCoeff = (100/confirmationRate)*(100/deliveryRate);
	 
      // Calculate product cost
      const productCostTotal = productCost * stock;

      // Calculate total weight of products (kg)
      const totalWeight = productWeight * stock / 1000;
	  
	  // Calculate total sells
	  const totalSells = sellingPrice*stock;

      // Calculate Shipsen fees based on country
      let cfaAmount, confirmationFees, deliveryFees, leadFees, codVAT, currency;

      if (country === 'Senegal' || country === 'Cote d\'Ivoire' || country === 'Mali' || country === 'Burkina') {
        cfaAmount = 66;
        confirmationFees = 1000;
        deliveryFees = 3000;
        leadFees = 100;
        subscriptionFees = 65000;
        codVAT = 0.1; // 10%
        currency = 'XAF';
      } else if (country === 'Gabon') {
        cfaAmount = 71;
        confirmationFees = 2000;
        deliveryFees = 4000;
        leadFees = 100;
        subscriptionFees = 71000;
        codVAT = 0.1; // 10%
        currency = 'XOF';
      } else if (country === 'Cameroun' || country === 'Argentina') {
        cfaAmount = 70;
        confirmationFees = 1000;
        deliveryFees = 3000;
        leadFees = 100;
        subscriptionFees = 60000;
        codVAT = 0.1; // 10%
        currency = 'XOF';
      }else if (country === 'Guinea') {
		tauxGNF = 16.3;
		cfaAmount = 66*tauxGNF;
        confirmationFees = 1349.7*tauxGNF;
        deliveryFees = 3680.99*tauxGNF;
        leadFees = 104.3*tauxGNF;
        subscriptionFees = 67484.7*tauxGNF;
        codVAT = 0.1; // 10%
        currency = 'GNF';
	  }
	  else if (country === 'Gambia') {
		tauxGMD = 9.3;
		cfaAmount = (66/tauxGMD).toFixed(2);
        confirmationFees = (1209/tauxGMD).toFixed(2);
        deliveryFees = (3627/tauxGMD).toFixed(2);
        leadFees = (120.9/tauxGMD).toFixed(2);
        subscriptionFees = (65100/tauxGMD).toFixed(2);
        codVAT = 0.1; // 10%
        currency = 'GMD';
	  }else if (country === 'Congo Kinshasa') {
		cfaAmount = 9.1;
        confirmationFees = 4;
        deliveryFees = 6.5;
        leadFees = 0.20;
        subscriptionFees = 100;
        codVAT = 0.1; // 10%
        currency = 'USD';
	  }


if (country == "Congo Kinshasa"){
      // Update the table with the calculated values
      document.getElementById('cfa-rate').textContent = '1 ' + currency;
      document.getElementById('cfa-rate-mad').textContent = cfaAmount + ' MAD';
      document.getElementById('confirmation-fees').textContent = parseInt(confirmationFees) + ' ' + currency;
      document.getElementById('confirmation-fees-mad').textContent = parseInt(confirmationFees * cfaAmount) + ' MAD';
      document.getElementById('delivery-fees').textContent = (deliveryFees) + ' ' + currency;
      document.getElementById('delivery-fees-mad').textContent = parseInt(deliveryFees * cfaAmount) + ' MAD';
      document.getElementById('lead-fees').textContent = (leadFees) + ' ' + currency;
      document.getElementById('lead-fees-mad').textContent = (leadFees * cfaAmount) + ' MAD';
	  document.getElementById('cod-vat').textContent = (sellingPrice * codVAT).toFixed(2) + ' ' + currency;
      document.getElementById('cod-vat-mad').textContent = parseInt((sellingPrice * codVAT)*cfaAmount).toFixed(2) + ' MAD';}
	  else {
	  document.getElementById('cfa-rate').textContent = cfaAmount + ' ' + currency;
      document.getElementById('cfa-rate-mad').textContent = '1 MAD';
      document.getElementById('confirmation-fees').textContent = parseInt(confirmationFees) + ' ' + currency;
      document.getElementById('confirmation-fees-mad').textContent = parseInt(confirmationFees / cfaAmount) + ' MAD';
      document.getElementById('delivery-fees').textContent = (deliveryFees) + ' ' + currency;
      document.getElementById('delivery-fees-mad').textContent = parseInt(deliveryFees / cfaAmount) + ' MAD';
      document.getElementById('lead-fees').textContent = (leadFees) + ' ' + currency;
      document.getElementById('lead-fees-mad').textContent = (leadFees / cfaAmount).toFixed(2) + ' MAD';
	  document.getElementById('cod-vat').textContent = (sellingPrice * codVAT).toFixed(2) + ' ' + currency;
      document.getElementById('cod-vat-mad').textContent = parseInt(sellingPrice * codVAT / cfaAmount).toFixed(2) + ' MAD';
	  }

	  
	  // Get the select element
var selectProductcost = document.getElementById("stock-funded");

// Get the selected value
var selectedValueproduct = selectProductcost.value;



if (country == "Congo Kinshasa"){
	if (selectedValueproduct == "Yes") {
	document.getElementById('product-cost-details').textContent = (productCostTotal/cfaAmount).toFixed(2) + ' ' + currency;
	document.getElementById('product-cost-details-mad').textContent = productCostTotal + ' MAD';
	
} 
else{
	document.getElementById('product-cost-details').textContent = '0 ' + currency;
	document.getElementById('product-cost-details-mad').textContent = '0 MAD';
}
}else{
if (selectedValueproduct == "Yes") {
	document.getElementById('product-cost-details').textContent = (productCostTotal*cfaAmount).toFixed(2) + ' ' + currency;
	document.getElementById('product-cost-details-mad').textContent = productCostTotal + ' MAD';
	
} 
else{
	document.getElementById('product-cost-details').textContent = '0 ' + currency;
	document.getElementById('product-cost-details-mad').textContent = '0 MAD';
}	
}




	  
	  const confirmationfees = document.getElementById('confirmation-fees-details').textContent = (confirmationFees * (stock-swap*stock/100)) + ' ' + currency;
	  const deliveryfees = document.getElementById('delivery-fees-details').textContent = (deliveryFees * (stock-swap*stock/100)).toFixed(2) + ' ' + currency;
	  const leadsfees = document.getElementById('leads-fees-details').textContent = (leadFees * stock * confirmationDeliveryCoeff).toFixed(2) + ' ' + currency;
	  
	  if (country == "Congo Kinshasa") {
		  const confirmationfeesMad = document.getElementById('confirmation-fees-details-mad').textContent = ((confirmationFees * (stock-swap*stock/100))*cfaAmount).toFixed(2) + ' MAD';
		  const deliveryfeesMad = document.getElementById('delivery-fees-details-mad').textContent = ((deliveryFees * (stock-swap*stock/100))*cfaAmount).toFixed(2) + ' MAD';
		  const leadsfeesMad = document.getElementById('leads-fees-details-mad').textContent = ((leadFees*stock*confirmationDeliveryCoeff)*cfaAmount).toFixed(2) + ' MAD';
		  const  codvatfeesMad = document.getElementById('cod-vat-details-mad').textContent = ((totalSells * codVAT)*cfaAmount).toFixed(2) + ' MAD';
	}else{
		const confirmationfeesMad = document.getElementById('confirmation-fees-details-mad').textContent = ((confirmationFees * (stock-swap*stock/100))/cfaAmount).toFixed(2) + ' MAD';
		const deliveryfeesMad = document.getElementById('delivery-fees-details-mad').textContent = ((deliveryFees * (stock-swap*stock/100))/cfaAmount).toFixed(2) + ' MAD';
		const leadsfeesMad = document.getElementById('leads-fees-details-mad').textContent = ((leadFees*stock*confirmationDeliveryCoeff)/cfaAmount).toFixed(2) + ' MAD';
		const  codvatfeesMad = document.getElementById('cod-vat-details-mad').textContent = (totalSells * codVAT/cfaAmount).toFixed(2) + ' MAD';
	}
	  
	  
	  
	  const codvatfees = document.getElementById('cod-vat-details').textContent = totalSells * codVAT + ' ' + currency;
    }

  </script>
  <script>
  // Define the transport/clearance amounts based on country, sourcing from, and shipping mode
const transportClearanceAmounts = [
  { country: "Senegal", sourcingFrom: "Morocco", shippingMode: "Standard", amount: 2310 },
  { country: "Senegal", sourcingFrom: "Morocco", shippingMode: "Standard", amountMAD: 33 },
  { country: "Senegal", sourcingFrom: "Morocco", shippingMode: "Express", amount: 4620 },
  { country: "Senegal", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 70 },
  { country: "Senegal", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 8500 },
  { country: "Senegal", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 129 },
  { country: "Senegal", sourcingFrom: "Dubai", shippingMode: "Express", amount: 8500 },
  { country: "Senegal", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 129 },
  { country: "Senegal", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 8500 },
  { country: "Senegal", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 129 },
  { country: "Senegal", sourcingFrom: "Turkey", shippingMode: "Express", amount: 8500 },
  { country: "Senegal", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 129 },
  { country: "Senegal", sourcingFrom: "China", shippingMode: "Standard", amount: 9500 },
  { country: "Senegal", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 144 },
  { country: "Senegal", sourcingFrom: "China", shippingMode: "Express", amount: 12000 },
  { country: "Senegal", sourcingFrom: "China", shippingMode: "Express", amountMAD: 182 },
  
  { country: "Cote d'Ivoire", sourcingFrom: "Morocco", shippingMode: "Standard", amount: 2310 },
  { country: "Cote d'Ivoire", sourcingFrom: "Morocco", shippingMode: "Standard", amountMAD: 35 },
  { country: "Cote d'Ivoire", sourcingFrom: "Morocco", shippingMode: "Express", amount: 5280 },
  { country: "Cote d'Ivoire", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 80 },
  { country: "Cote d'Ivoire", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 8500 },
  { country: "Cote d'Ivoire", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 129 },
  { country: "Cote d'Ivoire", sourcingFrom: "Dubai", shippingMode: "Express", amount: 8500 },
  { country: "Cote d'Ivoire", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 129 },
  { country: "Cote d'Ivoire", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 8500 },
  { country: "Cote d'Ivoire", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 129 },
  { country: "Cote d'Ivoire", sourcingFrom: "Turkey", shippingMode: "Express", amount: 8500 },
  { country: "Cote d'Ivoire", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 129 },
  { country: "Cote d'Ivoire", sourcingFrom: "China", shippingMode: "Standard", amount: 9000 },
  { country: "Cote d'Ivoire", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 136 },
  { country: "Cote d'Ivoire", sourcingFrom: "China", shippingMode: "Express", amount: 12000 },
  { country: "Cote d'Ivoire", sourcingFrom: "China", shippingMode: "Express", amountMAD: 182 },
  
  { country: "Burkina", sourcingFrom: "Morocco", shippingMode: "Standard", amount: 2310 },
  { country: "Burkina", sourcingFrom: "Morocco", shippingMode: "Express", amount: 5280 },
  { country: "Burkina", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 8500 },
  { country: "Burkina", sourcingFrom: "Dubai", shippingMode: "Express", amount: 8500 },
  { country: "Burkina", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 8500 },
  { country: "Burkina", sourcingFrom: "Turkey", shippingMode: "Express", amount: 8500 },
  { country: "Burkina", sourcingFrom: "China", shippingMode: "Standard", amount: 10000 },
  { country: "Burkina", sourcingFrom: "China", shippingMode: "Express", amount: 10000 },
  { country: "Burkina", sourcingFrom: "Morocco", shippingMode: "Standard", amountMAD: 35 },
  { country: "Burkina", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 80 },
  { country: "Burkina", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 129 },
  { country: "Burkina", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 129 },
  { country: "Burkina", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 129 },
  { country: "Burkina", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 129 },
  { country: "Burkina", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 152 },
  { country: "Burkina", sourcingFrom: "China", shippingMode: "Express", amountMAD: 152 },
  
  { country: "Mali", sourcingFrom: "Morocco", shippingMode: "Standard", amount: 2000 },
  { country: "Mali", sourcingFrom: "Morocco", shippingMode: "Express", amount: 5280 },
  { country: "Mali", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 8500 },
  { country: "Mali", sourcingFrom: "Dubai", shippingMode: "Express", amount: 8500 },
  { country: "Mali", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 6500 },
  { country: "Mali", sourcingFrom: "Turkey", shippingMode: "Express", amount: 6500 },
  { country: "Mali", sourcingFrom: "China", shippingMode: "Standard", amount: 12000 },
  { country: "Mali", sourcingFrom: "China", shippingMode: "Express", amount: 12000 },
  { country: "Mali", sourcingFrom: "Morocco", shippingMode: "Standard", amountMAD: 30 },
  { country: "Mali", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 80 },
  { country: "Mali", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 129 },
  { country: "Mali", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 129 },
  { country: "Mali", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 99 },
  { country: "Mali", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 99 },
  { country: "Mali", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 182 },
  { country: "Mali", sourcingFrom: "China", shippingMode: "Express", amountMAD: 182 },
  
  { country: "Cameroun", sourcingFrom: "Morocco", shippingMode: "Express", amount: 7700 },
  { country: "Cameroun", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 9570 },
  { country: "Cameroun", sourcingFrom: "Dubai", shippingMode: "Express", amount: 9570 },
  { country: "Cameroun", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 7500 },
  { country: "Cameroun", sourcingFrom: "Turkey", shippingMode: "Express", amount: 7500 },
  { country: "Cameroun", sourcingFrom: "China", shippingMode: "Standard", amount: 9500 },
  { country: "Cameroun", sourcingFrom: "China", shippingMode: "Express", amount: 9500 },
  { country: "Cameroun", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 110 },
  { country: "Cameroun", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 137 },
  { country: "Cameroun", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 137 },
  { country: "Cameroun", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 107 },
  { country: "Cameroun", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 107 },
  { country: "Cameroun", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 136 },
  { country: "Cameroun", sourcingFrom: "China", shippingMode: "Express", amountMAD: 136 },
  
  { country: "Argentina", sourcingFrom: "Morocco", shippingMode: "Express", amount: 7700 },
  { country: "Argentina", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 9570 },
  { country: "Argentina", sourcingFrom: "Dubai", shippingMode: "Express", amount: 9570 },
  { country: "Argentina", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 7500 },
  { country: "Argentina", sourcingFrom: "Turkey", shippingMode: "Express", amount: 7500 },
  { country: "Argentina", sourcingFrom: "China", shippingMode: "Standard", amount: 9000 },
  { country: "Argentina", sourcingFrom: "China", shippingMode: "Express", amount: 12000 },
  { country: "Argentina", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 110 },
  { country: "Argentina", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 137 },
  { country: "Argentina", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 137 },
  { country: "Argentina", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 107 },
  { country: "Argentina", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 107 },
  { country: "Argentina", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 129 },
  { country: "Argentina", sourcingFrom: "China", shippingMode: "Express", amountMAD: 172 },
  
  { country: "Gabon", sourcingFrom: "Morocco", shippingMode: "Express", amount: 7810 },
  { country: "Gabon", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 11500 },
  { country: "Gabon", sourcingFrom: "Dubai", shippingMode: "Express", amount: 11500 },
  { country: "Gabon", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 7500 },
  { country: "Gabon", sourcingFrom: "Turkey", shippingMode: "Express", amount: 7500 },
  { country: "Gabon", sourcingFrom: "China", shippingMode: "Standard", amount: 12000 },
  { country: "Gabon", sourcingFrom: "China", shippingMode: "Express", amount: 14000 },
  { country: "Gabon", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 110 },
  { country: "Gabon", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 162 },
  { country: "Gabon", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 162 },
  { country: "Gabon", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 106 },
  { country: "Gabon", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 106 },
  { country: "Gabon", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 169 },
  { country: "Gabon", sourcingFrom: "China", shippingMode: "Express", amountMAD: 197 },
  
  { country: "Congo Kinshasa", sourcingFrom: "Morocco", shippingMode: "Express", amount: 10.5 },
  { country: "Congo Kinshasa", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 18 },
  { country: "Congo Kinshasa", sourcingFrom: "Dubai", shippingMode: "Express", amount: 18 },
  { country: "Congo Kinshasa", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 18 },
  { country: "Congo Kinshasa", sourcingFrom: "Turkey", shippingMode: "Express", amount: 18 },
  { country: "Congo Kinshasa", sourcingFrom: "China", shippingMode: "Standard", amount: 17 },
  { country: "Congo Kinshasa", sourcingFrom: "China", shippingMode: "Express", amount: 20 },
  { country: "Congo Kinshasa", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 110 },
  { country: "Congo Kinshasa", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 190 },
  { country: "Congo Kinshasa", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 190 },
  { country: "Congo Kinshasa", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 190 },
  { country: "Congo Kinshasa", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 190 },
  { country: "Congo Kinshasa", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 180 },
  { country: "Congo Kinshasa", sourcingFrom: "China", shippingMode: "Express", amountMAD: 208 },
  
  { country: "Guinea", sourcingFrom: "Morocco", shippingMode: "Express", amount: 86064 },
  { country: "Guinea", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 155991 },
  { country: "Guinea", sourcingFrom: "Dubai", shippingMode: "Express", amount: 155991 },
  { country: "Guinea", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 122250 },
  { country: "Guinea", sourcingFrom: "Turkey", shippingMode: "Express", amount: 122250 },
  { country: "Guinea", sourcingFrom: "China", shippingMode: "Standard", amount: 179300 },
  { country: "Guinea", sourcingFrom: "China", shippingMode: "Express", amount: 179300 },
  { country: "Guinea", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 80 },
  { country: "Guinea", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 145 },
  { country: "Guinea", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 145 },
  { country: "Guinea", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 114 },
  { country: "Guinea", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 114 },
  { country: "Guinea", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 167 },
  { country: "Guinea", sourcingFrom: "China", shippingMode: "Express", amountMAD: 167 },
  
  { country: "Gambia", sourcingFrom: "Morocco", shippingMode: "Express", amount: 604 },
  { country: "Gambia", sourcingFrom: "Dubai", shippingMode: "Standard", amount: 914 },
  { country: "Gambia", sourcingFrom: "Dubai", shippingMode: "Express", amount: 914 },
  { country: "Gambia", sourcingFrom: "Turkey", shippingMode: "Standard", amount: 387 },
  { country: "Gambia", sourcingFrom: "Turkey", shippingMode: "Express", amount: 387 },
  { country: "Gambia", sourcingFrom: "China", shippingMode: "Standard", amount: 1022 },
  { country: "Gambia", sourcingFrom: "China", shippingMode: "Express", amount: 1022 },
  { country: "Gambia", sourcingFrom: "Morocco", shippingMode: "Express", amountMAD: 85 },
  { country: "Gambia", sourcingFrom: "Dubai", shippingMode: "Standard", amountMAD: 129 },
  { country: "Gambia", sourcingFrom: "Dubai", shippingMode: "Express", amountMAD: 129 },
  { country: "Gambia", sourcingFrom: "Turkey", shippingMode: "Standard", amountMAD: 55 },
  { country: "Gambia", sourcingFrom: "Turkey", shippingMode: "Express", amountMAD: 55 },
  { country: "Gambia", sourcingFrom: "China", shippingMode: "Standard", amountMAD: 144 },
  { country: "Gambia", sourcingFrom: "China", shippingMode: "Express", amountMAD: 144 },
];


// Handle form submission
document.getElementById("simulator-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get selected values from the form
  const confirmationRate = parseFloat(document.getElementById('confirmation-rate').value);
  const deliveryRate = parseFloat(document.getElementById('delivery-rate').value);
  const country = document.getElementById("country").value;
  const sourcingFrom = document.getElementById("sourcing-from").value;
  const shippingMode = document.getElementById("shipping-mode").value;
  const stock = parseInt(document.getElementById('stock').value);
  const productWeight = parseInt(document.getElementById('product-weight').value);
  const productCost = parseFloat(document.getElementById('product-cost').value);
  const sellingPrice = parseFloat(document.getElementById('selling-price').value);
  const leadCost = parseFloat(document.getElementById('lead-cost').value);
  const exRate = parseFloat(document.getElementById('exchange-rate').value);
  const otherFees = parseFloat(document.getElementById('other-fees').value);
  const storeFees = parseFloat(document.getElementById('store-fees').value);
  const adstest = parseFloat(document.getElementById('ads-test').value);
  const swapAmount = parseFloat(document.getElementById('swap').value);
  
  const confirmationDeliveryCoeff = (100/confirmationRate)*(100/deliveryRate);
  
  // Calculate product cost
      const productCostTotal = productCost * stock;

      // Calculate total weight of products (kg)
      const totalWeight = productWeight * stock / 1000;
	  
	 // Calculate total sells
	  const totalSells = sellingPrice*(stock-stock*swapAmount/100);
  
    let cfaAmount, currency;

      if (country === 'Senegal' || country === 'Cote d\'Ivoire' || country === 'Mali' || country === 'Burkina') {
        cfaAmount = 66;
        confirmationFees = 1000;
        deliveryFees = 3000;
        leadFees = 100;
        subscriptionFees = 65000;
        codVAT = 0.1; // 10%
        currency = 'XAF';
      } else if (country === 'Gabon') {
        cfaAmount = 71;
        confirmationFees = 2000;
        deliveryFees = 4000;
        leadFees = 100;
        subscriptionFees = 71000;
        codVAT = 0.1; // 10%
        currency = 'XOF';
      } else if (country === 'Cameroun' || country === 'Argentina') {
        cfaAmount = 70;
        confirmationFees = 1000;
        deliveryFees = 3000;
        leadFees = 100;
        subscriptionFees = 60000;
        codVAT = 0.1; // 10%
        currency = 'XOF';
      } else if (country === 'Guinea') {
		tauxGNF = 16.3;
		cfaAmount = 66*tauxGNF;
        confirmationFees = 1000*tauxGNF;
        deliveryFees = 3000*tauxGNF;
        leadFees = 100*tauxGNF;
        subscriptionFees = 65000*tauxGNF;
        codVAT = 0.1; // 10%
        currency = 'GNF';
	  }else if (country === 'Gambia') {
		tauxGMD = 9.3;
		cfaAmount = (66/tauxGMD).toFixed(2);
        confirmationFees = (1209/tauxGMD).toFixed(2);
        deliveryFees = (3627/tauxGMD).toFixed(2);
        leadFees = (120.9/tauxGMD).toFixed(2);
        subscriptionFees = (6500/tauxGMD).toFixed(2);
        codVAT = 0.1; // 10%
        currency = 'GMD';
	  }else if (country === 'Congo Kinshasa') {
		cfaAmount = 9.1;
        confirmationFees = 4;
        deliveryFees = 6.5;
        leadFees = 0.20;
        subscriptionFees = 100;
        codVAT = 0.1; // 10%
        currency = 'USD';
	  }
 

  // Find the corresponding transport/clearance amount
  const selectedEntry = transportClearanceAmounts.find(function(entry) {
    return (
      entry.country === country &&
      entry.sourcingFrom === sourcingFrom &&
      entry.shippingMode === shippingMode 
    );
  });
  
  
  if (country === "Congo Kinshasa") {
    document.getElementById("transport-clearance-details").textContent = (selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
    document.getElementById("transport-clearance-details-mad").textContent = ((selectedEntry.amount*totalWeight)*exRate).toFixed(2) + ' MAD' ;
  }else{
	document.getElementById("transport-clearance-details").textContent = selectedEntry.amount*totalWeight + ' ' + currency;
    document.getElementById("transport-clearance-details-mad").textContent = ((selectedEntry.amount*totalWeight)/cfaAmount).toFixed(2) + ' MAD' ;
  }
	
  

  // Display the amount in the appropriate table cell
  if (selectedEntry) {
		  // Get the select element
var selectElement = document.getElementById("shipsen-subscription");
var selectsellerProductcost = document.getElementById("stock-funded");

// Get the selected value
var selectedValue = selectElement.value;
var selectedsellerValueproduct = selectsellerProductcost.value;

if (country === "Congo Kinshasa") {
	if (selectedValue === "Yes" && selectedsellerValueproduct === "Yes") {
  document.getElementById("shipsen-total-charges").textContent = (productCostTotal/cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((productCostTotal/cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)*cfaAmount).toFixed(2) + ' MAD' ;
} else if (selectedValue === "No" && selectedsellerValueproduct === "No") {
  document.getElementById("shipsen-total-charges").textContent = (confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)*cfaAmount).toFixed(2) + ' MAD' ;
} else if (selectedValue === "Yes" && selectedsellerValueproduct === "No"){
	document.getElementById("shipsen-total-charges").textContent = (confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
 leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)*cfaAmount).toFixed(2) + ' MAD' ;
}else if (selectedValue === "No" && selectedsellerValueproduct === "Yes"){
	document.getElementById("shipsen-total-charges").textContent = (productCostTotal/cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((productCostTotal/cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)*cfaAmount).toFixed(2) + ' MAD' ;
}
	
}else{
	if (selectedValue === "Yes" && selectedsellerValueproduct === "Yes") {
  document.getElementById("shipsen-total-charges").textContent = (productCostTotal*cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((productCostTotal*cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)/cfaAmount).toFixed(2) + ' MAD' ;
} else if (selectedValue === "No" && selectedsellerValueproduct === "No") {
  document.getElementById("shipsen-total-charges").textContent = (confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)/cfaAmount).toFixed(2) + ' MAD' ;
} else if (selectedValue === "Yes" && selectedsellerValueproduct === "No"){
	document.getElementById("shipsen-total-charges").textContent = (confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
 leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)/cfaAmount).toFixed(2) + ' MAD' ;
}else if (selectedValue === "No" && selectedsellerValueproduct === "Yes"){
	document.getElementById("shipsen-total-charges").textContent = (productCostTotal*cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT +
	selectedEntry.amount*totalWeight).toFixed(2) + ' ' + currency;
  document.getElementById("shipsen-total-charges-mad").textContent = ((productCostTotal*cfaAmount + confirmationFees*(stock-swapAmount*stock/100) + deliveryFees*(stock-swapAmount*stock/100) + 
	leadFees*stock*confirmationDeliveryCoeff + totalSells*codVAT + selectedEntry.amount*totalWeight)/cfaAmount).toFixed(2) + ' MAD' ;
}
	
}



if (selectedsellerValueproduct == "No") {
    if (country === "Congo Kinshasa") {
        document.getElementById('seller-product-cost-details').textContent = (productCostTotal/cfaAmount).toFixed(1) + ' ' + currency;
    } else {
        document.getElementById('seller-product-cost-details').textContent = (productCostTotal*cfaAmount).toFixed(1) + ' ' + currency;
    }

    document.getElementById('seller-product-cost-details-mad').textContent = productCostTotal + ' MAD';
    document.getElementById("seller-product-cost-details-usd").textContent = (productCostTotal/exRate).toFixed(1) + ' USD';
} 
else {
    document.getElementById('seller-product-cost-details').textContent = '0 ' + currency;
    document.getElementById('seller-product-cost-details-mad').textContent = '0 MAD';
    document.getElementById('seller-product-cost-details-usd').textContent = '0 USD';
}

	if (country === "Congo Kinshasa") {
	document.getElementById("seller-facebook-ads-charges-usd").textContent = (adstest + stock*confirmationDeliveryCoeff*leadCost).toFixed(2) + ' USD';
	document.getElementById("seller-facebook-ads-charges").textContent = (((stock*confirmationDeliveryCoeff*leadCost+adstest)*(exRate/cfaAmount))).toFixed(1) + ' ' + currency;
	document.getElementById("seller-facebook-ads-charges-mad").textContent = (exRate * (stock*confirmationDeliveryCoeff*leadCost+adstest)).toFixed(2)  + ' MAD';
	}else {
	document.getElementById("seller-facebook-ads-charges-usd").textContent = (adstest + stock*confirmationDeliveryCoeff*leadCost).toFixed(2) + ' USD';	
	document.getElementById("seller-facebook-ads-charges").textContent = (((stock*confirmationDeliveryCoeff*leadCost+adstest)*exRate)*cfaAmount).toFixed(1) + ' ' + currency;
	document.getElementById("seller-facebook-ads-charges-mad").textContent = (exRate * (stock*confirmationDeliveryCoeff*leadCost+adstest)).toFixed(2)  + ' MAD';
	}
	
	document.getElementById("store-fees-usd").textContent = storeFees + ' USD';
	document.getElementById("store-fees-mad").textContent = storeFees*exRate + ' MAD';
	
	if (country === "Congo Kinshasa") {
	document.getElementById("store-fees-cfa").textContent = (storeFees*(exRate/cfaAmount)).toFixed(1) + ' ' + currency;
	document.getElementById("seller-other-charges").textContent = ((otherFees*(exRate/cfaAmount))).toFixed(1) + ' ' + currency; 		
	}else{
	document.getElementById("store-fees-cfa").textContent = (storeFees*exRate*cfaAmount).toFixed(1) + ' ' + currency;
	document.getElementById("seller-other-charges").textContent = ((otherFees*exRate)*cfaAmount).toFixed(1) + ' ' + currency; 		
	}
	
	document.getElementById("seller-other-charges-usd").textContent = otherFees + ' USD';	
	document.getElementById("seller-other-charges-mad").textContent = otherFees*exRate + ' MAD'; 
	
	
	if (selectedsellerValueproduct == "No"){
		if (country === "Congo Kinshasa") {
	document.getElementById("seller-total-charges").textContent = (productCostTotal/cfaAmount +
	(stock*confirmationDeliveryCoeff*leadCost*(exRate/cfaAmount)) + (otherFees*(exRate/cfaAmount)) + storeFees*(exRate/cfaAmount) + adstest*(exRate/cfaAmount)).toFixed(2) + ' ' + currency ;
	document.getElementById("seller-total-charges-mad").textContent = (productCostTotal + 
	(stock*confirmationDeliveryCoeff*leadCost*exRate) + otherFees*exRate + storeFees*exRate + adstest*exRate).toFixed(2) + ' MAD';
	document.getElementById("seller-total-charges-usd").textContent = (productCostTotal/exRate +
	(stock*confirmationDeliveryCoeff*leadCost) + otherFees + storeFees +adstest).toFixed(2) + ' USD';	
			
		}else {
	document.getElementById("seller-total-charges").textContent = (productCostTotal*cfaAmount +
	(stock*confirmationDeliveryCoeff*leadCost*exRate)*cfaAmount + (otherFees*exRate)*cfaAmount + storeFees*exRate*cfaAmount + adstest*exRate*cfaAmount).toFixed(2) + ' ' + currency ;
	document.getElementById("seller-total-charges-mad").textContent = (productCostTotal + 
	(stock*confirmationDeliveryCoeff*leadCost*exRate) + otherFees*exRate + storeFees*exRate + adstest*exRate).toFixed(2) + ' MAD';
	document.getElementById("seller-total-charges-usd").textContent = (productCostTotal/exRate +
	(stock*confirmationDeliveryCoeff*leadCost) + otherFees + storeFees +adstest).toFixed(2) + ' USD';	
			
		}
		
	}else{
		if (country === "Congo Kinshasa") {
	document.getElementById("seller-total-charges").textContent = ((stock*confirmationDeliveryCoeff*leadCost*(exRate/cfaAmount)) + (otherFees*(exRate/cfaAmount)) + storeFees*(exRate/cfaAmount) + adstest*(exRate/cfaAmount)).toFixed(2) + ' ' + currency ;
	document.getElementById("seller-total-charges-mad").textContent = ((stock*confirmationDeliveryCoeff*leadCost*exRate) + 
	otherFees*exRate + adstest*exRate + storeFees*exRate).toFixed(2) +' MAD';
	document.getElementById("seller-total-charges-usd").textContent = ((stock*confirmationDeliveryCoeff*leadCost) + otherFees + adstest + storeFees).toFixed(2) + ' USD';
			
		}else {
	document.getElementById("seller-total-charges").textContent = ((stock*confirmationDeliveryCoeff*leadCost*exRate)*cfaAmount + 
	(otherFees*exRate)*cfaAmount + (adstest*exRate)*cfaAmount + (storeFees*exRate)*cfaAmount).toFixed(2) + ' ' + currency ;
	document.getElementById("seller-total-charges-mad").textContent = ((stock*confirmationDeliveryCoeff*leadCost*exRate) + 
	otherFees*exRate + adstest*exRate + storeFees*exRate).toFixed(2) +' MAD';
	document.getElementById("seller-total-charges-usd").textContent = ((stock*confirmationDeliveryCoeff*leadCost) + otherFees + adstest + storeFees).toFixed(2) + ' USD';
			
		}
	}

	
	if (swapAmount == "0" || swapAmount == ""){
		document.getElementById("swap-mad").textContent = 0 +' MAD';
		document.getElementById("swap-usd").textContent = 0 +' USD';
	}else if (swapAmount >= 1){
		if (country == "Congo Kinshasa"){
		const swapAmountMAD = (Math.ceil(swapAmount*stock/100) * productCost +((Math.ceil(swapAmount*stock/100))*(productWeight/1000)*selectedEntry.amount)*cfaAmount).toFixed(2);
		const swapAmountUSD = ((Math.ceil(swapAmount*stock/100) * productCost +((Math.ceil(swapAmount*stock/100))*(productWeight/1000)*selectedEntry.amount)*cfaAmount)/exRate).toFixed(2);
		document.getElementById("swap-mad").textContent =  swapAmountMAD + ' MAD';
		document.getElementById("swap-usd").textContent = swapAmountUSD + ' USD';
		}else{
		const swapAmountMAD = (Math.ceil(swapAmount*stock/100) * productCost +((Math.ceil(swapAmount*stock/100))*(productWeight/1000)*selectedEntry.amount)/cfaAmount).toFixed(2);
		const swapAmountUSD = (Math.ceil(swapAmount*stock/100) * productCost/exRate +((Math.ceil(swapAmount*stock/100))*(productWeight/1000)*(selectedEntry.amount)/cfaAmount/exRate)).toFixed(2);
		document.getElementById("swap-mad").textContent =  swapAmountMAD + ' MAD';
		document.getElementById("swap-usd").textContent = swapAmountUSD + ' USD';
		}
		
	}
	
	
	const facebookadsCharges = (adstest + stock*confirmationDeliveryCoeff*leadCost)*exRate;
	
	const budgetMAD = (productCostTotal + facebookadsCharges + storeFees*exRate + otherFees*exRate).toFixed(2);
	const budgetUSD = (productCostTotal/exRate + facebookadsCharges/exRate + storeFees + otherFees).toFixed(2);


var selectbudgetProductcost = document.getElementById("stock-funded");

// Get the selected value
var selectedsellerValueproduct = selectbudgetProductcost.value;

if (selectedsellerValueproduct == "No"){
	document.getElementById("budget-mad").textContent = budgetMAD + ' MAD';
	document.getElementById("budget-usd").textContent = budgetUSD + ' USD';
}else{
	document.getElementById("budget-mad").textContent = (budgetMAD-productCostTotal).toFixed(2) + ' MAD';
	document.getElementById("budget-usd").textContent = (budgetUSD-(productCostTotal/exRate)).toFixed(2) + ' USD';
	
}

const budgetToinvestMAD = parseInt(document.getElementById("budget-mad").textContent);
const budgetToinvestUSD = parseInt(document.getElementById("budget-usd").textContent);


const totalsellerchargesmad = parseInt(document.getElementById("seller-total-charges-mad").textContent);
const totalsellerchargesusd = parseInt(document.getElementById("seller-total-charges-usd").textContent);

const swapmad = parseInt(document.getElementById("swap-mad").textContent);
const swapusd = parseInt(document.getElementById("swap-usd").textContent);


const totalshipsenchargesmad = parseInt(document.getElementById("shipsen-total-charges-mad").textContent);

var selectshipsensubscription = document.getElementById("shipsen-subscription");

var selectvaluesubscription = selectshipsensubscription.value;


// Calculate net profit values

if (country == "Congo Kinshasa"){
	var netProfitMAD = ((totalSells*cfaAmount) - (budgetToinvestMAD + totalshipsenchargesmad)).toFixed(2);
	var netProfitUSD = (((totalSells*cfaAmount)-(budgetToinvestUSD*exRate+(totalshipsenchargesmad)))/exRate).toFixed(2);
}else{

var netProfitMAD = ((totalSells / cfaAmount) - (budgetToinvestMAD + totalshipsenchargesmad)).toFixed(2);
var netProfitUSD = ((totalSells / cfaAmount) / exRate - (budgetToinvestUSD + (totalshipsenchargesmad / exRate))).toFixed(2);
}

// Set text content for net profit values
document.getElementById("net-profit-mad").textContent = netProfitMAD + ' MAD';
document.getElementById("net-profit-usd").textContent = netProfitUSD + ' USD';


// Remove color classes
document.getElementById("net-profit-mad").classList.remove("positive", "negative");
document.getElementById("net-profit-usd").classList.remove("positive", "negative");

// Add color classes based on net profit values
if (parseFloat(netProfitMAD) > 0) {
  document.getElementById("net-profit-mad").classList.add("positive");
} else if (parseFloat(netProfitMAD) < 0) {
  document.getElementById("net-profit-mad").classList.add("negative");
}

if (parseFloat(netProfitUSD) > 0) {
  document.getElementById("net-profit-usd").classList.add("positive");
} else if (parseFloat(netProfitUSD) < 0) {
  document.getElementById("net-profit-usd").classList.add("negative");
}

	
	
const netprofitmad = parseInt(document.getElementById("net-profit-mad").textContent);
const netprofitusd = parseInt(document.getElementById("net-profit-usd").textContent);

var roiMAD = ((netprofitmad / budgetToinvestMAD) * 100).toFixed(2);
var roiUSD = ((netprofitusd / budgetToinvestUSD) * 100).toFixed(2);

document.getElementById("roi-mad").textContent = roiMAD + ' %';
document.getElementById("roi-usd").textContent = roiUSD + ' %';

// Remove color classes
document.getElementById("roi-mad").classList.remove("positive", "negative");
document.getElementById("roi-usd").classList.remove("positive", "negative");

// Add color classes based on ROI values
if (parseFloat(netProfitMAD) > 0) {
  document.getElementById("roi-mad").classList.add("positive");
  document.getElementById("roi-usd").classList.add("positive");
} else if (parseFloat(netProfitMAD) < 0) {
  document.getElementById("roi-mad").classList.add("negative");
  document.getElementById("roi-usd").classList.add("negative");
}

  const shipsentotalcharges = document.getElementById("shipsen-total-charges-mad").textContent;
  const totalCosts = (budgetToinvestMAD + parseFloat(shipsentotalcharges))*cfaAmount;
  const totalCostsRDC = (budgetToinvestMAD + parseFloat(shipsentotalcharges))/cfaAmount;
  const unitSold = stock - (stock * swapAmount / 100);
  
  const minimumSellingPrice = Math.ceil(totalCosts / unitSold / 1000) * 1000;
  const minimumSellingPriceRDC = Math.ceil(totalCostsRDC / unitSold);

if (country == "Congo Kinshasa"){
var breakevenQuantitymad = Math.floor((budgetToinvestMAD + totalshipsenchargesmad + swapmad) / (sellingPrice*cfaAmount));
var breakevenQuantityusd = Math.floor((budgetToinvestUSD + (totalshipsenchargesmad/exRate) + swapusd) / ((sellingPrice*cfaAmount)/exRate));

// Display the calculated minimum selling price in the table
  document.getElementById("minimum-selling-price").textContent = minimumSellingPriceRDC.toFixed(2) + ' ' + currency;
}else{
var breakevenQuantitymad = Math.floor((budgetToinvestMAD + totalshipsenchargesmad + swapmad) / (sellingPrice / cfaAmount));
var breakevenQuantityusd = Math.floor((budgetToinvestUSD + totalshipsenchargesmad/exRate + swapusd) / ((sellingPrice / cfaAmount)/exRate));

// Display the calculated minimum selling price in the table
  document.getElementById("minimum-selling-price").textContent = minimumSellingPrice.toFixed(2) + ' ' + currency;
}
document.getElementById("break-even-mad").textContent = breakevenQuantitymad + ' Pcs';
document.getElementById("break-even-usd").textContent = breakevenQuantityusd + ' Pcs';

var netprofitperproductMAD = netprofitmad/stock;
var netprofitperproductUSD = netprofitusd/stock;

document.getElementById("net-profit-perproduct-mad").textContent = netprofitperproductMAD.toFixed(2) + ' MAD';
document.getElementById("net-profit-perproduct-usd").textContent = (netprofitperproductUSD).toFixed(2) + ' USD';

// Remove color classes
document.getElementById("net-profit-perproduct-mad").classList.remove("positive", "negative");
document.getElementById("net-profit-perproduct-usd").classList.remove("positive", "negative");

// Add color classes based on ROI values
if (parseFloat(netProfitMAD) > 0) {
  document.getElementById("net-profit-perproduct-mad").classList.add("positive");
  document.getElementById("net-profit-perproduct-usd").classList.add("positive");
} else if (parseFloat(netProfitMAD) < 0) {
  document.getElementById("net-profit-perproduct-mad").classList.add("negative");
  document.getElementById("net-profit-perproduct-usd").classList.add("negative");
}
	
  } else {
    document.getElementById("transport-clearance-details").textContent = "N/A";
  }
  

  
  
});


function updateShippingMode() {
    const countrySelect = document.getElementById("country");
    const shippingModeSelect = document.getElementById("shipping-mode");

    const selectedCountry = countrySelect.value;
    const expressOption = shippingModeSelect.querySelector('option[value="Express"]');
    const standardOption = shippingModeSelect.querySelector('option[value="Standard"]');

    if (selectedCountry === "Gabon" || selectedCountry === "Cameroun" || selectedCountry === "Argentina" || selectedCountry === "Congo Kinshasa" || selectedCountry === "Guinea") {
      expressOption.style.display = "block";
      standardOption.style.display = "none";
      shippingModeSelect.value = "Express"; // Set default value to Express
    } else {
      expressOption.style.display = "block";
      standardOption.style.display = "block";
    }
  }
  
  function updateCurrencySymbol() {
  var cfaHead = document.getElementById("cfaHead");
  var countrySelect = document.getElementById("country");
  var currencySymbol = document.querySelector(".currency-input .currency-symbol");
  var currencyColumn = document.querySelector("#details-table th:nth-child(2)");
  var shipsenCurrencyColumn = document.querySelector("#shipsen-charges th:nth-child(2)");
  var sellerCurrencyColumn = document.querySelector("#seller-charges th:nth-child(3)");

  // Get the selected value from the dropdown
  var selectedCountry = countrySelect.value;

  // Update the currency symbol based on the selected value
  switch (selectedCountry) {
    case "Senegal":
    case "Cote d'Ivoire":
    case "Mali":
    case "Burkina":
	  cfaHead.textContent = "CFA"
      currencySymbol.textContent = "CFA";
      currencyColumn.textContent = "Amount (XAF)";
	  shipsenCurrencyColumn.textContent = "Amount (XAF)";
	  sellerCurrencyColumn.textContent = "Amount (XAF)";
      break;
	case "Gabon":
    case "Cameroun":
    case "Argentina":
	  cfaHead.textContent = "CFA"
      currencySymbol.textContent = "CFA";
      currencyColumn.textContent = "Amount (XOF)";
	  shipsenCurrencyColumn.textContent = "Amount (XOF)";
	  sellerCurrencyColumn.textContent = "Amount (XOF)";
	  break;
	  
    case "Guinea":
	  cfaHead.textContent = "GNF"
      currencySymbol.textContent = "GNF";
      currencyColumn.textContent = "Amount (GNF)";
	  shipsenCurrencyColumn.textContent = "Amount (GNF)";
	  sellerCurrencyColumn.textContent = "Amount (GNF)";
      break;
    case "Gambia":
	  cfaHead.textContent = "CFA"
      currencySymbol.textContent = "GMD";
      currencyColumn.textContent = "Amount (GMD)";
	  shipsenCurrencyColumn.textContent = "Amount (GMD)";
	  sellerCurrencyColumn.textContent = "Amount (GMD)";
      break;
    case "Congo Kinshasa":
	  cfaHead.textContent = "USD-RDC"
      currencySymbol.textContent = "USD";
      currencyColumn.textContent = "Amount (USD-RDC)";
	  shipsenCurrencyColumn.textContent = "Amount (USD-RDC)";
	  sellerCurrencyColumn.textContent = "Amount (USD-RDC)";
      break;
    default:
	  cfaHead.textContent = "CFA"  
      currencySymbol.textContent = "CFA";
      currencyColumn.textContent = "Amount (CFA)";
	  shipsenCurrencyColumn.textContent = "Amount (CFA)";
	  sellerCurrencyColumn.textContent = "Amount (CFA)";
      break;
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
    updateFlagIcon();
	updateSourcingFlagIcon();
  });


function updateFlagIcon() {
    var countrySelect = document.getElementById("country");
    var flagIcon = document.getElementById("selected-flag");

    // Get the selected value from the dropdown
    var selectedCountry = countrySelect.value;

    // Update the flag icon based on the selected value
    switch (selectedCountry) {
      case "Senegal":
        flagIcon.src = "flags/senegal.png";
        break;
      case "Mali":
        flagIcon.src = "flags/mali.png";
        break;
      case "Mali":
        flagIcon.src = "flags/mali.png";
        break;
	 case "Cote d'Ivoire":
        flagIcon.src = "flags/cote-divoire.png";
        break;
	 case "Gabon":
        flagIcon.src = "flags/gabon.png";
        break;
	 case "Cameroun":
        flagIcon.src = "flags/cameroun.png";
        break;
	 case "Argentina":
        flagIcon.src = "flags/argentina.png";
        break;
	 case "Guinea":
        flagIcon.src = "flags/guinea.png";
        break;
	 case "Gambia":
        flagIcon.src = "flags/gambia.png";
        break;
	 case "Burkina":
        flagIcon.src = "flags/burkina.png";
        break;
	 case "Congo Kinshasa":
        flagIcon.src = "flags/rdc.png";
        break;
      default:
        flagIcon.src = "flags/senegal.png"; // Default placeholder image
        break;
    }
  }
  
  function updateSourcingFlagIcon() {
    var sourcingSelect = document.getElementById("sourcing-from");
    var sourcingFlagIcon = document.getElementById("sourcing-flag");

    // Get the selected value from the dropdown
    var selectedSourcing = sourcingSelect.value;

    // Update the flag icon based on the selected value
    switch (selectedSourcing) {
      case "Morocco":
        sourcingFlagIcon.src = "flags/morocco.png";
        break;
      case "China":
        sourcingFlagIcon.src = "flags/china.png";
        break;
      case "Dubai":
        sourcingFlagIcon.src = "flags/uae.png";
        break;
	  case "Turkey":
        sourcingFlagIcon.src = "flags/turkey.png";
        break;
      // Add more cases for other sourcing options if needed
      default:
        sourcingFlagIcon.src = "flags/placeholder.png"; // Default placeholder image
        break;
    }
  }
  </script>