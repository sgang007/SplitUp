var input = {
    "data": [
        {
            "item_name": "Chakkali",
            "amount": "15.34"
        },
        {
            "item_name": "Bread",
            "amount": "2.3"
        }
    ]
};

console.log(input);
$("#updateSW").click(function(){

console.log("clicked");
  for( var i=0; i < input.data.length; i ++){
    var d = input.data[i];
    var item_name = $('.item_name').eq(i);
    var amount = $('.amount').eq(i);

    console.log(item_name);
    console.log(amount);
    item_name.val(d.item_name);
    amount.eq(i).val(d.amount);
    $(".item_name").keyup();

  }

});
