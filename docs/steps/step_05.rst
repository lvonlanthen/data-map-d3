.. _step_05:

Step 5: Dynamic color domain
============================

.. comments

In this step, we will use a dynamic domain for quantize scale.

.. contents:: Contents
  :depth: 2
  :local:


In the previous step, we used a static domain for the quantize scale.

.. code-block:: js
  :caption: map.js - hard coded quantize scale domain
  :linenos:
  :lineno-start: 24
  :emphasize-lines: 4-5,9

  // ...

  // We create a quantize scale to categorize the values in 9 groups.
  // The domain is static and has a maximum of 100 (based on the
  // assumption that no value can be larger than 100%).
  // The scale returns text values which can be used for the color CSS
  // classes (q0-9, q1-9 ... q8-9)
  var quantize = d3.scale.quantize()
      .domain([0, 100])
      .range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));

  // ...

The hard coded domain ranging from 0 to 100 works surprisingly well for our data because there is a wide range of percentage values with very low and very high values.

However, as we would change the data and move away from percentage data this would not work with values greater than 100. Also, if we had only high percentage values (eg. all values > 50%), the domain of the quantize scale would still go from 0 to 100, even though there were no values for these categories.

It is therefore much better to use a domain which is based on the actual values of the data.


Store current key in single variable
------------------------------------

As we have seen before, it is possible to change the key of the map and we will do this later using a dropdown. In order to make it easier to change the key and access the values attributed to it, we will define a variable holding the current key and we will create a function returning the value belonging to it.

.. code-block:: js
  :caption: map.js - variable to hold the map key
  :linenos:
  :lineno-start: 1
  :emphasize-lines: 1-2

  // We define a variable holding the current key to visualize on the map.
  var currentKey = 'urban';

  // ...

We place this at the end of the JavaScript block.

.. code-block:: js
  :caption: map.js - function to access value of data
  :linenos:
  :lineno-start: 115
  :emphasize-lines: 3-13

  // ...

  /**
   * Helper function to access the (current) value of a data object.
   *
   * Use "+" to convert text values to numbers.
   *
   * @param {object} d - A data object representing an entry (one line) of
   * the data CSV.
   */
  function getValueOfData(d) {
    return +d[currentKey];
  }

And we can use this function instead of manually accessing key ``urban`` in the quantize function

.. code-block:: js
  :caption: map.js - use value function in quantize
  :linenos:
  :lineno-start: 73
  :emphasize-lines: 4

        // ...
          .attr('class', function(d) {
            // Use the quantized value for the class
            return quantize(getValueOfData(dataById[d.properties.GMDNR]));
          })
          // ...


Domain calculation
------------------



Replace the old definition of the quantize with the following (the domain will be calculated later):

.. code-block:: js
  :caption: map.js - quantize without domain
  :linenos:
  :lineno-start: 27
  :emphasize-lines: 3-8

  // ...

  // We prepare a quantize scale to categorize the values in 9 groups.
  // The scale returns text values which can be used for the color CSS
  // classes (q0-9, q1-9 ... q8-9). The domain will be defined once the
  // values are known.
  var quantize = d3.scale.quantize()
    .range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));

  // ...


.. code-block:: js
  :caption: map.js - calculate domain
  :linenos:
  :lineno-start: 55
  :emphasize-lines: 3-8

      // ...

      // Set the domain of the values (the minimum and maximum values of
      // all values of the current key) to the quantize scale.
      quantize.domain([
        d3.min(data, function(d) { return getValueOfData(d); }),
        d3.max(data, function(d) { return getValueOfData(d); })
      ]);

      // ...


.. rubric:: Next

Proceed to :ref:`step_06`.


Code
----

* For reference, the file ``index.html`` after step 5:
    https://github.com/lvonlanthen/data-map-d3/blob/step-05/index.html

* For reference, the file ``style.css`` after step 5:
    https://github.com/lvonlanthen/data-map-d3/blob/step-05/style.css

* For reference, the file ``map.js`` after step 5:
    https://github.com/lvonlanthen/data-map-d3/blob/step-05/map.js

* The diff view of step 4 and step 5:
    https://github.com/lvonlanthen/data-map-d3/compare/step-04...step-05?diff=split
