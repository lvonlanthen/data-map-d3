.. _step_04:

Step 4: Add some colors
=======================

.. comments

In this step, we will prepare and include statistical data and use it to color the municipalities on the map.

.. contents:: Contents
  :depth: 2
  :local:


Preparation of statistical data
-------------------------------

As statistical data, we will use `data on municipalities`_ provided by the Swiss Federal Statistical Office. You can download the Excel file and open it, for example using LibreCalc.

.. hint::
  If you want to skip the data preparation steps, you can download the `CSV file`_ (right-click, save as ...) from the repository and save it to ``data/areastatistics.csv``. You can then proceed to the section :ref:`select_colors`.

Unfortunately, the file is not ready to use as such because the file has some metadata and merged column labels at the top. We want it to start right with one row of data labels followed by the data rows.

Also, the file contains a lot of columns which we will not use. In order to keep file size minimal, we are going to delete all unnecessary columns from the file.

For our tutorial, we only need the following columns:
  * Gemeindecode
  * Gemeindename
  * Gesamtfläche in km²
  * Siedlungsfläche in %
  * Landwirtschaftsfläche in %
  * Wald und Gehölze in %
  * Unproduktive Fläche in %

This means you can do the following actions in the Excel file:

* Delete columns W to AU
* Delete columns R and T
* Delete columns C to O
* We use row 9 as our new header to label the columns:

  * ``id``
  * ``name``
  * ``area``
  * ``urban``
  * ``agriculture``
  * ``forest``
  * ``unproductive``

* Delete rows 1 to 8
* Delete rows 2354 to 2367

The table should now look like this:

+-----+--------------------+------+-------+-------------+--------+--------------+
| id  | name               | area | urban | agriculture | forest | unproductive |
+=====+====================+======+=======+=============+========+==============+
| 1   | Aeugst am Albis    | 7.9  | 12.6  | 51.3        | 30.9   | 5.2          |
+-----+--------------------+------+-------+-------------+--------+--------------+
| 2   | Affoltern am Albis | 10.6 | 30.8  | 40.1        | 28.2   | 0.9          |
+-----+--------------------+------+-------+-------------+--------+--------------+
| ... | ...                | ...  | ...   | ...         | ...    | ...          |
+-----+--------------------+------+-------+-------------+--------+--------------+

We can now export it as CSV document and save it to our data folder as ``data/areastatistics.csv``.

When saving it, make sure to use the following settings:

* Character set: Unicode (UTF-8)
* Field delimiter: ,
* Text delimiter: ""


.. _select_colors:

Select some colors
------------------

Next we are going so select some colors for our map. For this, we are using ColorBrewer_, which is great at giving color advice for maps.

We choose 9 data classes and select a color scheme that appeals to us, for example YlGnBu. We then click on "Export" and copy the CSS classes for this scheme.

These CSS classes are now pasted in the CSS style section of our HTML document.

.. code-block:: css
  :caption: style.css - color classes from ColorBrewer
  :linenos:
  :lineno-start: 10
  :emphasize-lines: 3-12

  /* ... */

  /* Thanks to http://colorbrewer2.org/ */
  .YlGnBu .q0-9{fill:rgb(255,255,217)}
  .YlGnBu .q1-9{fill:rgb(237,248,177)}
  .YlGnBu .q2-9{fill:rgb(199,233,180)}
  .YlGnBu .q3-9{fill:rgb(127,205,187)}
  .YlGnBu .q4-9{fill:rgb(65,182,196)}
  .YlGnBu .q5-9{fill:rgb(29,145,192)}
  .YlGnBu .q6-9{fill:rgb(34,94,168)}
  .YlGnBu .q7-9{fill:rgb(37,52,148)}
  .YlGnBu .q8-9{fill:rgb(8,29,88)}



Color the municipalities by attribute
-------------------------------------

