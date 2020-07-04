//== Class definition

var DatatableRemoteAjaxDemo = function () {
    //== Private functions

    var daterangepickerInit = function () {

        if ($('#m_dashboard_daterangepicker').length == 0) {
            return;
        }

        var picker = $('#m_dashboard_daterangepicker');
        var start = moment();
        var end = moment();

        function cb(start, end, label) {
            var title = '';
            var range = '';

            if ((end - start) < 100) {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('.m-subheader__daterange-date').html(range);
            picker.find('.m-subheader__daterange-title').html(title);
        }

        picker.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            ranges: {
                'Today': [moment(), moment()],
                // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                // 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                // 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                // 'This Month': [moment().startOf('month'), moment().endOf('month')],
                // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }

    // basic demo
    var demo = function () {

        var datatable = $('.m_datatable').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: 'http://155.138.154.142:5000/task',
                        map: function (raw) {
                            // sample data mapping
                            //var temp = eval(raw);
                            var dataSet = raw.message.tasks;
                            // if (typeof raw.message !== 'undefined') {
                            //   dataSet = raw.message[tasks];
                            // }
                            return dataSet;
                            //return '{[{"description": "this is a test project","if_finished": 0,"number": 0,"priority": 1,"publish_date": 1527402240.0,"publisher": 1,"source_id": 11,"source_name": "test_proj"},{"description": "test_desc","if_finished": 0,"number": 1,"priority": 1,"publish_date": 1527409408.0,"publisher": 2,"source_id": 12,"source_name": "test"},{"description": "xiedn single option project","if_finished": 0,"number": 11,"priority": 2,"publish_date": 1527928320.0,"publisher": 1,"source_id": 13,"source_name": "xiednproj"}]}';
                        },
                    },
                },
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false
            },

            // column sorting
            sortable: true,

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100],
                    },
                },
            },

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [
                {
                    field: 'source_id',
                    title: 'Task ID',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 100,
                    textAlign: 'center',
                    // basic templating support for column rendering,
                    //template: '{{source_id}} - {{source_name}}',
                }, {
                    field: 'source_name',
                    title: 'Data Name',
                    width: 200,
                    textAlign: 'center',
                }, {
                    field: 'publisher',
                    title: 'Uploader',
                }, {
                    field: 'publish_date',
                    title: 'Upload Time',
                    type: 'date',
                    textAlign: 'center',
                    template: function (row) {
                        var date = new Date(row.publish_date * 1000);//如果date为13位不需要乘1000
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                        return Y + M + D + h + m + s;

                    },
                }, {
                    field: 'priority',
                    title: 'Priority',
                    textAlign: 'center',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {'state': 'success'},
                            2: {'state': 'warning'},
                            3: {'state': 'danger'},
                        };
                        return '<span class="m-badge m-badge--' + status[row.priority].state + ' badge--dot"></span>';
                    },
                }, {
                    field: 'fault_level',
                    title: 'Fault level',
                    textAlign: 'center',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            0: {'title': 'None', 'state': 'success'},
                            1: {'title': 'Low', 'state': 'warning'},
                            2: {'title': 'High', 'state': 'danger'},
                        };
                        return '<span class="m--font-bold m--font-' + status[row.fault_level].state + '">' + status[row.fault_level].title + '</span>';
                    },
                }, {
                    field: 'num_finished',
                    title: 'Status',
                    textAlign: 'center',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {'title': 'Done', 'class': 'm-badge--brand'},
                            2: {'title': 'Labeling', 'class': ' m-badge--metal'},
                            0: {'title': 'New', 'class': ' m-badge--primary'},
                        };
                        var finish = row.num_finished / row.number;
                        if (finish < 1 && finish > 0) {
                            return '<span class="m-badge ' + status[2].class +
                                ' m-badge--wide">' + status[2].title + '</span>';
                        }
                        if (finish == 0) {
                            return '<span class="m-badge ' + status[0].class +
                                ' m-badge--wide">' + status[0].title + '</span>';
                        }
                        if (finish == 1) {
                            return '<span class="m-badge ' + status[1].class +
                                ' m-badge--wide">' + status[1].title + '</span>';
                        }

                    },
                }, {
                    field: 'per_finished',
                    title: 'Percentage',
                    textAlign: 'center',
                    template: function (row) {
                        var finish = row.per_finished;
                        finish = (finish * 100).toFixed(2);
                        return finish + '%';
                    },
                }, {
                    field: 'Actions',
                    width: 75,
                    title: 'Download',
                    sortable: false,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        return '<div>\
						<a href="/download/' + row.source_name + '.zip" class="m-portlet__nav-link btn m-btn m-btn--hover-info\
						 m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details"><i class="flaticon-download"></i>\
						</a></div>';
                    },
                }],
        });

        var query = datatable.getDataSourceQuery();

        $('#m_form_status').on('change', function () {
            // shortcode to datatable.getDataSourceParam('query');
            var query = datatable.getDataSourceQuery();
            query.priority = $(this).val().toLowerCase();
            // shortcode to datatable.setDataSourceParam('query', query);
            datatable.setDataSourceQuery(query);
            datatable.load();
        }).val(typeof query.priority !== 'undefined' ? query.priority : '');

        $('#m_form_type').on('change', function () {
            // shortcode to datatable.getDataSourceParam('query');
            var query = datatable.getDataSourceQuery();
            query.fault_level = $(this).val().toLowerCase();
            // shortcode to datatable.setDataSourceParam('query', query);
            datatable.setDataSourceQuery(query);
            datatable.load();
        }).val(typeof query.fault_level !== 'undefined' ? query.fault_level : '');

        $('#m_form_status, #m_form_type').selectpicker();

    };

    return {
        // public functions
        init: function () {
            daterangepickerInit();
            demo();
        },
    };
}();

jQuery(document).ready(function () {
    DatatableRemoteAjaxDemo.init();
});
