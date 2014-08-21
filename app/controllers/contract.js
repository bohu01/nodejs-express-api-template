var phantom = require('phantom');
var fs = require("fs");
var setting = require('../../setting')


exports.create = function(req,res){
	var url = "https://www.google.com"
	console.log(req.url)
	phantom.create(function(ph){
		ph.createPage(function(page) {
			page.open(url, function(status) {
				page.render('contract.pdf', function(){
					console.log('Page Rendered')
					ph.exit();
	   			});
			});
		});
	});
	var filepath = setting.PROJECT_DIR + "/" + "contract.pdf"
	res.download(filepath, "contract.pdf",  function(err){
		if(err){
			console.log(err)
		}
	})
}