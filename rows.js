/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 12,
    center: new google.maps.LatLng(40.767852, -73.979694),
    mapTypeId: google.maps.MapTypeId.TERRAIN
});
d3.json("rows.json", function (data) {
    var overlay = new google.maps.OverlayView();

    overlay.onAdd = function () {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "houses");

        overlay.draw = function () {
            var projection = this.getProjection(),
                    padding = 10;
            var marker = layer.selectAll("svg")
                    .data(d3.entries(data))
                    .each(transform)
                    .enter().append("svg:svg")
                    .each(transform)
                    .attr("class", "marker");

            marker.append("svg:circle")
                    .attr("r", 4.5)
                    .attr("cx", padding)
                    .attr("cy", padding);

            marker.append("svg:text")
                    .attr("x", padding + 7)
                    .attr("y", padding)
                    .attr("dy", ".31em")
                    .text(function (d) {
                        return d.key;
                    });

            function transform(d) {
                d = new google.maps.LatLng(d.value[0],d.value[1]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this).style("left", (d.x - padding) + "px").style("top", (d.y - padding) + "px");
        }
        };
    };
    overlay.setMap(map);
});
