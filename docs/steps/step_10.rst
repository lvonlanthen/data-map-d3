.. _step_10:

Step 10: A bit of styling
=========================

.. comments

In this step, we are going to do some first styling of our page.

.. contents:: Contents
  :depth: 2
  :local:


Skeleton CSS
------------

We are going to use a CSS framework. Since we want to keep our page rather simple and we are not going to use a lot of fancy CSS features, we are going to use Skeleton_. Skeleton is a very lightweight CSS library which comes with a responsive grid system, which we will look at later.

For now, let's just include the Skeleton_ CSS library in our HTML document.

.. code-block:: html
  :caption: index.html - include skeleton
  :linenos:
  :lineno-start: 4
  :emphasize-lines: 4-5

      <!-- ... -->
      <title>Land use statistics map</title>

      <!-- CSS libraries -->
      <link href="http://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" rel="stylesheet" type="text/css">

      <!-- Custom CSS styles -->
      <!-- ... -->

And we see that Skeleton already applied some styles to our page, namely the font changed and the table looks much nicer now.


Some styling
------------

While our table looks a bit nicer now, Skeleton also added a lot of space (padding) between the table cells. We can overwrite this in our custom style sheet. We also add a little margin at the top of our details container so it does not stick as close to the map.

.. code-block:: css
  :caption: style.css - table styling
  :linenos:
  :lineno-start: 19
  :emphasize-lines: 3-15

  /* ... */

  #details {
    margin-top: 2rem;
  }

  table {
    margin-bottom: 0;
  }
  td, th {
    padding: 6px 9px;
  }
  td {
    text-align: right;
  }

  /* ... */


Centering content
-----------------

Skeleton provides a wrapper to center content by adding a class ``container`` to the element. So we put all the HTML containers we have so far in a ``<div>`` element with this class.

.. code-block:: html
  :caption: index.html - center content
  :linenos:
  :lineno-start: 12
  :emphasize-lines: 3-8

    <!-- ... -->
    <body>
      <div class="container">
        <h3>Land use statistics map</h3>
        <div id="map"><!-- Map container --></div>

        <div id="details" class="hidden"><!-- Details container --></div>
      </div>

      <!-- Mustache template, rendered later to show the details of a feature -->
      <!-- ... -->

And we see that all the content is nicely centered, at least on larger screens. If the screen width is too narrow, the map is not centered yet, but we will fix that later on.


Grid layout
-----------

Skeleton is based on a grid layout where each row contains 12 columns.

This means that the markup for a row with two columns of equal width would look like this:

.. code-block:: html
  :caption: markup to create columns with skeleton

  <div class="row">
    <div class="six columns">Column 1</div>
    <div class="six columns">Column 2</div>
  </div>

We can use this in our details container to display the name of the feature on the left and the table with the data on the right.

First, we add the class ``row`` to the details container which will eventually hold the details.

.. code-block:: html
  :caption: index.html - class row for details container
  :linenos:
  :lineno-start: 13
  :emphasize-lines: 6

      <!-- ... -->
      <div class="container">
        <h3>Land use statistics map</h3>
        <div id="map"><!-- Map container --></div>

        <div id="details" class="hidden row"><!-- Details container --></div>
      </div>
      <!-- ... -->

Next, we add the ``columns`` class in the Mustache template.

.. code-block:: html
  :caption: index.html - name and table in columns
  :linenos:
  :lineno-start: 19
  :emphasize-lines: 5-6

      <!-- ... -->

      <!-- Mustache template, rendered later to show the details of a feature -->
      <script id="template" type="x-tmpl-mustache">
        <h3 class="six columns">{{ name }}</h3>
        <table class="six columns">
          <tr>
            <!-- ... -->


.. rubric:: Next

Proceed to :ref:`step_11`.


Code
----

* For reference, the file ``index.html`` after step 10:
    https://github.com/lvonlanthen/data-map-d3/blob/step-10/index.html

* For reference, the file ``style.css`` after step 10:
    https://github.com/lvonlanthen/data-map-d3/blob/step-10/style.css

* For reference, the file ``map.js`` after step 10:
    https://github.com/lvonlanthen/data-map-d3/blob/step-10/map.js

* The diff view of step 9 and step 10:
    https://github.com/lvonlanthen/data-map-d3/compare/step-09...step-10?diff=split


.. _Skeleton: http://getskeleton.com/
