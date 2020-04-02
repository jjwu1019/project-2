function buildlist(){

  d3.csv("./Data/mina_chart_data.csv").then(function(x) {
  // console.log(x)
  
  var region = x.map(y => y.region)
  var uniqueregion = Array.from(new Set(region))
  
  var dropdownMenu = d3.select("#selDataset1");
      
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
  /////////////////////////////////////////////////////////
  function buildlist2(val){
  
      d3.csv("./Data/mina_chart_data.csv").then(function(x) {
      // console.log(x)
      
      function filter_region(x) {
          return x.region === val;
        }
  
      var selected_region = x.filter(filter_region);
  
      var dish_name = selected_region.map(y => y.title)
      //console.log(selected_region)
      
      var dropdownMenu = d3.select("#selDataset2");
          dropdownMenu.html("")
      dropdownMenu.selectAll("option")
          .data(dish_name)
          .enter()
          .append("option")
          .text(function(d) {
              return d;
          })
          .attr("value", function(d) {
              return d;
              });
      buildbar(dish_name[0])
      buildsummary(dish_name[0])

      }).catch(function(error) {
        console.log(error);
      });
      }
  
      buildlist2('chinese')
  
      function optionChanged1(val) {
          buildlist2(val)
  
        }
      function buildbar(val){
          d3.csv("./Data/mina_chart_data.csv").then(function(x) {
         
              function filter_dish(x) {
                  return x.title === val;
                }
          
              var selected_dish = x.filter(filter_dish);
          
              var fat = selected_dish.map(y => y.fat)
              var calories = selected_dish.map(y => y.calories)
              var protein = selected_dish.map(y => y.protein)
              var carbs = selected_dish.map(y => y.carbs)
              
              // console.log(fat)
              var data = [
                  {
                    x: ['fat (g)', 'protein (g)', 'carbs (g)'],
                    y: [parseInt(fat), parseInt(protein), parseInt(carbs)],
                    type: 'bar',
                    marker:{
                      color: ['grey', 'pink', 'yellow']
                    }
                  }
                ];
                var layout = {
                  title: {
                    text:`<b>${val}</b> <br> Total Calories: ${parseInt(calories)}`,
                    font: {
                      family: 'Courier New, monospace',
                      size: 15
                    },
                    xref: 'paper',
                    x: 0.05,
                  }
              }
                Plotly.newPlot('bar', data, layout)
  
          }).catch(function(error) {
              console.log(error);
            });
        }
        ///////////////////////////
        function buildsummary(val){
          d3.csv("./Data/mina_chart_data.csv").then(function(x) {
         
              function filter_dish(x) {
                  return x.title === val;
                }
          
              var selected_dish = x.filter(filter_dish);
          
              var summary = selected_dish.map(y => y.summary)
              // console.log(summary)

              var info_box = d3.select("#dish-summary");
              info_box.html("");
              info_box.append("p").html(summary)
              
          }).catch(function(error) {
              console.log(error);
            });
        }
      buildbar("Chicken Curry Fried Rice")
      buildsummary("Chicken Curry Fried Rice")
       function optionChanged2(val) {
          // console.log(val);
          buildbar(val)
          buildsummary(val)
        }
  