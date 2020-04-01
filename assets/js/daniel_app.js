

function buildlist(){

    d3.csv("./assets/Data/merged.csv").then(function(x) {
     //console.log(x)
    
    var region = x.map(y => y.region)
    var uniqueregion = Array.from(new Set(region))
    
    var dropdownMenu = d3.select("#selDataset");
        
    dropdownMenu.selectAll("option")
        .data(uniqueregion)
        .enter()
        .append("option")
        .text(function(d) {
            return d;
        })
        .attr("value", function(d) {
            return d;
            });
    
    }).catch(function(error) {
      console.log(error);
    });
    }
    buildlist()

function buildTable(b){
    


        d3.csv("./assets/Data/merged.csv").then(function(x) {
        console.log(x)

        function filter_region(x) {
            return x.region === b;
          }
    
        var selected_region = x.filter(filter_region);
          
        var dish = selected_region.map(y => y.title)
        var weightWatcherSmartPoints =  selected_region.map(y => y.weightWatcherSmartPoints)
        var pricePerServing =  selected_region.map(y => y.pricePerServing)
        var healthScore =  selected_region.map(y => y.healthScore)
        var calories =  selected_region.map(y => y.calories)


        var tbody = d3.select("#food-table").select("tbody");
        tbody.html("");
       
    
      for (var i = 0; i < selected_region.length; i++) {
            var trow = tbody.append("tr");
            trow.append("th").text(dish[i]);
            trow.append("td").text(parseInt(weightWatcherSmartPoints[i]));
            trow.append("td").text(parseInt(pricePerServing[i]));
            trow.append("td").text(parseInt(healthScore[i]));
            trow.append("td").text(parseInt(calories[i]));
            
        }
    

    }).catch(function(error) {
        console.log(error);
      });

    
      
    
    
    
    }
    buildTable("chinese")

   function optionChanged(b){
        buildTable(b)
       

   };
