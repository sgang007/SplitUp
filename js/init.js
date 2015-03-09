var input = {
		"data": [
				{
						"item": "Chakkali",
						"price": "15.34"
				},
				{
						"item": "Bread",
						"price": "2.3"
				},

				{
						"item": "Jam",
						"price": "5.3"
				}
		]
};




var init  = function () {

// $("#add_bill").modal("show");
// $("a[href='#add_bill']").trigger("click");
// $(".btn-orange")[0].click();
//
// setTimeout(
// 	function(){
// 				$(".split").trigger("click");
// 				setTimeout(
// 					function(){
// 				$(".itemized").trigger("click");
// 					},
// 					2000
// 				);
// 	},
// 	2000
// );

var btn = $('<input type="button" value="Update it" id="updateSW" style="position:absolute;z-index:99999">');

var lbtn = $('<input type="file" id="loadFile" style="position:absolute;z-index:99999;right:10px;top:60px;">');


var fileDisplayArea = $('<div id="fileDisplayArea"></div>');

$('body').prepend(lbtn);
// $('body').prepend(btn);
$('body').prepend(fileDisplayArea);

// console.log(input);


$('button.itemized').on("click", function(){

		$("#loadFile").show();
});

$("#updateSW").on("click",function(){

console.log("clicked");
	// for( var i=0; i < input.data.length; i ++){
		// createRow(input.data);


	// }

});

$("#loadFile").on("change", function(){
		// var self = this;
		readFile(this,function(data){
				createRow(data);
		});
});
};


function readFile(self,callback) {
	var file = self.files[0];
		var textType = /text.*/;
					var spObjArr = [];
		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				//fileDisplayArea.text(reader.result);
				var fileCnt = reader.result;
						lines = fileCnt.trim().split("\n");
								for(var i=0;i<lines.length;i++){
										var spObj = {};
										var words = lines[i].trim().split(/\s+/);
										var fw = words[0];
										if(words.length >= 3 && fw.indexOf(".") == -1 && fw.indexOf(",") == -1 && fw.length > 1 && fw != "Discount"){
                        //console.log(words);
                        var item = words.slice(1,-1);
                        var price = words.pop().slice(1).replace(",",".");
                        var discount = 0;
												if(lines[i+1]){
														discountLine = lines[i+1].trim().split(/\s+/);
														if(discountLine.indexOf("Discount") !=-1){
		//                             console.log(discountLine);
																discount = discountLine[1].slice(2,-1).replace(",",".");
															//console.log(discount);
														}
												}


                        spObj.item = item.join(" ");
                        spObj.price = (price - discount).toFixed(2);
                        spObjArr.push(spObj);
                         //console.log("Original Price :", price);                               //console.log("DIscount : ",discount);
                        // console.log("Price after DIscount : ",spObj.price);
                      }
									//console.log(words);
								}

								callback(spObjArr);
			}

			reader.readAsText(file);
		} else {
			fileDisplayArea.text("File not supported!");
		}


}

function createRow(data){


	for(var i =0;i<data.length; i++){
			var d = data[i];
			if(i==0){
					var item_name = $('input.item_name').eq(i);
					var amount = $('input.amount').eq(i);
					// console.log(item_name);
					// console.log(amount);
					item_name.val(d.item);
					amount.eq(i).val(d.price);

			}
			else {
				// console.log(d);
				buildRow(d);
			}
	}

}

function buildRow(data){
	console.log(data);
	var x = $(".itemized_item:first").clone();
	x.find(".item_name").val(data.item);
	x.find(".amount").val(data.price);
	$("#item_holder").append(x);
}

$(document).ready(function() {
//  setTimeout(function(){init();}, 5000);
	init();


});
