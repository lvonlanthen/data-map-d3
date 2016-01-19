.. _step_13:

Step 13: Declare sources and show instructions again
====================================================

.. comments

In this step, we are going to declare the sources we used for the map and add the possibility to return to the instructions after showing the details of a feature.

.. contents:: Contents
  :depth: 2
  :local:


Add a footer
------------

It is very important to declare the data sources used to create the map and we will do so by adding a footer at the bottom of the page.

.. code-block:: html
  :caption: index.html - footer with data sources
  :linenos:
  :lineno-start: 24
  :emphasize-lines: 12-14

        <!-- ... -->

        <div id="details" class="hidden row"><!-- Details container --></div>
        <div id="initial">
          <h5>Instructions</h5>
          <ul>
            <li>Change the key using the dropdown above the map.</li>
            <li>Select a municipality to show the details.</li>
            <li>Scroll in the map to zoom in and out.</li>
          </ul>
        </div>
        <div class="footer">
          <strong>Data sources</strong>: Data from the Swiss Federal Statistical Office, both the <a href="http://www.bfs.admin.ch/bfs/portal/de/index/dienstleistungen/geostat/datenbeschreibung/generalisierte_gemeindegrenzen.html" target="_blank">geographical data</a> and the <a href="http://www.bfs.admin.ch/bfs/portal/de/index/regionen/02/daten.html" target="_blank">statistical data</a>.
        </div>
      </div>

      <!-- ... -->

And we style it with CSS

.. code-block:: css
  :caption: style.css - footer style
  :linenos:
  :lineno-start: 38
  :emphasize-lines: 3-10

  /* ... */

  .footer {
    border-top: 1px solid silver;
    color: #888888;
    font-size: 1.25rem;
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
  }

  /* ... */


Return to instructions
----------------------

Right now the instructions are only visible when the page is first loaded. After clicking on a feature the instructions are hidden and there is no way to bring them back.

We will now add a button to close the details and bring back the initial instructions.

First, we create a button as part of the Mustache template for the details of a feature. To do this, we reduce the number of columns the table is using up from 6 to 5. This makes room for one single column after the table which contains the button. Notice the ``column`` class name for single column (as opposed to ``columns`` for multiple columns).

.. code-block:: guess
  :caption: index.html - close button in template
  :linenos:
  :lineno-start: 38
  :emphasize-lines: 6,28

      <!-- ... -->

      <!-- Mustache template, rendered later to show the details of a feature -->
      <script id="template" type="x-tmpl-mustache">
        <h3 class="six columns">{{ name }}</h3>
        <table class="five columns">
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
        <a href="#" id="close-details" class="one column" onclick="hideDetails(); return false;">&#x274c;</a>
      </script>

      <!-- ... -->

Now we need to define the function ``hideDetails()`` which will hide the details container and show the initial instructions container again.

.. code-block:: js
  :caption: map.js - function to hide the details
  :linenos:
  :lineno-start: 158
  :emphasize-lines: 3-11

  // ...

  /**
   * Hide the details <div> container and show the initial content instead.
   */
  function hideDetails() {
    // Hide the details
    d3.select('#details').classed("hidden", true);
    // Show the initial content
    d3.select('#initial').classed("hidden", false);
  }

  // ...

Lastly, we apply some styling to the button.

.. code-block:: css
  :caption: style.css - close button style
  :linenos:
  :lineno-start: 47
  :emphasize-lines: 3-12

  /* ... */

  #close-details {
    color: #FA5858;
    text-decoration: none;
    font-size: 4rem;
    text-align: right;
    line-height: 4.5rem;
  }
  #close-details:hover {
    color: red;
  }

  /* ... */


Code
----

* For reference, the file ``index.html`` after step 13:
    https://github.com/lvonlanthen/data-map-d3/blob/step-13/index.html

* For reference, the file ``style.css`` after step 13:
    https://github.com/lvonlanthen/data-map-d3/blob/step-13/style.css

* For reference, the file ``map.js`` after step 13:
    https://github.com/lvonlanthen/data-map-d3/blob/step-13/map.js

* The diff view of step 12 and step 13:
    https://github.com/lvonlanthen/data-map-d3/compare/step-12...step-13?diff=split
