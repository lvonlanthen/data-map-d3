.. _step_09:

Step 9: Show details of features
================================

.. comments

In this step, we use a container to show details of a feature when clicking it.

.. contents:: Contents
  :depth: 2
  :local:


Details container
-----------------

We did not touch our HTML document in a while and now we are going to create a ``<div>`` container just underneath the map. In this container, we will show the details of a feature when the user clicks on it. The container is hidden initially.

.. code-block:: html
  :caption: index.html - details container
  :linenos:
  :lineno-start: 11
  :emphasize-lines: 4

      <!-- ... -->
      <div id="map"><!-- Map container --></div>

      <div id="details" class="hidden"><!-- Details container --></div>

      <!-- JS libraries -->
      <!-- ... -->


Click function to show details
------------------------------

Similar to the function to show a tooltip, we will create a function to show the details of a feature.

We are creating a function which handles showing the details.

.. code-block:: js
  :caption: map.js - function to show details
  :linenos:
  :lineno-start: 100
  :emphasize-lines: 3-20

  // ...

  /**
   * Show the details of a feature in the details <div> container.
   *
   * @param {object} f - A GeoJSON Feature object.
   */
  function showDetails(f) {
    // Get the ID of the feature.
    var id = getIdOfFeature(f);
    // Use the ID to get the data entry.
    var d = dataById[id];

    // The details HTML output is just the name
    var detailsHtml = d.name;

    // Put the HTML output in the details container and show (unhide) it.
    d3.select('#details').html(detailsHtml);
    d3.select('#details').classed("hidden", false);
  }

  // ...

And we trigger the function when a user clicks on a feature.

.. code-block:: js
  :caption: map.js - trigger function to show details
  :linenos:
  :lineno-start: 91
  :emphasize-lines: 6-8

          // ...
          .attr('d', path)
          // When the mouse moves over a feature, show the tooltip.
          .on('mousemove', showTooltip)
          // When the mouse moves out of a feature, hide the tooltip.
          .on('mouseout', hideTooltip)
          // When a feature is clicked, show the details of it.
          .on('click', showDetails);

    // ...


Mustache templates
------------------

Until now, we are just showing the name of the feature in the details container. We would like to show much more information, for example a table showing all the data we have on this feature (name, total area, forest area in % etc.).

Returning HTML output from a JavaScript function can be a bit painful, as we have to create a string full of HTML tags and variables between. This can become quite ugly, especially if we want to output an HTML table.

This is why we are going to use Mustache_ templates and more specifically `mustache.js`_ since we are dealing with JavaScript. As stated on their homepage, Mustache is a logic-less template syntax. It can be used for HTML, config files, source code - anything. It works by expanding tags in a template using values provided in a hash or object.

First, we are going to include the `mustache.js`_ JavaScript library in our HTML document.

.. code-block:: html
  :caption: index.html - include mustache library
  :linenos:
  :lineno-start: 14
  :emphasize-lines: 5

      <!-- ... -->

      <!-- JS libraries -->
      <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min.js"></script>

      <!-- ... -->

Now we are ready to create a Mustache template. We can do so right in our HTML document. This way, we will have all of our HTML output in one file. To define Mustache markup in a HTML document, we can use the ``<script>`` tag with type ``x-tmpl-mustache``. The script within this block will not be executed until we tell Mustache to do so.

.. code-block:: guess
  :caption: index.html - mustache template
  :linenos:
  :lineno-start: 13
  :emphasize-lines: 4-29

      <!-- ... -->
      <div id="details" class="hidden"><!-- Details container --></div>

      <!-- Mustache template, rendered later to show the details of a feature -->
      <script id="template" type="x-tmpl-mustache">
        <h3>{{ name }}</h3>
        <table>
          <tr>
            <th>Total area:</th>
            <td>{{ area }} km&sup2;</td>
          </tr>
          <tr>
            <th>Urban area:</th>
            <td>{{ urban }} %</td>
          </tr>
          <tr>
            <th>Agricultural area:</th>
            <td>{{ agriculture }} %</td>
          </tr>
          <tr>
            <th>Forest area:</th>
            <td>{{ forest }} %</td>
          </tr>
          <tr>
            <th>Unproductive area:</th>
            <td>{{ unproductive }} %</td>
          </tr>
        </table>
      </script>

      <!-- JS libraries -->
      <!-- ... -->

Now we need to tell Mustache to load this template and parse it so it can be filled with values later.

.. code-block:: js
  :caption: map.js - parse mustache template
  :linenos:
  :lineno-start: 7
  :emphasize-lines: 3-5

  // ...

  // We get and prepare the Mustache template, parsing it speeds up future uses
  var template = d3.select('#template').html();
  Mustache.parse(template);

  // ...

And finally, in our showDetails function, we replace our previously created detailsHtml output with our rendered Mustache template.

.. code-block:: js
  :caption: map.js - render mustache template
  :linenos:
  :lineno-start: 106
  :emphasize-lines: 5,15-17

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

    // Put the HTML output in the details container and show (unhide) it.
    d3.select('#details').html(detailsHtml);
    d3.select('#details').classed("hidden", false);
  }

  // ...


.. rubric:: Next

Proceed to :ref:`step_10`.


Code
----

* For reference, the file ``index.html`` after step 9:
    https://github.com/lvonlanthen/data-map-d3/blob/step-09/index.html

* For reference, the file ``style.css`` after step 9:
    https://github.com/lvonlanthen/data-map-d3/blob/step-09/style.css

* For reference, the file ``map.js`` after step 9:
    https://github.com/lvonlanthen/data-map-d3/blob/step-09/map.js

* The diff view of step 8 and step 9:
    https://github.com/lvonlanthen/data-map-d3/compare/step-08...step-09?diff=split


.. _Mustache: https://mustache.github.io/
.. _`mustache.js`: https://github.com/janl/mustache.js
