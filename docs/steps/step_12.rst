.. _step_12:

Step 12: Dropdown to select map key
===================================

.. comments

In this step, we are going to create a dropdown to select the key after which the map is colored.

.. contents:: Contents
  :depth: 2
  :local:


Function for the coloring
-------------------------

Until now, the map is colored when the CSV inside the GeoJSON is loaded. We want to be able to change the colors without having to reload the CSV data (and the GeoJSON) because the data is already available.

So far, the data of the CSV is only available within the function which loads the file. We need to be able to access this data from outside of this function so we declare a new variable in which we store the data once it is available.

.. code-block:: js
  :caption: map.js - variable to store the data
  :linenos:
  :lineno-start: 7
  :emphasize-lines: 3-4

  // ...

  // We define a variable to later hold the data of the CSV.
  var mapData;

  // ...

In the function where we load the CSV, we store the data to the new variable.

.. code-block:: js
  :caption: map.js - store the data
  :linenos:
  :lineno-start: 70
  :emphasize-lines: 6-8

    // ...

    // Read the data for the cartogram
    d3.csv('data/areastatistics.csv', function(data) {

      // We store the data object in the variable which is accessible from
      // outside of this function.
      mapData = data;

      // This maps the data of the CSV so it can be easily accessed by
      // the ID of the municipality, for example: dataById[2196]

      // ...

Now we can use the map data to upate the colors any time we want. We can therefore define a function which will do exactly that. The coloring is already done in the CSV function and we can take a lot of it to create our function, namely setting the domain of the quantize scale (as this depends on which data key we are looking at) and the setting the class of the feature paths.

.. code-block:: js
  :caption: map.js - function to update map colors
  :linenos:
  :lineno-start: 115
  :emphasize-lines: 3-20

  // ...

  /**
   * Update the colors of the features on the map. Each feature is given a
   * CSS class based on its value.
   */
  function updateMapColors() {
    // Set the domain of the values (the minimum and maximum values of
    // all values of the current key) to the quantize scale.
    quantize.domain([
      d3.min(mapData, function(d) { return getValueOfData(d); }),
      d3.max(mapData, function(d) { return getValueOfData(d); })
    ]);
    // Update the class (determining the color) of the features.
    mapFeatures.selectAll('path')
      .attr('class', function(f) {
        // Use the quantized value for the class
        return quantize(getValueOfData(dataById[getIdOfFeature(f)]));
      });
  }

  // ...

Since setting the domain of the quantize scale and setting the class of the feature paths is now handled by a separate function, we can remove this part from the CSV file and instead call the function we just created. This prevents duplication of code.

.. code-block:: js
  :caption: map.js - call updateMapColors from within CSV
  :linenos:
  :lineno-start: 70
  :emphasize-lines: 16,23-24,33-34

    // ...

    // Read the data for the cartogram
    d3.csv('data/areastatistics.csv', function(data) {

      // We store the data object in the variable which is accessible from
      // outside of this function.
      mapData = data;

      // This maps the data of the CSV so it can be easily accessed by
      // the ID of the municipality, for example: dataById[2196]
      dataById = d3.nest()
        .key(function(d) { return d.id; })
        .rollup(function(d) { return d[0]; })
        .map(data);

      // We add the features to the <g> element created before.
      // D3 wants us to select the (non-existing) path objects first ...
      mapFeatures.selectAll('path')
          // ... and then enter the data. For each feature, a <path>
          // element is added.
          .data(features.features)
        .enter().append('path')
          // As "d" attribute, we set the path of the feature.
          .attr('d', path)
          // When the mouse moves over a feature, show the tooltip.
          .on('mousemove', showTooltip)
          // When the mouse moves out of a feature, hide the tooltip.
          .on('mouseout', hideTooltip)
          // When a feature is clicked, show the details of it.
          .on('click', showDetails);

      // Call the function to update the map colors.
      updateMapColors();

    });

    // ...


Dropdown to select key
----------------------

Now we need a possibility to change the key and for this, we will use a dropdown which we will place next to the heading above the map. We will therefore move the heading in a "row"-container and within that in the first column. In the second column of the row, we will create the dropdown.

.. code-block:: html
  :caption: index.html - dropdown to select key
  :linenos:
  :lineno-start: 13
  :emphasize-lines: 3-11

      <!-- ... -->
      <div class="container">
        <div class="row">
          <h3 class="nine columns">Land use statistics map</h3>
          <select id="select-key" class="three columns">
            <option value="urban" selected="selected">Urban area in %</option>
            <option value="agriculture">Agricultural area in %</option>
            <option value="forest">Forest area in %</option>
            <option value="unproductive">Unproductive area in %</option>
          </select>
        </div>
        <div id="map"><!-- Map container --></div>

        <!-- ... -->


Action to change the key
------------------------

Now we need to trigger an update of the map colors when an option of the dropdown is selected.

.. code-block:: js
  :caption: map.js - trigger action to change map colors
  :linenos:
  :lineno-start: 2
  :emphasize-lines: 3-9

  // ...

  // Listen to changes of the dropdown to select the key to visualize on
  // the map.
  d3.select('#select-key').on('change', function(a) {
    // Change the current key and call the function to update the colors.
    currentKey = d3.select(this).property('value');
    updateMapColors();
  });

  // ...

And finally we can update the instructions as this is a new action the user than perform.

.. code-block:: html
  :caption: index.html - update instructions
  :linenos:
  :lineno-start: 27
  :emphasize-lines: 4

        <!-- ... -->
          <h5>Instructions</h5>
          <ul>
            <li>Change the key using the dropdown above the map.</li>
            <li>Select a municipality to show the details.</li>
            <li>Scroll in the map to zoom in and out.</li>
          </ul>
        <!-- ... -->



.. rubric:: Next

Proceed to :ref:`step_13`.


Code
----

* For reference, the file ``index.html`` after step 12:
    https://github.com/lvonlanthen/data-map-d3/blob/step-12/index.html

* For reference, the file ``style.css`` after step 12:
    https://github.com/lvonlanthen/data-map-d3/blob/step-12/style.css

* For reference, the file ``map.js`` after step 12:
    https://github.com/lvonlanthen/data-map-d3/blob/step-12/map.js

* The diff view of step 11 and step 12:
    https://github.com/lvonlanthen/data-map-d3/compare/step-11...step-12?diff=split
