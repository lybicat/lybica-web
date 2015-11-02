'use strict';

var $ = require('jquery');
var d3 = require('d3');

var TestReporter = {
    render: function(container) {
        var w = 900,
            h = 800,
            z = d3.scale.category20();
        var force = d3.layout.force()
            .size([w, h]);
        var svg = d3.select(container).append("svg")
            .attr("width", w)
            .attr("height", h);
        d3.json("//raw.githubusercontent.com/NickQiZhu/d3-cookbook/master/data/flare.json", function(root) {
          var nodes = flatten(root),
              links = d3.layout.tree().links(nodes);
          force
              .nodes(nodes)
              .links(links)
              .start();
          var link = svg.selectAll("line")
              .data(links)
            .enter().insert("line")
              .style("stroke", "#999")
              .style("stroke-width", "1px");
          var node = svg.selectAll("circle.node")
              .data(nodes)
            .enter().append("circle")
              .attr("r", 4.5)
              .style("fill", function(d) { return z(d.parent && d.parent.name); })
              .style("stroke", "#000")
              .call(force.drag);
          force.on("tick", function(e) {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          });
        });
        function flatten(root) { // <-A
          var nodes = [];
          function traverse(node, depth) {
            if (node.children) {
              node.children.forEach(function(child) {
                child.parent = node;
                traverse(child, depth + 1);
              });
            }
            node.depth = depth;
            nodes.push(node);
          }
          traverse(root, 1);
          return nodes;
        }
    }
};

TestReporter.render('#demoReport');
