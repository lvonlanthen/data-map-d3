.. _step_02:

Step 2: First map
=================

.. comments
  TODO: Does Chrome need a http server?

In this step, we will prepare the geographic data and display it on the map for the first time.

.. contents:: Contents
  :depth: 2
  :local:


Preparation of geographic data
------------------------------

For this tutorial, we use data for Switzerland. The geographical base units are the `Municipalities of Switzerland`_. The boundaries of these municipalities can be downloaded as Shapefiles. The preparation consists of using QGIS to remove unccessary attributes and save the geometries as GeoJSON.

.. hint::
  If you want to skip the data preparation steps, you can create a new folder ``data`` in your working directory, download the `GeoJSON file`_ (right-click, save as ...) from the repository and save it to ``data/ch_municipalities.geojson``. You can then proceed to the section :ref:`show_features_on_map`.


Download
~~~~~~~~

Download the data from GEOSTAT_ of the Swiss Federal Statistical Office. Make sure to download the file named "Generalisierte Gemeindegrenzen: Geodaten" (gd-b-00.03-877-gg14) for the year **2014**.

Once the file was downloaded, extract the ZIP file.


Data structure
~~~~~~~~~~~~~~

The zip file contains several files and folders. The folder ``ggg_2014`` contains the generalized municipality boundaries in various formats. We will work with Shapefiles (``shp``).

For each format, there are different files such as ``g1b14.shp`` or ``g2g14.shp``.

* The first two characters indicate the level of `cartographic generalization`_, where ``g2`` is more generalized (meaning less details and smaller files) than ``g1``.

* The next letter indicates the type of geometry:

  * ``g`` (Gemeinden): Municipalities or Communes
  * ``b`` (Bezirke): Districts
  * ``k`` (Kantone): Cantons
  * ``r`` (Grossregionen): Regions
  * ``l`` (Landesgrenzen): Country

More information on the files can be found in the metadata file (available only in german or french).

For this tutorial, we will use the boundaries of municipalities. As the very detailed boundaries are not that important, we can use the ``g2`` generalization level. Therefore, we will work with the file ``ggg_2014/shp/g2g14.shp``.


QGIS
~~~~

.. hint::
  We will work with the open source GIS software QGIS_. If you do not have a GIS software installed, it is recommended that you download and install QGIS. If you already have another GIS software, you can work with the one you are more familiar with. However, the following steps are written for QGIS.

Open the file ``ggg_2014/shp/g2g14.shp`` in QGIS.

Remove unnecessary attributes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Since we will only need the geometries of the municipalities, we can delete columns of the Shapefile which are not needed. This will help to reduce the file size of the resulting GeoJSON.

There is a plugin called "Table Manager Plugin" which can be installed and used to delete the unnecessary columns. You can delete all columns except ``GMDNR`` (the ID of the municipality) and ``GMDNAME`` (the name of the municipality).

It is recommended that you save the resulting Shapefile under a new file name to not modify the original file. QGIS will automatically add the new Shapefile to the map.

Export as GeoJSON
~~~~~~~~~~~~~~~~~

To export the Shapefile as GeoJSON make sure the correct file (the one without unnecessary attributes) is selected in QGIS.

Use right-click on the file and select "Save as" which opens a dialog box and you can set the following parameters:

* Format: GeoJSON

* Save as: [working_directory]/data/ch_municipalities.geojson

    *Navigate to your working directory (where you placed your index.html file), create a new folder "data" and save the file as "ch_municipalities.geojson".*

* CRS: "Selected CRS" and browse to select "WGS 84" (you can filter by "EPSG:4326")

* Additionally, set the following parameters:

    * Encoding: UTF-8

    * Layer Options > COORDINATE_PRECISION: 3

        *This will help to reduce the file size*

Then click OK to export the Shapefile as GeoJSON.


.. _show_features_on_map:

Show features on map
--------------------

Now we would like to display the GeoJSON on the map.

.. code-block:: js
  :caption: map.js - a first map
  :linenos:
  :lineno-start: 1

  // We specify the dimensions for the map container. We use the same
  // width and height as specified in the CSS above.
  var width = 900,
      height = 600;

  // We create a SVG element in the map container and give it some
  // dimensions.
  var svg = d3.select('#map').append('svg')
    .attr('width', width)
    .attr('height', height);

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

  // We prepare a path object and apply the projection to it.
  var path = d3.geo.path()
    .projection(projection);

  // Load the features from the GeoJSON.
  d3.json('data/ch_municipalities.geojson', function(error, features) {

    // We add a <g> element to the SVG element and give it a class to
    // style it later.
    svg.append('g')
        .attr('class', 'features')
      // D3 wants us to select the (non-existing) path objects first ...
      .selectAll('path')
        // ... and then enter the data. For each feature, a <path> element
        // is added.
        .data(features.features)
      .enter().append('path')
        // As "d" attribute, we set the path of the feature.
        .attr('d', path);

  });


.. hint::
  If you are using Chrome, you may not see the map. Instead, you may see an error message in the console saying that the GeoJSON file could not be loaded because cross origin requests are not supported. In this case, you either have to run a web server locally or use a different browser (eg. Firefox).


.. rubric:: Next

Proceed to :ref:`step_03`.


Code
----

* For reference, the file ``index.html`` after step 2:
    https://github.com/lvonlanthen/data-map-d3/blob/step-02/index.html

* For reference, the file ``style.css`` after step 2:
    https://github.com/lvonlanthen/data-map-d3/blob/step-02/style.css

* For reference, the file ``map.js`` after step 2:
    https://github.com/lvonlanthen/data-map-d3/blob/step-02/map.js

* The diff view of step 1 and step 2:
    https://github.com/lvonlanthen/data-map-d3/compare/step-01...step-02?diff=split


.. _Municipalities of Switzerland: https://en.wikipedia.org/wiki/Municipalities_of_Switzerland
.. _GeoJSON file: https://raw.githubusercontent.com/lvonlanthen/data-map-d3/master/data/ch_municipalities.geojson
.. _GEOSTAT: http://www.bfs.admin.ch/bfs/portal/de/index/dienstleistungen/geostat/datenbeschreibung/generalisierte_gemeindegrenzen.html
.. _cartographic generalization: https://en.wikipedia.org/wiki/Cartographic_generalization
.. _QGIS: http://www.qgis.org/
