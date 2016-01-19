.. _step_07:

Step 7: Show the name on mouseover
==================================

.. comments

In this step, we will implement a functionality to show the name of the feature (the municipality) when we move the mouse over it.

.. contents:: Contents
  :depth: 2
  :local:


Show the boundaries of the municipalities
-----------------------------------------

So far, we did not apply much style to the features beside the color which is based on the data. We will now make the boundaries of the municipalities visible by styling it in CSS.

.. code-block:: css
  :caption: style.css - feature boundaries
  :linenos:
  :lineno-start: 21
  :emphasize-lines: 3-9

  /* ... */

  g.features {
    stroke: #d8d8d8;
    stroke-width: 0.5;
  }
  g.features path:hover {
    opacity: 0.5;
  }

We also added a little CSS effect to highlight the features when the mouse moves over them. You can refresh the browser to see the changes.

Keep stroke width proportional on zoom
--------------------------------------

If you looked at the features and zoomed in, you might have noticed that the boundaries of the features are becoming bigger and bigger. This is because the zoom function just scales the features and their boundaries up when zooming in.

We can solve this by making the stroke width proportional to the zoom level. These changes take place in the ``doZoom()`` function.

.. code-block:: js
  :caption: map.js - keep stroke width proportional to zoom
  :linenos:
  :lineno-start: 91
  :emphasize-lines: 5,9-12

  // ...

  /**
   * Zoom the features on the map. This rescales the features on the map.
   * Keep the stroke width proportional when zooming in.
   */
  function doZoom() {
    mapFeatures.attr("transform",
      "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
      // Keep the stroke width proportional. The initial stroke width
      // (0.5) must match the one set in the CSS.
      .style("stroke-width", 0.5 / d3.event.scale + "px");
  }

  // ...


Helper function
---------------

We will not access the name through the feature, but rather through the data itself. This can be done with the ``dataById`` object we defined earlier. We need to pass this object an ID, which is the ID of the feature. Since we will have to do this more than once in the future, we now define a helper function to gain easier access to it.

This also facilitates changes should we decide to use other geographic data (where the ID is not named ``GMDNR``). In this case, we would only have to change this function.

.. code-block:: js
  :caption: map.js - helper function getIdOfFeature
  :linenos:
  :lineno-start: 152
  :emphasize-lines: 3-11

  // ...

  /**
   * Helper function to retrieve the ID of a feature. The ID is found in
   * the properties of the feature.
   *
   * @param {object} f - A GeoJSON Feature object.
   */
  function getIdOfFeature(f) {
    return f.properties.GMDNR;
  }

We can already use this helper function inside the quantize function so we don't have to access the property ``GMDNR`` manually.

.. code-block:: js
  :caption: map.js - use helper function in quantize
  :linenos:
  :lineno-start: 86
  :emphasize-lines: 4

        // ...
          .attr('class', function(d) {
            // Use the quantized value for the class
            return quantize(getValueOfData(dataById[getIdOfFeature(d)]));
          })
          // ...


Show the name on mouseover
--------------------------

We will work with a container and a function called "tooltip", even though in a first step it is not really a tooltip yet. We will come to that in the next step.

We start off by styling the tooltip container, even though it is not there yet. We also add a helper style ``hidden`` which - obviously - hides elements.

.. code-block:: css
  :caption: style.css - style tooltip
  :linenos:
  :lineno-start: 3
  :emphasize-lines: 3-11

  /* ... */

  .tooltip {
    font-weight: bold;
    padding: 0.5rem;
    border: 1px solid silver;
  }

  .hidden {
    display: none;
  }

  /* ... */

Next we add a ``<div>`` element for the tooltip, which is hidden by default.

.. code-block:: js
  :caption: map.js - tooltip element
  :linenos:
  :lineno-start: 18
  :emphasize-lines: 3-6

  // ...

  // We add a <div> container for the tooltip, which is hidden by default.
  var tooltip = d3.select("#map")
    .append("div")
    .attr("class", "tooltip hidden");

  // ...

We define a function which will show the tooltip.

.. code-block:: js
  :caption: map.js - tooltip function
  :linenos:
  :lineno-start: 96
  :emphasize-lines: 3-16

  // ...

  /**
   * Show a tooltip with the name of the feature.
   *
   * @param {object} f - A GeoJSON Feature object.
   */
  function showTooltip(f) {
    // Get the ID of the feature.
    var id = getIdOfFeature(f);
    // Use the ID to get the data entry.
    var d = dataById[id];
    // Show the tooltip (unhide it) and set the name of the data entry.
    tooltip.classed('hidden', false)
      .html(d.name);
  }

  // ...

Now we need to trigger the tooltip action. Notice that we also used our new helper function ``getIdOfFeature``.

.. code-block:: js
  :caption: map.js - trigger tooltip
  :linenos:
  :lineno-start: 90
  :emphasize-lines: 3-5

          // ...
          // As "d" attribute, we set the path of the feature.
          .attr('d', path)
          // When the mouse moves over a feature, show the tooltip.
          .on('mousemove', showTooltip);

    // ...


.. rubric:: Next

Proceed to :ref:`step_08`.


Code
----

* For reference, the file ``index.html`` after step 7:
    https://github.com/lvonlanthen/data-map-d3/blob/step-07/index.html

* For reference, the file ``style.css`` after step 7:
    https://github.com/lvonlanthen/data-map-d3/blob/step-07/style.css

* For reference, the file ``map.js`` after step 7:
    https://github.com/lvonlanthen/data-map-d3/blob/step-07/map.js

* The diff view of step 6 and step 7:
    https://github.com/lvonlanthen/data-map-d3/compare/step-06...step-07?diff=split
