.. _step_01:

Step 1: Basic document structure
================================

.. comments
  TODO: Explain basic folder structure.
  TODO: Maybe explain more about CSS?
  TODO: HTML Colors

In this step, we will create the basic HTML document which will hold our map.

.. contents:: Contents
  :depth: 2
  :local:


Basic structure of the HTML document
------------------------------------

Every HTML document consists HTML tags, the most basic ones is ``<html>``. Within the HTML document, the sections ``<head>`` and ``<body>`` are found. Every tag has a closing matching closing tag (``<html></html>``).

.. seealso::
  For a basic introduction to HTML, refer to the `W3Schools HTML Introduction`_.

The following is a very basic structure of a HTML document. Create a directory where you want to work in and create a new document called ``index.html`` and add the following content. Open the file in a webbrowser and you should see your HTML document. The title of the document was set and "Content" is visible.

.. code-block:: html
  :caption: index.html - very basic HTML structure
  :linenos:

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Land use statistics map</title>
    </head>
    <body>
      Content
    </body>
  </html>


Container for the map
---------------------

The map will be placed in a container so we need to create this container first. The ``<div>`` tag defindes a division or a section in an HTML document, so we create one with a unique ID to later have easy access to it. While we are at it, we also create a heading using the ``<h3>`` tag.

.. code-block:: html
  :caption: index.html - with a map container
  :linenos:
  :lineno-start: 6
  :emphasize-lines: 3-4

  <!-- ... -->
    <body>
      <h3>Land use statistics map</h3>
      <div id="map"><!-- Map container --></div>
    </body>
  <!-- ... -->

The ``<div>`` element for the map is empty, as the map will be generated dynamically using JavaScript. If we refresh the browser, we see the heading but no map division, as there is no content in it.


Some very basic styling
-----------------------

Even though there is no content in the ``<div>`` element for the map, we can style it to appear in the browser. For the styling we use CSS. Within the ``<head>`` section, we could define a ``<style>`` element and define styles within this element.

However, it is better to cleanly separate the HTML from the CSS and create separate and pure CSS file. We can therefore create a new file called ``style.css`` and define the styles there.

We give the map container a predefined width and height to make it visible. We also give it a visible border and a background color. If we refresh the browser page, we can now see the empty container for the map.

.. code-block:: css
  :caption: style.css - first CSS styles
  :linenos:
  :lineno-start: 1

  body {
    margin: 25px;
  }

  #map {
    width: 900px;
    height: 600px;
    border: 1px solid silver;
    background: #E6E6E6;
  }

We also added a small margin to the ``<body>`` section to give it some space, which looks a bit nicer.

.. seealso::
  For a basic introduction to CSS, refer to the `W3Schools CSS Introduction`_.

We can now link the CSS file in our HTML documents so the changes are picked up.

.. code-block:: html
  :caption: index.html - link CSS file
  :linenos:
  :lineno-start: 2
  :emphasize-lines: 5-7

  <!-- ... -->
    <head>
      <meta charset="UTF-8">
      <title>Land use statistics map</title>

      <!-- Custom CSS styles -->
      <link href="style.css" rel="stylesheet" type="text/css">
    </head>
  <!-- ... -->


Load D3.js library
------------------

Since the map will be created with `D3.js`_, we need to load the D3 library. This is a JavaScript file we need to include in our document. Scripts can be placed in the ``<body>``, or in the ``<head>`` section of an HTML page. However, it is good practice to place scripts at the bottom of the ``<body>`` element to improve page load.

You can either download the D3.js library and link it locally, or you can directly link the latest release of the library. On http://d3js.org/, they provide the following link::

  <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

.. hint::
  Please note that if you are working on your local machine without a web server running, you may need to add ``http:`` to the script URL in order to make it work on your machine. This is what will be used throughout this tutorial.

.. code-block:: html
  :caption: index.html - load the D3.js library
  :linenos:
  :lineno-start: 9
  :emphasize-lines: 5-7

  <!-- ... -->
    <body>
      <h3>Land use statistics map</h3>
      <div id="map"><!-- Map container --></div>

      <!-- JS libraries -->
      <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    </body>
  <!-- ... -->


JavaScript debugging: console.log()
-----------------------------------

The map will be created using JavaScript code that we will write shortly. We can already prepare a JavaScript document, because as with the CSS style sheet, we are going to create a separate file for the JavaScript. We create a file called ``map.js`` and for test purposes, we are just going to output some text in the console.

.. code-block:: js
  :caption: map.js - first log to console
  :linenos:
  :lineno-start: 1

  // This is where the map will be coded.
  console.log("Ready to create the map!");

We link the JavaScript file at the bottom of the ``<body>`` section.

.. code-block:: html
  :caption: index.html - log stuff to the console
  :linenos:
  :lineno-start: 12
  :emphasize-lines: 5-7

      <!-- ... -->

      <!-- JS libraries -->
      <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

      <!-- Custom JS code -->
      <script src="map.js"></script>
    </body>
  <!-- ... -->

To see the browser console, you need to open the developer tools by hitting ``F12`` and selecting "Console" in the menu. If you are using Firefox, it is recommended to install the Firebug extension.

.. seealso::
  For more information on the console and the developer tools, visit `W3Schools JavaScript Debugging`_.

``console.log()`` is very useful for debugging. You can not only output text, but also variables and data.
In your browser, you can use the console.log() method to display data.

However, since not all browsers support the console, you should not have console logs in production.


.. rubric:: Next

Proceed to :ref:`step_02`.


Code
----

* For reference, the file ``index.html`` after step 1:
    https://github.com/lvonlanthen/data-map-d3/blob/step-01/index.html

* For reference, the file ``style.css`` after step 1:
    https://github.com/lvonlanthen/data-map-d3/blob/step-01/style.css

* For reference, the file ``map.js`` after step 1:
    https://github.com/lvonlanthen/data-map-d3/blob/step-01/map.js

.. _W3Schools HTML Introduction: http://www.w3schools.com/html/html_intro.asp
.. _W3Schools CSS Introduction: http://www.w3schools.com/css/css_intro.asp
.. _`D3.js`: http://d3js.org/
.. _W3Schools JavaScript Debugging: http://www.w3schools.com/js/js_debugging.asp
