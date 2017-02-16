// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['vendor/jquery/charts/flot/jquery.flot.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['vendor/jquery/nestable/jquery.nestable.js',
                          'vendor/jquery/nestable/nestable.css'],
      filestyle:      ['vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['vendor/jquery/slider/bootstrap-slider.js',
                          'vendor/jquery/slider/slider.css'],
      chosen:         ['vendor/jquery/chosen/chosen.jquery.min.js',
                          'vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['vendor/jquery/datatables/jquery.dataTables.min.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
                          'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['vendor/jquery/footable/footable.all.min.js',
                          'vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      '/node_modules/ng-grid/ng-grid-2.0.1.min.js',
                      '/node_modules/ng-grid/ng-grid.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      '/node_modules/angular-ui-select/select.min.js',
                      '/node_modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    '/node_modules/angular-file-upload/dist/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['/node_modules/angular-ui-calendar/src/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      '/node_modules/ng-img-crop/compile/minified/ng-img-crop.js',
                      '/node_modules/ng-img-crop/compile/minified/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      '/node_modules/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                      '/node_modules/angular-bootstrap-nav-tree/dist/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      '/node_modules/angularjs-toaster/toaster.min.js',
                      '/node_modules/angularjs-toaster/toaster.min.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      '/node_modules/textangular/dist/textAngular-sanitize.min.js',
                      '/node_modules/textangular/dist/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      '/node_modules/angular-slider/slider.js',
                      '/node_modules/angular-slider/slider.css'
                  ]
              }
          ]
      });
  }])
;