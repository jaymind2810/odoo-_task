$(document).ready(function() {
    console.log("---------Hhhhehehhhh")
  // Fetch data from the controller route (if data retrieval happens on client-side)
  // ...

  // Assuming data is already available in a variable (replace with your logic)
  var data = { message: 'This is data from Javascript!' };

  // Update the snippet container with data
  var container = $('#data_container');
  console.log(container, "-----_Container===========")
  container.text(data.message);
});