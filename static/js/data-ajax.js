//== Class definition

var DatatableRemoteAjaxDemo = function () {
    //== Private functions

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
                            var dataSet = raw.message.tasks;
                            return dataSet;
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
                    // basic templating support for column rendering,
                    //template: '{{source_id}} - {{source_name}}',
                }, {
                    field: 'source_name',
                    title: 'Data Name',
                    width: 200,
                }, {
                    field: 'publisher',
                    title: 'Uploader',
                }, {
                    field: 'publish_date',
                    title: 'Upload Time',
                    type: 'date',
                    width: 200,
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
                    width: 100,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {'title': 'Low', 'state': 'success'},
                            2: {'title': 'Normal', 'state': 'warning'},
                            3: {'title': 'High', 'state': 'danger'},
                        };
                        return '<span class="m-badge m-badge--' + status[row.priority].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.priority].state + '">' + status[row.priority].title + '</span>';
                    },
                }, {
                    field: 'num_finished',
                    title: 'Status',
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
                    template: function (row) {
                        var finish = row.per_finished;
                        finish = (finish * 100).toFixed(2);
                        return finish + '%';
                    },
                }, {
                    field: 'Actions',
                    width: 50,
                    title: 'Label',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        if (row.per_finished != 1){
                            return '<div>\
						<a href="/choose/'+row.source_name+'" class="m-portlet__nav-link btn m-btn m-btn--hover-info\
						 m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details"><i class="la la-edit"></i>\
						</a></div>';
                        }
                    },
                }],
        });

        $('#m_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#m_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#m_form_status, #m_form_type').selectpicker();

    };

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