We have selected 9 classes from ColorBrewer so we want to split the attribute values into 9 categories. Each feature then receives a CSS class based on the category of its value and the CSS class will determine its color on the map.

To achieve the categorization, we create a quantize scale with D3. It creates a number of classes within a given domain and we use it to return the class name used by ColorBrewer.

At the same time, we prepare a D3 mapping object called ``dataById`` which will later permit easy access to the data we are about to read. More on that later.

.. code-block:: js
  :caption: map.js - object to access data and quantize scale
  :linenos:
  :lineno-start: 21
  :emphasize-lines: 3-13

  // ...

  // We prepare an object to later have easier access to the data.
  var dataById = d3.map();

  // We create a quantize scale to categorize the values in 9 groups.
  // The domain is static and has a maximum of 100 (based on the
  // assumption that no value can be larger than 100%).
  // The scale returns text values which can be used for the color CSS
  // classes (q0-9, q1-9 ... q8-9)
  var quantize = d3.scale.quantize()
      .domain([0, 100])
      .range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));

  // ...

Since the class of the feature depends on the category of the attribute, we need to wait until the CSV is loaded until we can draw the features on the map.

We will load the CSV (using ``d3.csv()``) inside the function called after loading the GeoJSON. The drawing of the features will now happen inside the function called after the CSV is available, meaning that we replace the existing function and move it inside the ``d3.csv()`` function.

.. code-block:: js
  :caption: map.js - load csv and draw the features
  :linenos:
  :lineno-start: 44
  :emphasize-lines: 3-30

  // ...

    // Read the data for the cartogram
    d3.csv('data/areastatistics.csv', function(data) {

      // This maps the data of the CSV so it can be easily accessed by
      // the ID of the municipality, for example: dataById[2196]
      dataById = d3.nest()
        .key(function(d) { return d.id; })
        .rollup(function(d) { return d[0]; })
        .map(data);

      // We add a <g> element to the SVG element and give it a class to
      // style it later. We also add a class name for Colorbrewer.
      svg.append('g')
          .attr('class', 'features YlGnBu')
        // D3 wants us to select the (non-existing) path objects first ...
        .selectAll('path')
          // ... and then enter the data. For each feature, a <path>
          // element is added.
          .data(features.features)
        .enter().append('path')
          .attr('class', function(d) {
            // Use the quantized value for the class
            return quantize(dataById[d.properties.GMDNR].urban);
          })
          // As "d" attribute, we set the path of the feature.
          .attr('d', path);

    });

  // ...

Play around
-----------

You can try and change the key of the map which is visualized on the map. You can do this by changing the key accessed by the ``dataById`` object called inside the ``quantize()`` function.

.. code-block:: js
  :caption: map.js - change map key
  :linenos:
  :lineno-start: 64
  :emphasize-lines: 5

          // ...

          .attr('class', function(d) {
            // Use the quantized value for the class
            return quantize(dataById[d.properties.GMDNR].urban);
          })

          // ...


Try to set it to ``agriculture``, ``forest`` or ``unproductive`` and refresh the map.


.. rubric:: Next

Proceed to :ref:`step_05`.


Code
----

* For reference, the file ``index.html`` after step 4:
    https://github.com/lvonlanthen/data-map-d3/blob/step-04/index.html

* For reference, the file ``style.css`` after step 4:
    https://github.com/lvonlanthen/data-map-d3/blob/step-04/style.css

* For reference, the file ``map.js`` after step 4:
    https://github.com/lvonlanthen/data-map-d3/blob/step-04/map.js

* The diff view of step 3 and step 4:
    https://github.com/lvonlanthen/data-map-d3/compare/step-03...step-04?diff=split


.. _data on municipalities: http://www.bfs.admin.ch/bfs/portal/de/index/regionen/02/daten.html
.. _CSV file: https://raw.githubusercontent.com/lvonlanthen/data-map-d3/master/data/areastatistics.csv
.. _ColorBrewer: http://colorbrewer2.org/
