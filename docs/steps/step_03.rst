.. _step_03:

Step 3: Dynamic map extent
==========================

.. comments

In this step, we will make the initial map extent dynamic.

.. contents:: Contents
  :depth: 2
  :local:


Get extent from data
--------------------

In the previous step, the initial extent was set based on hard-coded parameters which were found by try-and-error.

.. code-block:: js
  :caption: map.js - static initial extent
  :linenos:
  :lineno-start: 10
  :emphasize-lines: 8,11

  // ...

  // We define a geographical projection
  //     https://github.com/mbostock/d3/wiki/Geo-Projections
  // and set the initial zoom to show the features.
  var projection = d3.geo.mercator()
    // The approximate scale factor was found through try and error
    .scale(10000)
    // The geographical center of Switzerland is around 46.8°, 8.2°
    //     https://de.wikipedia.org/wiki/Älggi-Alp
    .center([8.226692, 46.80121])
    // Translate: Translate it to fit the container
    .translate([width/2, height/2]);

  // ...

These parameters (``scale`` and ``center``) happen to work quite well for Switzerland, but they are not very flexible and would not work at all if the geographic data were to change.

In order to make the extent more dynamic, we cannot set the ``scale`` and ``extent`` before we read the GeoJSON and determine the extent from the data. Instead, we simply create an initial dummy scale which will be overwritten later.

.. code-block:: js
  :caption: map.js - set dummy initial scale
  :linenos:
  :lineno-start: 10
  :emphasize-lines: 5-6,8

  // ...

  // We define a geographical projection
  //     https://github.com/mbostock/d3/wiki/Geo-Projections
  // and set some dummy initial scale. The correct scale, center and
  // translate parameters will be set once the features are loaded.
  var projection = d3.geo.mercator()
    .scale(1);

  // ...

To determine the real extent based on the features, we can make use of a function to calculate the ``scale`` and the ``center`` parameters for a given set of Features. We put the function at the bottom of our JavaScript block.

.. code-block:: js
  :caption: map.js - function to calculate extent
  :linenos:
  :lineno-start: 39
  :emphasize-lines: 3-38

  // ...

  /**
   * Calculate the scale factor and the center coordinates of a GeoJSON
   * FeatureCollection. For the calculation, the height and width of the
   * map container is needed.
   *
   * Thanks to: http://stackoverflow.com/a/17067379/841644
   *
   * @param {object} features - A GeoJSON FeatureCollection object
   *   containing a list of features.
   *
   * @return {object} An object containing the following attributes:
   *   - scale: The calculated scale factor.
   *   - center: A list of two coordinates marking the center.
   */
  function calculateScaleCenter(features) {
    // Get the bounding box of the paths (in pixels!) and calculate a
    // scale factor based on the size of the bounding box and the map
    // size.
    var bbox_path = path.bounds(features),
        scale = 0.95 / Math.max(
          (bbox_path[1][0] - bbox_path[0][0]) / width,
          (bbox_path[1][1] - bbox_path[0][1]) / height
        );

    // Get the bounding box of the features (in map units!) and use it
    // to calculate the center of the features.
    var bbox_feature = d3.geo.bounds(features),
        center = [
          (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
          (bbox_feature[1][1] + bbox_feature[0][1]) / 2];

    return {
      'scale': scale,
      'center': center
    };
  }

Now, we can call this function when we read the GeoJSON file to get the optimal ``scale`` and ``center`` for the current geographic data.

.. code-block:: js
  :caption: index.html - set optimal scale and center
  :linenos:
  :lineno-start: 23
  :emphasize-lines: 4-10

  // ...
  d3.json('data/ch_municipalities.geojson', function(error, features) {

    // Get the scale and center parameters from the features.
    var scaleCenter = calculateScaleCenter(features);

    // Apply scale, center and translate parameters.
    projection.scale(scaleCenter.scale)
      .center(scaleCenter.center)
      .translate([width/2, height/2]);

    // We add a <g> element to the SVG element and give it a class to
    // ...

If we refresh the browser, we should not see a very big difference, as the manual parameters were already rather good. However, our code is now much more dynamic and not only works for Switzerland.


Verification
------------

To verify that our extent also works in other geographic contexts, we can test by loading a different GeoJSON file.

* You can download a `GeoJSON file of Germany`_ from `Click that 'hood!`_.

* Save it to the data folder (next to ``ch_municipalities.geojson``).

* In the code, replace the path to the GeoJSON file: ``data/germany.geojson``.

* Refresh the browser, the map should now show Germany and its states, everything nicely scaled and centered.

* Don't forget to change the path to the GeoJSON file back to ``data/ch_municipalities.geojson``.


.. rubric:: Next

Proceed to :ref:`step_04`.


Code
----

* For reference, the file ``index.html`` after step 3:
    https://github.com/lvonlanthen/data-map-d3/blob/step-03/index.html

* For reference, the file ``style.css`` after step 3:
    https://github.com/lvonlanthen/data-map-d3/blob/step-03/style.css

* For reference, the file ``map.js`` after step 3:
    https://github.com/lvonlanthen/data-map-d3/blob/step-03/map.js

* The diff view of step 2 and step 3:
    https://github.com/lvonlanthen/data-map-d3/compare/step-02...step-03?diff=split


.. _GeoJSON file of Germany: https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/germany.geojson
.. _`Click that 'hood!`: http://click-that-hood.com/
