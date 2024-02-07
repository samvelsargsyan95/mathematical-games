// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
w = 3000;
h = 1250;
// variables for catching min and max zoom factors
var minZoom;
var maxZoom;
var userData = {};

// DEFINE FUNCTIONS/OBJECTS
// Define map projection
var projection = d3
  .geoEquirectangular()
  .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
  .scale([w / (2 * Math.PI)]) // scale to fit group width
  .translate([w / 2, h / 2]) // ensure centred in group
;

// Define map path
var path = d3
  .geoPath()
  .projection(projection)
;

// Create function to apply zoom to countriesGroup
function zoomed() {
  t = d3
    .event
    .transform
  ;
  countriesGroup
    .attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")")
  ;
}

// Define map zoom behaviour
let scaleCount = 0;
var zoom = d3
  .zoom()
  .on("zoom", function() {
    if (d3.event.sourceEvent) {
      if (d3.event.sourceEvent.deltaY < 0 && d3.event.sourceEvent.deltaX === -0) {
        scaleCount++;
        if(scaleCount === 2) {
          $(".point").attr("r", 15)
        }else if(scaleCount === 4){
          $(".point").attr("r", 12)          
        }else if(scaleCount === 6){
          $(".country").attr("stroke-width", 0.5)
        }else if(scaleCount === 8){
          $(".point").attr("r", 8)
        }else if(scaleCount === 12){
          $(".point").attr("r", 6)
        }else if(scaleCount === 16){
          $(".point").attr("r", 4)
        }else if(scaleCount === 20){
          $(".point").attr("r", 3)
        }
        
      } else if (d3.event.sourceEvent.deltaY > 0 && d3.event.sourceEvent.deltaX === -0) {
        scaleCount--
        if(scaleCount === 2) {
          $(".point").attr("r", 15)
        }else if(scaleCount === 4){
          $(".point").attr("r", 12)          
        }else if(scaleCount === 6){
          $(".country").attr("stroke-width", 1)
        }else if(scaleCount === 8){
          $(".point").attr("r", 8)
        }else if(scaleCount === 12){
          $(".point").attr("r", 6)
        }else if(scaleCount === 16){
          $(".point").attr("r", 4)
        }else if(scaleCount === 20){
          $(".point").attr("r", 3)
        }else if(scaleCount === 0 || scaleCount < 0) {
          $(".point").attr("r", 20)
          $(".country").attr("stroke-width", 1)
        }
      }
    }

    t = d3
      .event
      .transform
    ;
    countriesGroup
      .attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")")
    ;
  })
;


function getTextBox(selection) {
  selection
    .each(function(d) {
      d.bbox = this
        .getBBox();
      })
  ;
}

// Function that calculates zoom/pan limits and sets zoom to default value 
function initiateZoom(withAnimation = false) {
  // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
  minZoom = Math.max($("#map-holder").width() / w, $("#map-holder").height() / h);
  // set max zoom to a suitable factor of this value
  maxZoom = 20 * minZoom;
  // set extent of zoom to chosen values
  // set translate extent so that panning can't cause map to move out of viewport
  zoom
    .scaleExtent([minZoom, maxZoom])
    .translateExtent([[0, 0], [w, h]])
  ;
  // define X and Y offset for centre of map to be shown in centre of holder
  midX = ($("#map-holder").width() - minZoom * w) / 2;
  midY = ($("#map-holder").height() - minZoom * h) / 2;
  // change zoom transform to min zoom and centre offsets

  if(withAnimation) {
    svg
    .transition()
    .duration(1000)
    .call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
  }else {
    svg
    .call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
  }

}

// zoom to show a bounding box, with optional additional padding as percentage of box size
function boxZoom(box, centroid, paddingPerc) {
  minXY = box[0];
  maxXY = box[1];
  // find size of map area defined
  zoomWidth = Math.abs(minXY[0] - maxXY[0]);
  zoomHeight = Math.abs(minXY[1] - maxXY[1]);
  // find midpoint of map area defined
  zoomMidX = centroid[0];
  zoomMidY = centroid[1];
  // increase map area to include padding
  zoomWidth = zoomWidth * (1 + paddingPerc / 100);
  zoomHeight = zoomHeight * (1 + paddingPerc / 100);
  // find scale required for area to fill svg
  maxXscale = $("svg").width() / zoomWidth;
  maxYscale = $("svg").height() / zoomHeight;
  zoomScale = Math.min(maxXscale, maxYscale);
  // handle some edge cases
  // limit to max zoom (handles tiny countries)
  zoomScale = Math.min(zoomScale, maxZoom);
  // limit to min zoom (handles large countries and countries that span the date line)
  zoomScale = Math.max(zoomScale, minZoom);
  // Find screen pixel equivalent once scaled
  offsetX = zoomScale * zoomMidX;
  offsetY = zoomScale * zoomMidY;
  // Find offset to centre, making sure no gap at left or top of holder
  dleft = Math.min(0, $("svg").width() / 2 - offsetX);
  dtop = Math.min(0, $("svg").height() / 2 - offsetY);
  // Make sure no gap at bottom or right of holder
  dleft = Math.max($("svg").width() - w * zoomScale, dleft);
  dtop = Math.max($("svg").height() - h * zoomScale, dtop);
  // set zoom
  svg
    .transition()
    .duration(1000)
    .call(
      zoom.transform,
      d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale)
    );
}

