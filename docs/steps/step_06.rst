.. _step_06:

Step 6: Zoom
============

.. comments

In this step, we will add a zoom functionality to our map.

.. contents:: Contents
  :depth: 2
  :local:


D3.js draws SVG elements, which are perfectly scalable, as they are vectors. In order to implement a zoom functionality, we therefore have to be able to access the features on the map and scale them.

Map features
------------

We extract the map features.

.. code-block:: js
  :caption: map.js - extract mapFeatures
  :linenos:
  :lineno-start: 13
  :emphasize-lines: 3-6

  // ...

  // We add a <g> element to the SVG element and give it a class to
  // style. We also add a class name for Colorbrewer.
  var mapFeatures = svg.append('g')
    .attr('class', 'features YlGnBu');

  // ...

.. code-block:: js
  :caption: map.js - add path to mapFeatures
  :linenos:
  :lineno-start: 67
  :emphasize-lines: 3-5

      // ...

      // We add the features to the <g> element created before.
      // D3 wants us to select the (non-existing) path objects first ...
      mapFeatures.selectAll('path')
          // ... and then enter the data. For each feature, a <path>
          // element is added.
          // ...

We did not really change much, we just did some refactoring by extracting mapFeatures as a variable so we can access it.


Enable zoom
-----------

.. code-block:: js
  :caption: map.js - zoom definition
  :linenos:
  :lineno-start: 18
  :emphasize-lines: 3-7

  // ...

  // Define the zoom and attach it to the map
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on('zoom', doZoom);
  svg.call(zoom);

  // ...

Now we need to define the function ``doZoom()`` which will actually do the zoom.

.. code-block:: js
  :caption: map.js - zoom function
  :linenos:
  :lineno-start: 91
  :emphasize-lines: 3-9

  // ...

  /**
   * Zoom the features on the map. This rescales the features on the map.
   */
  function doZoom() {
    mapFeatures.attr("transform",
      "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
  }

  // ...

.. rubric:: Next

Proceed to :ref:`step_07`.


Code
----

* For reference, the file ``index.html`` after step 6:
    https://github.com/lvonlanthen/data-map-d3/blob/step-06/index.html

* For reference, the file ``style.css`` after step 6:
    https://github.com/lvonlanthen/data-map-d3/blob/step-06/style.css

* For reference, the file ``map.js`` after step 6:
    https://github.com/lvonlanthen/data-map-d3/blob/step-06/map.js

* The diff view of step 5 and step 6:
    https://github.com/lvonlanthen/data-map-d3/compare/step-05...step-06?diff=split
