function applyMargins() {
    var leftToggler = $(".mini-submenu-left");
    var rightToggler = $(".mini-submenu-right");
    if (leftToggler.is(":visible")) {
      $("#map .ol-zoom")
        .css("margin-left", 0)
        .removeClass("zoom-top-opened-sidebar")
        .addClass("zoom-top-collapsed");
    } else {
      $("#map .ol-zoom")
        .css("margin-left", $(".sidebar-left").width())
        .removeClass("zoom-top-opened-sidebar")
        .removeClass("zoom-top-collapsed");
    }
    if (rightToggler.is(":visible")) {
      $("#map .ol-rotate")
        .css("margin-right", 0)
        .removeClass("zoom-top-opened-sidebar")
        .addClass("zoom-top-collapsed");
    } else {
      $("#map .ol-rotate")
        .css("margin-right", $(".sidebar-right").width())
        .removeClass("zoom-top-opened-sidebar")
        .removeClass("zoom-top-collapsed");
    }
  }

  function isConstrained() {
    return $("div.mid").width() == $(window).width();
  }

  function applyInitialUIState() {
    if (isConstrained()) {
      $(".sidebar-left .sidebar-body").fadeOut('slide');
      $(".sidebar-right .sidebar-body").fadeOut('slide');
      $('.mini-submenu-left').fadeIn();
      $('.mini-submenu-right').fadeIn();
    }
  }

  $(function () {
    $('.sidebar-left .slide-submenu').on('click', function () {
      var thisEl = $(this);
      thisEl.closest('.sidebar-body').fadeOut('slide', function () {
        $('.mini-submenu-left').fadeIn();
        applyMargins();
      });
    });

    $('.mini-submenu-left').on('click', function () {
      var thisEl = $(this);
      $('.sidebar-left .sidebar-body').toggle('slide');
      thisEl.hide();
      applyMargins();
    });

    $('.sidebar-right .slide-submenu').on('click', function () {
      var thisEl = $(this);
      thisEl.closest('.sidebar-body').fadeOut('slide', function () {
        $('.mini-submenu-right').fadeIn();
        applyMargins();
      });
    });

    $('.mini-submenu-right').on('click', function () {
      var thisEl = $(this);
      $('.sidebar-right .sidebar-body').toggle('slide');
      thisEl.hide();
      applyMargins();
    });

    $(window).on("resize", applyMargins);

    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Group({
          'title': 'Base maps',
          layers: [
            new ol.layer.Tile({
              title: 'Satellite',
              type: 'base',
              visible: false,
              preload: Infinity,
              source: new ol.source.BingMaps({
                key: 'AuzXTgnihF-J1PX_F29Q9WGFEuhxpEqYlZDI99O2LPMHuAO0UCNoGcg9_sT0YQeI',
                imagerySet: 'Aerial'
              })
            }),
            new ol.layer.Tile({
              title: 'OSM',
              type: 'base',
              visible: true,
              source: new ol.source.OSM()
            })
          ]
        }),
        new ol.layer.Group({
          title: 'Overlays',
          layers: [
            new ol.layer.Image({
              title: 'EEZ Boundaries',
              source: new ol.source.ImageWMS({
                params: {
                  'LAYERS': 'MarineRegions:eez_boundaries'
                },
                url: 'http://geo.vliz.be/geoserver/MarineRegions/wms?',
                serverType: 'geoserver'
              })
            }),
            new ol.layer.Image({
              title: "Blocks",
              source: new ol.source.ImageWMS({
                url: 'http://www.openpetro.com/geoserver/mapstand/wms?',
                params: {
                  'LAYERS': 'mapstand:licenced_blocks'
                },
                serverType: 'geoserver'
              })
            }),
          ]
        })
      ],
      view: new ol.View({
        center: ol.proj.transform([4.40, 53.00], 'EPSG:4326', 'EPSG:3857'),
        // <!-- extent: [0, 8000000, 1000000, 6700000], -->
        zoom: 6
      })
    });
    applyInitialUIState();
    applyMargins();
  });