// on window resize
$(window).resize(function() {
  // Resize SVG
  svg
    .attr("width", $("#map-holder").width())
    .attr("height", $("#map-holder").height())
  ;
  initiateZoom();
});

// create an SVG
var svg = d3
  .select("#map-holder")
  .append("svg")
  // set to the same size as the "map-holder" div
  .attr("width", $("#map-holder").width())
  .attr("height", $("#map-holder").height())
  // add zoom functionality
  .call(zoom);

// add user icon
svg.html(`
  <defs>
      <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 25 32">
        <image x="0%" y="0%" width="25" height="25" xlink:href="user.svg"></image>
      </pattern>
  </defs>`)

// get map data
d3.json(
  "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json", function(json) {
    //Bind data and create one path per GeoJSON feature
    countriesGroup = svg.append("g").attr("id", "map")
    
    // add a background rectangle

    countriesGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h);

    // draw a path for each feature/country
    countries = countriesGroup
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", function(d, i) {
        return "country" + d.properties.iso_a3;
      })
      .attr("class", "country")
      .attr("stroke-width", 1)
      .attr("stroke", "#ff0000")
      // add a mouseover action to show name label for feature/country
      .on("mouseover", function(d, i) {
          d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
      })
      .on("mouseout", function(d, i) {
          d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
      })
      // add an onclick action to zoom into clicked country
      .on("click", function(d, i) {
          d3.selectAll(".country").classed("country-on", false);
          d3.select(this).classed("country-on", true);          
          $(".point").attr("r", 3)
          $(".country").attr("stroke-width", 0.5)
          scaleCount = 20;
      boxZoom(path.bounds(d), path.centroid(d), 20);
      });
    // Add a label group to each feature/country. This will contain the country name and a background rectangle
    // Use CSS to have class "countryLabel" initially hidden
    countryLabels = countriesGroup
      .selectAll("g")
      .data(json.features)
      .enter()
      .append("g")
      .attr("class", "countryLabel")
      .attr("id", function(d) {
        return "countryLabel" + d.properties.iso_a3;
      })
      .attr("transform", function(d) {
        return (
          "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
        );
      })
      // add mouseover functionality to the label
      .on("mouseover", function(d, i) {
          d3.select(this).style("display", "block");
      })
      .on("mouseout", function(d, i) {
           d3.select(this).style("display", "none");
     })
      // add an onlcick action to zoom into clicked country
      .on("click", function(d, i) {
          d3.selectAll(".country").classed("country-on", false);
          d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
          $(".point").attr("r", 3)
          $(".country").attr("stroke-width", 0.5)
        boxZoom(path.bounds(d), path.centroid(d), 20);
      });
    // add the text to the label group showing country name
    countryLabels
      .append("circle")
      .attr("class", "point")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("r", 20)
      .attr("data-name", function(d) {
        return d.properties.name
      })
      .attr("fill", function(d) { //with country name add user icon
        if(d.properties.name === "Armenia" 
          || d.properties.name === "Germany" 
          || d.properties.name === "Italy"
          || d.properties.name === "Greenland") {
          return "url(#image)";
        }
      })
      .style("display", function(d) { //with country name show only added users
        if(d.properties.name === "Armenia" 
        || d.properties.name === "Germany" 
        || d.properties.name === "Italy"
        || d.properties.name === "Greenland") {
          return "block";          
        }else {
          return "none"          
        }
      })      
      .on("click", function() {
        $(".point").attr("r", 5)
        let modalTimeout = "";
        clearTimeout(modalTimeout)
        
        //Checl country name and add data for user
        switch($(this).attr("data-name")) {
          case "Armenia":
            userData = {
              img: "cartoon-user.png",
              nameLastname: "Aram Hakobyan",
              birthData: "Armenia, 1985",
              desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
              Neque molestias dignissimos maiores. Velit sit consectetur, 
              fugiat debitis, voluptate harum repudiandae delectus minus dolor
              cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis? 
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque molestias 
              dignissimos maiores. Velit sit consectetur, fugiat debitis, voluptate harum 
              repudiandae delectus minus dolor cupiditate, quaerat dolores cum in optio aliquam 
              dolorem nisi culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum 
              dolor sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores. 
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus minus 
              dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi culpa at?
              Molestiae error harum ullam totam distinctio hic, corrupti blanditiis rem 
              atque deserunt praesentium laborum obcaecati officiis? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores.
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus
              minus dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti blanditiis
              rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Neque molestias dignissimos`
            };
            break;
          case "Germany":
            userData = {
              img: "user.png",
              nameLastname: "Blaise Pascal",
              birthData: "France, 1623-1662",
              desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
              Neque molestias dignissimos maiores. Velit sit consectetur, 
              fugiat debitis, voluptate harum repudiandae delectus minus dolor
              cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis? 
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque molestias 
              dignissimos maiores. Velit sit consectetur, fugiat debitis, voluptate harum 
              repudiandae delectus minus dolor cupiditate, quaerat dolores cum in optio aliquam 
              dolorem nisi culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum 
              dolor sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores. 
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus minus 
              dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi culpa at?
              Molestiae error harum ullam totam distinctio hic, corrupti blanditiis rem 
              atque deserunt praesentium laborum obcaecati officiis? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores.
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus
              minus dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti blanditiis
              rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Neque molestias dignissimos`
            };
            break;
          case "Italy":
            userData = {
              img: "user.png",
              nameLastname: "Blaise Pascal",
              birthData: "France, 1623-1662",
              desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
              Neque molestias dignissimos maiores. Velit sit consectetur, 
              fugiat debitis, voluptate harum repudiandae delectus minus dolor
              cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis? 
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque molestias 
              dignissimos maiores. Velit sit consectetur, fugiat debitis, voluptate harum 
              repudiandae delectus minus dolor cupiditate, quaerat dolores cum in optio aliquam 
              dolorem nisi culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum 
              dolor sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores. 
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus minus 
              dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi culpa at?
              Molestiae error harum ullam totam distinctio hic, corrupti blanditiis rem 
              atque deserunt praesentium laborum obcaecati officiis? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores.
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus
              minus dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti blanditiis
              rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Neque molestias dignissimos`
            };
            break;
          case "Greenland":
            userData = {
              img: "user.png",
              nameLastname: "Blaise Pascal",
              birthData: "France, 1623-1662",
              desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
              Neque molestias dignissimos maiores. Velit sit consectetur, 
              fugiat debitis, voluptate harum repudiandae delectus minus dolor
              cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis? 
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque molestias 
              dignissimos maiores. Velit sit consectetur, fugiat debitis, voluptate harum 
              repudiandae delectus minus dolor cupiditate, quaerat dolores cum in optio aliquam 
              dolorem nisi culpa at? Molestiae error harum ullam totam distinctio hic, corrupti 
              blanditiis rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum 
              dolor sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores. 
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus minus 
              dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi culpa at?
              Molestiae error harum ullam totam distinctio hic, corrupti blanditiis rem 
              atque deserunt praesentium laborum obcaecati officiis? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Neque molestias dignissimos maiores.
              Velit sit consectetur, fugiat debitis, voluptate harum repudiandae delectus
              minus dolor cupiditate, quaerat dolores cum in optio aliquam dolorem nisi 
              culpa at? Molestiae error harum ullam totam distinctio hic, corrupti blanditiis
              rem atque deserunt praesentium laborum obcaecati officiis?Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Neque molestias dignissimos`
            };
            break;            
        }

        $("#userImg").attr("src", './images/'+userData.img)
        $("#userName").html(userData.nameLastname)
        $("#userBirth").html(userData.birthData)
        $("#userDesc").html(userData.desc)

        modalTimeout = setTimeout(() => {
          $("#openModal").trigger("click")
        },1100)        
      })          

    initiateZoom();
  }

);

// let mapTransforms = $("#map")
// console.log(mapTransforms)
let timeout = "";
function onCloseModal() {
  clearTimeout(timeout)
  initiateZoom(true);  

  timeout = setTimeout(() => {
    $(".point").attr("r", 20)  
  },500)

  setTimeout(() => {
    $(".country").attr("stroke-width", 1)
  },400)

}

$('#modal').on('hidden.bs.modal', function () {
  onCloseModal()
})

