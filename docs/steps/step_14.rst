.. _step_14:

Step 14: Map legend
===================

.. comments

In this step, we are going to create a legend for the colors on the map.

.. contents:: Contents
  :depth: 2
  :local:


Legend
------

First, we are going to create a container in the HTML document for the legend.

.. code-block:: html
  :caption: index.html - legend container
  :linenos:
  :lineno-start: 23
  :emphasize-lines: 3

        <!-- ... -->
        <div id="map"><!-- Map container --></div>
        <div id="legend"><!-- Legend container --></div>

        <!-- ... -->

We add the legend SVG and define a function which will update the legend if the key of the map changes or if the window is resized.

.. code-block:: js
  :caption: map.js - legend functions
  :linenos:
  :lineno-start: 67
  :emphasize-lines: 3-113

  // ...

  // We prepare a number format which will always return 2 decimal places.
  var formatNumber = d3.format('.2f');

  // For the legend, we prepare a very simple linear scale. Domain and
  // range will be set later as they depend on the data currently shown.
  var legendX = d3.scale.linear();

  // We use the scale to define an axis. The tickvalues will be set later
  // as they also depend on the data.
  var legendXAxis = d3.svg.axis()
    .scale(legendX)
    .orient("bottom")
    .tickSize(13)
    .tickFormat(function(d) {
      return formatNumber(d);
    });

  // We create an SVG element in the legend container and give it some
  // dimensions.
  var legendSvg = d3.select('#legend').append('svg')
    .attr('width', '100%')
    .attr('height', '44');

  // To this SVG element, we add a <g> element which will hold all of our
  // legend entries.
  var g = legendSvg.append('g')
      .attr("class", "legend-key YlGnBu")
      .attr("transform", "translate(" + 20 + "," + 20 + ")");

  // We add a <rect> element for each quantize category. The width and
  // color of the rectangles will be set later.
  g.selectAll("rect")
      .data(quantize.range().map(function(d) {
        return quantize.invertExtent(d);
      }))
    .enter().append("rect");

  // We add a <text> element acting as the caption of the legend. The text
  // will be set later.
  g.append("text")
      .attr("class", "caption")
      .attr("y", -6)

  /**
   * Function to update the legend.
   * Somewhat based on http://bl.ocks.org/mbostock/4573883
   */
  function updateLegend() {

    // We determine the width of the legend. It is based on the width of
    // the map minus some spacing left and right.
    var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 50;

    // We determine the domain of the quantize scale which will be used as
    // tick values. We cannot directly use the scale via quantize.scale()
    // as this returns only the minimum and maximum values but we need all
    // the steps of the scale. The range() function returns all categories
    // and we need to map the category values (q0-9, ..., q8-9) to the
    // number values. To do this, we can use invertExtent().
    var legendDomain = quantize.range().map(function(d) {
      var r = quantize.invertExtent(d);
      return r[1];
    });
    // Since we always only took the upper limit of the category, we also
    // need to add the lower limit of the very first category to the top
    // of the domain.
    legendDomain.unshift(quantize.domain()[0]);

    // On smaller screens, there is not enough room to show all 10
    // category values. In this case, we add a filter leaving only every
    // third value of the domain.
    if (legendWidth < 400) {
      legendDomain = legendDomain.filter(function(d, i) {
        return i % 3 == 0;
      });
    }

    // We set the domain and range for the x scale of the legend. The
    // domain is the same as for the quantize scale and the range takes up
    // all the space available to draw the legend.
    legendX
      .domain(quantize.domain())
      .range([0, legendWidth]);

    // We update the rectangles by (re)defining their position and width
    // (both based on the legend scale) and setting the correct class.
    g.selectAll("rect")
      .data(quantize.range().map(function(d) {
        return quantize.invertExtent(d);
      }))
      .attr("height", 8)
      .attr("x", function(d) { return legendX(d[0]); })
      .attr("width", function(d) { return legendX(d[1]) - legendX(d[0]); })
      .attr('class', function(d, i) {
        return quantize.range()[i];
      });

    // We update the legend caption. To do this, we take the text of the
    // currently selected dropdown option.
    var keyDropdown = d3.select('#select-key').node();
    var selectedOption = keyDropdown.options[keyDropdown.selectedIndex];
    g.selectAll('text.caption')
      .text(selectedOption.text);

    // We set the calculated domain as tickValues for the legend axis.
    legendXAxis
      .tickValues(legendDomain)

    // We call the axis to draw the axis.
    g.call(legendXAxis);
  }

  // ...

We call the function after the window has been resized and when the map colors have been updated.

.. code-block:: js
  :caption: map.js - update legend on window resize
  :linenos:
  :lineno-start: 10
  :emphasize-lines: 3-5

  // ...

  // We add a listener to the browser window, calling updateLegend when
  // the window is resized.
  window.onresize = updateLegend;

  // ...

.. code-block:: js
  :caption: map.js - update legend after map colors change
  :linenos:
  :lineno-start: 249
  :emphasize-lines: 3-4

    // ...

    // We call the function to update the legend.
    updateLegend();
  // ...


Lastly, we need some style for the legend container and the legend rectangles.

.. code-block:: css
  :caption: style.css - legend style
  :linenos:
  :lineno-start: 64
  :emphasize-lines: 3-19

  /* ... */

  #legend {
    border: 1px solid silver;
    border-top: 0;
  }

  .legend-key path {
    display: none;
  }

  .legend-key text {
    font-size: 1rem;
  }

  .legend-key line {
    stroke: #000;
    shape-rendering: crispEdges;
  }

  /* ... */

Code
----

* For reference, the file ``index.html`` after step 14:
    https://github.com/lvonlanthen/data-map-d3/blob/step-14/index.html

* For reference, the file ``style.css`` after step 14:
    https://github.com/lvonlanthen/data-map-d3/blob/step-14/style.css

* For reference, the file ``map.js`` after step 14:
    https://github.com/lvonlanthen/data-map-d3/blob/step-14/map.js

* The diff view of step 13 and step 14:
    https://github.com/lvonlanthen/data-map-d3/compare/step-13...step-14?diff=split
