(function() {
    var tx = 0,
    ty = 0,
    scale = 1;
    
    function onWheel() {
        // prevent default event behaviour
        d3.event.preventDefault();
    
        // set zooming
        var factor = 1.1;
        var center = d3.mouse(document.querySelector('svg'));
        var newTx, newTy, newScale;
    
        // calculate new scale
        if (d3.event.deltaY < 0) {
            newScale = scale * factor;
        } else {
            newScale = scale / factor;
        }
    
        // calculate new translate position
        // [current mouse position] - ([current mouse position] - [current translate]) * magnification
        newTx = center[0] - (center[0] - tx) * newScale / scale;
        newTy = center[1] - (center[1] - ty) * newScale / scale;
    
        // set new scale and translate position
        scale = newScale;
        tx = newTx;
        ty = newTy;
    
        svg.attr('transform', `translate(${tx}, ${ty}) scale(${scale})`);
        
    }

    function onClick() {
        // prevent default event behaviour
        d3.event.preventDefault();
    
        // set zooming
        var factor = 3;
        var center = d3.mouse(document.querySelector('svg'));
        var newTx, newTy, newScale = 0;
    
        // calculate new scale 
        
       
        newScale = scale * factor;
    
        // calculate new translate position
        // [current mouse position] - ([current mouse position] - [current translate]) * magnification
        newTx = center[0] - (center[0] - tx) * newScale / scale;
        newTy = center[1] - (center[1] - ty) * newScale / scale;
    
        // set new scale and translate position
        scale = newScale;
        tx = newTx;
        ty = newTy;
    
        svg.attr('transform', `translate(${tx}, ${ty}) scale(${scale})`);
        
    }

    var width = $(window).width();
        height = $(window).height();
    var svg = d3.select("#map-holder")   
        .append("svg") 
        .attr("height", height)
        .attr("width", width)
        .on('wheel.zoom', onWheel)
        .on('click', onClick)
        .append("g");

    var capitals = [

        {
          population: "1.3",
          country: "Armenia",
          lat: "40",
          long: "45",
        }
      ] ;   

    d3.queue()
      .defer(d3.json, "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json")
      .await(ready)  
      
    var projection = d3.geoMercator()
        .translate([width / 2, height / 2]) 
        .scale(200) 

    var path = d3.geoPath()
        .projection(projection)
      
      
    function ready (error, data) {
        console.log(data)

        var countries = data.features
        console.log(countries)

        svg.selectAll(".country")
            .data(countries)
            .enter().append("path")
            .attr("class", "country")
            .attr("d", path)
            .on('click', function(d) {
                d3.select(this).classed("country-on", true)
            })
            .on('mouseover', function(d) {
                d3.select(this).classed("country-on", true)
            })
            .on('mouseout', function(d) {
                d3.select(this).classed("country-on", false)
            })

        svg.selectAll(".city-circle")
            .data(capitals)
            .enter().append("circle")
            .attr("r", 5)
            .attr("class", "city-circle")
            .attr("fill", "red")
            .attr("cx", function(d){
                var coords = projection([d.long, d.lat])
                console.log(coords)
                return coords[0];
            })
            .attr("cy", function(d){
                var coords = projection([d.long, d.lat])
                return coords[1];
            })
            .on('click', function(d) {
                var x = 5;
                x--;
                $(this).attr("r", x)
                d3.select(this).classed("city-on", true)
            })
            
    }
  
})();