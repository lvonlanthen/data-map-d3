.. _step_08:

Step 8: Tooltip
===============

.. comments

In this step, we will use the mouseover functionality we created earlier
and position the container showing the name to act as a tooltip which
appears next to the mouse cursor.

.. contents:: Contents
  :depth: 2
  :local:


Tooltip styling
---------------

First, we add some style for the tooltip. Most of it is just to make it
look nicer. However, important is the declaration to use absolute
positioning (``position: absolute;``). This allows to use the attributes
``top`` and ``left`` to position an element. Since the position will
depend on the mouse cursor whose position we don't know yet, we leave
that for the moment and add it later in the code.

.. code-block:: css
  :caption: style.css - tooltip styling
  :linenos:
  :lineno-start: 3
  :emphasize-lines: 7-12

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
  }

  /* ... */


Tooltip positioning
-------------------

To calculate the position of the tooltip (the ``left`` and ``top`` CSS
attributes), we take the map container as reference element and get the
position of the mouse cursor. Then we add a little offset so the tooltip
appears next to the cursor and not on top of it.

We also try to guess if the tooltip is shown outside the map container
on the right side. In this case, we show it more to the left so it does
not go over the map. *Yes, this it rather buggy and you might as well
leave that part*.

.. code-block:: js
  :caption: map.js - tooltip positioning
  :linenos:
  :lineno-start: 98
  :emphasize-lines: 15-24,27,29

  // ...

  /**
   * Show a tooltip with the name of the feature. Calculate the position
   * of the cursor to show the tooltip next to the mouse.
   *
   * @param {object} f - A GeoJSON Feature object.
   */
  function showTooltip(f) {
    // Get the ID of the feature.
    var id = getIdOfFeature(f);
    // Use the ID to get the data entry.
    var d = dataById[id];

    // Get the current mouse position (as integer)
    var mouse = d3.mouse(d3.select('#map').node()).map(
      function(d) { return parseInt(d); }
    );

    // Calculate the absolute left and top offsets of the tooltip. If the
    // mouse is close to the right border of the map, show the tooltip on
    // the left.
    var left = Math.min(width - 4 * d.name.length, mouse[0] + 5);
    var top = mouse[1] + 25;

    // Show the tooltip (unhide it) and set the name of the data entry.
    // Set the position as calculated before.
    tooltip.classed('hidden', false)
      .attr("style", "left:" + left + "px; top:" + top + "px")
      .html(d.name);
  }

  // ...

Hide tooltip
------------

Right now, the tooltip never disappears. If we move the cursor out of the map or even out of Switzerland, we would like the tooltip to disappear.

.. code-block:: js
  :caption: map.js - hide tooltip function
  :linenos:
  :lineno-start: 127
  :emphasize-lines: 3-8

  // ...

  /**
   * Hide the tooltip.
   */
  function hideTooltip() {
    tooltip.classed('hidden', true);
  }

  // ...

And we need to trigger the action when the mouse moves out of the features.

.. code-block:: js
  :caption: index.html - trigger tooltip hiding
  :linenos:
  :lineno-start: 91
  :emphasize-lines: 4-6

          // ...
          .attr('d', path)
          // When the mouse moves over a feature, show the tooltip.
          .on('mousemove', showTooltip)
          // When the mouse moves out of a feature, hide the tooltip.
          .on('mouseout', hideTooltip);

    // ...


.. rubric:: Next

Proceed to :ref:`step_09`.


Code
----

* For reference, the file ``index.html`` after step 8:
    https://github.com/lvonlanthen/data-map-d3/blob/step-08/index.html

* For reference, the file ``style.css`` after step 8:
    https://github.com/lvonlanthen/data-map-d3/blob/step-08/style.css

* For reference, the file ``map.js`` after step 8:
    https://github.com/lvonlanthen/data-map-d3/blob/step-08/map.js

* The diff view of step 7 and step 8:
    https://github.com/lvonlanthen/data-map-d3/compare/step-07...step-08?diff=split
