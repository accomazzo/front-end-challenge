
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
    });
  }
    
  self.updateproducthtml = function(){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
  }
  
  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      thishtml += self.products[i].htmlview;
      }
    $("#content").append(thishtml)
  }
  
//  added simple jQuery here for removal and overlay functionality
    self.stylizeContent = function () {
   
    $( ".remove" ).click(function() {
        //caching this for better performance
        var $this = $(this);
        var parentDiv = $this.parents('.col-sm-4');
         parentDiv.slideUp(200, function() {   
         parentDiv.attr("style", "display:none; position: absolute;");
        });
    });
          
    $( ".product-container" ).hover(function() {
        var $this = $(this);
        
        //make overlay same size as .product-container
        var prodHeight = $this.height();
        var prodWidth = $this.width();
        $this.find(".info").height(prodHeight).width(prodWidth);
        
        $this.find(".info").toggleClass("info-hover");
        $this.find("img").toggleClass("img-hover");

    });
    
    
    
  }
  
}

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  self.custom_class = "col"+ ((i % 3) +1)
  self.description  = product.description
  
  self.updatehtml= function(){
    $.get('product-template.html', function(template){
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{info}', self.description);
    });
  }
}

//would ideally remove setTimeout with callbacks, will do in a future revision time permititng
var page=new domobj();
page.getproducts('data-orig.json');
setTimeout("page.updateproducthtml();",400);
setTimeout("page.updatedom()",1000);
setTimeout("page.stylizeContent()", 1200);
setTimeout("$('.container').attr('style', 'display:block;')", 1400);