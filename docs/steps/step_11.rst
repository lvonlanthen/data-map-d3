.. _step_11:

Step 11: Responsive map and instructions
========================================

.. comments

In this step, we are going make our map responsive and we will add some instructions on how to use the map.

.. contents:: Contents
  :depth: 2
  :local:


Full screen responsive map
--------------------------

Since we included Skeleton, you may have noticed that the row used for the details container is wider than the map container on wide screens. This does not look very nice and comes from the fact, that Skeleton uses a max width of 960px on large screens, but our map still has a hard coded width of 900px.

We can remove the width (and height) definition in the CSS style of the map container.

.. code-block:: css
  :caption: style.css - full screen map
  :linenos:
  :lineno-start: 33
  :emphasize-lines: 3-15

  /* ... */

  #map {
    border: 1px solid silver;
    background: #E6E6E6;
  }

  /* ... */

While this lets the map container take up the full width of the row (same as the row in the details container), the map now has an ugly grey border when zooming in. Also, on smaller screens the map is now bigger than the container itself.

This is because the SVG element we created in the map still has a hard coded width of 900px.

To fix this, we do not set the width and height of the SVG element explicitely and use a viewbox instead. The viewbox receives initial dimensions (our width and height) and we tell it to preserve the aspect ratio so. This permits the container to handle rescaling automatically and while preserving the aspect ratio if the container is smaller or bigger than initially set.

.. code-block:: js
  :caption: map.js - table styling
  :linenos:
  :lineno-start: 11
  :emphasize-lines: 4-6,8-9

  // ...

  // We create a SVG element in the map container and give it some
  // dimensions. We can use a viewbox and preserve the aspect ratio. This
  // also allows a responsive map which rescales and looks good even on
  // different screen sizes
  var svg = d3.select('#map').append('svg')
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height);

  // ...

Now the map looks and zooms quite nicely, regarding of the screen size. The only thing which is not pleasant is a small grey border at the bottom of the map, visible especially when zooming in. This seems to be an issue of the font size within the map container and it can be fixed in the CSS style by setting the font-size of the map container to 0.

.. code-block:: css
  :caption: style.css - set font-size in map container to 0
  :linenos:
  :lineno-start: 33
  :emphasize-lines: 4

  /* ... */

  #map {
    font-size: 0; /* to prevent margin at bottom of map container */
    border: 1px solid silver;
    background: #E6E6E6;
  }

  /* ... */

However, this also sets the font size of the tooltip to 0, so we need to prevent that by setting a font size specifically for the tooltip.

.. code-block:: css
  :caption: style.css - font-size for tooltip
  :linenos:
  :lineno-start: 3
  :emphasize-lines: 13

  /* ... */

  .tooltip {
    font-weight: bold;
    padding: 0.5rem;
    border: 1px solid silver;
    color: #222;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #a6a6a6;
    opacity: 0.9;
    position: absolute;
    font-size: 1.5rem;
  }

  /* ... */

The map is now fully responsive and scales nicely when the screen size changes. However, there is a lot of margin at the side of the map and especially on small screens we would rather like the map to fill up the space available. You can overwrite the margin of the container element in the CSS style sheet:

.. code-block:: css
  :caption: style.css - less margin for container
  :linenos:
  :lineno-start: 34
  :emphasize-lines: 3-5

  /* ... */

  .container {
    width: 100%;
  }

  /* ... */


Instructions
------------

We would like to add some instructions on how to use the map and we can add this in the HTML document.

.. code-block:: html
  :caption: index.html - instructions
  :linenos:
  :lineno-start: 13
  :emphasize-lines: 7-13

      <!-- ... -->
      <div class="container">
        <h3>Land use statistics map</h3>
        <div id="map"><!-- Map container --></div>

        <div id="details" class="hidden row"><!-- Details container --></div>
        <div id="initial">
          <h5>Instructions</h5>
          <ul>
            <li>Select a municipality to show the details.</li>
            <li>Scroll in the map to zoom in and out.</li>
          </ul>
        </div>
      </div>
      <!-- ... -->

We also set some margin at the top, same as for the details container.

.. code-block:: css
  :caption: style.css - top margin for instructions
  :linenos:
  :lineno-start: 20
  :emphasize-lines: 3

  /* ... */

  #details, #initial {
    margin-top: 2rem;
  }

  /* ... */

And finally we want the initial instructions to disappear when the details of a feature are shown.

.. code-block:: js
  :caption: map.js - hide initial content when details are shown
  :linenos:
  :lineno-start: 108
  :emphasize-lines: 19-20

  // ...

  /**
   * Show the details of a feature in the details <div> container.
   * The content is rendered with a Mustache template.
   *
   * @param {object} f - A GeoJSON Feature object.
   */
  function showDetails(f) {
    // Get the ID of the feature.
    var id = getIdOfFeature(f);
    // Use the ID to get the data entry.
    var d = dataById[id];

    // Render the Mustache template with the data object and put the
    // resulting HTML output in the details container.
    var detailsHtml = Mustache.render(template, d);

    // Hide the initial container.
    d3.select('#initial').classed("hidden", true);

    // Put the HTML output in the details container and show (unhide) it.
    d3.select('#details').html(detailsHtml);
    d3.select('#details').classed("hidden", false);
  }

  // ...


.. rubric:: Next

Proceed to :ref:`step_12`.


Code
----

* For reference, the file ``index.html`` after step 11:
    https://github.com/lvonlanthen/data-map-d3/blob/step-11/index.html

* For reference, the file ``style.css`` after step 11:
    https://github.com/lvonlanthen/data-map-d3/blob/step-11/style.css

* For reference, the file ``map.js`` after step 11:
    https://github.com/lvonlanthen/data-map-d3/blob/step-11/map.js

* The diff view of step 10 and step 11:
    https://github.com/lvonlanthen/data-map-d3/compare/step-10...step-11?diff=split
