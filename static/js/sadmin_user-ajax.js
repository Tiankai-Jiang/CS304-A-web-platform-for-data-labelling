//== Class definition

var DatatableRemoteAjax1 = function () {
    //== Private functions

    var daterangepickerInit = function () {

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

        var datatable = $('#ajax_data1').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: 'http://155.138.154.142:5000/alladmin',
                        map: function (raw) {
                            // sample data mapping
                            //var temp = eval(raw);
                            var dataSet = raw;
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
                    field: 'adminname',
                    title: 'Admins\' name',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    // width: 100,
                    // basic templating support for column rendering,
                    //template: '{{source_id}} - {{source_name}}',
                }, {
                    field: 'admin_email',
                    title: 'Email',
                    // width: 150,
                },
                // {
                //     field: 'publisher',
                //     title: 'Uploader',
                // },
                // {
                //     field: 'publish_date',
                //     title: 'Register Time',
                //     type: 'date',
                //     template: function (row) {
                //         var date = new Date(row.publish_date * 1000);//如果date为13位不需要乘1000
                //         var Y = date.getFullYear() + '-';
                //         var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                //         var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                //         var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                //         var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                //         var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                //         return Y + M + D + h + m + s;
                //
                //     },
                // },
                {
                    field: 'nb_source',
                    title: 'Task Count',
                }
                , {
                    field: 'nb_task',
                    title: 'Total Problem',
                }
                // ,
                // {
                //     field: 'priority',
                //     title: 'Priority',
                //     // callback function support for column rendering
                //     template: function (row) {
                //         var status = {
                //             1: {'title': 'III.Low', 'state': 'success'},
                //             2: {'title': 'II.Normal', 'state': 'warning'},
                //             3: {'title': 'I.High', 'state': 'danger'},
                //         };
                //         return '<span class="m-badge m-badge--' + status[row.priority].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.priority].state + '">' + status[row.priority].title + '</span>';
                //     },
                // }, {
                //     field: 'num_finished',
                //     title: 'Status',
                //     // callback function support for column rendering
                //     template: function (row) {
                //         var status = {
                //             1: {'title': 'Done', 'class': 'm-badge--brand'},
                //             2: {'title': 'Labeling', 'class': ' m-badge--metal'},
                //             0: {'title': 'New', 'class': ' m-badge--primary'},
                //         };
                //         var finish = row.num_finished / row.number;
                //         if (finish < 1 && finish > 0) {
                //             return '<span class="m-badge ' + status[2].class +
                //                 ' m-badge--wide">' + status[2].title + '</span>';
                //         }
                //         return '<span class="m-badge ' + status[finish].class +
                //             ' m-badge--wide">' + status[finish].title + '</span>';
                //     },
                // }, {
                //     field: 'per_finished',
                //     title: 'Percentage',
                //     template: function (row) {
                //         var finish = row.per_finished;
                //         finish = (finish * 100).toFixed(2);
                //         return finish + '%';
                //     },
                // }
            ],
        });

        $('#m_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#m_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

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

var DatatableRemoteAjax2 = function () {
    //== Private functions
    // basic demo
    var demo = function () {

        var datatable = $('#ajax_data2').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: 'http://155.138.154.142:5000/alluser',
                        map: function (raw) {
                            // sample data mapping
                            //var temp = eval(raw);
                            var dataSet2 = raw;
                            // if (typeof raw.message !== 'undefined') {
                            //   dataSet = raw.message[tasks];
                            // }
                            return dataSet2;
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
                input: $('#generalSearch2'),
            },

            // columns definition
            columns: [
                {
                    field: 'user_name',
                    title: 'Username',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    // width: 150,
                    // basic templating support for column rendering,
                    //template: '{{source_id}} - {{source_name}}',
                },
                // {
                //     field: 'source_name',
                //     title: 'Register_time',
                //     width: 200,
                // },
                // {
                //     field: 'publisher',
                //     title: 'Uploader',
                // },
                {
                    field: 'user_email',
                    title: 'Email',
                    // width: 150,
                },
                {
                    field: 'signin_date',
                    title: 'Register Time',
                    // width: 150,
                    template: function (row) {
                        var date = new Date(row.signin_date * 1000);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                        return Y + M + D + h + m + s;
                    },
                }, {
                    field: 'nb_answer',
                    title: 'Finished',
                    width: 100,
                }
                , {
                    field: 'acc',
                    title: 'Accuracy',
                    width: 100,
                    template: function (row) {
                        if (row.nb_answer == 0) {
                            return "0%";
                        }
                        return ((row.acc / row.nb_answer) * 100).toFixed(2) + "%";
                    },
                }, {
                    field: 'user_credit',
                    title: 'Credits',
                    width: 100,
                }
                // ,
                // {
                //     field: 'priority',
                //     title: 'Priority',
                //     // callback function support for column rendering
                //     template: function (row) {
                //         var status = {
                //             1: {'title': 'III.Low', 'state': 'success'},
                //             2: {'title': 'II.Normal', 'state': 'warning'},
                //             3: {'title': 'I.High', 'state': 'danger'},
                //         };
                //         return '<span class="m-badge m-badge--' + status[row.priority].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.priority].state + '">' + status[row.priority].title + '</span>';
                //     },
                // }, {
                //     field: 'num_finished',
                //     title: 'Status',
                //     // callback function support for column rendering
                //     template: function (row) {
                //         var status = {
                //             1: {'title': 'Done', 'class': 'm-badge--brand'},
                //             2: {'title': 'Labeling', 'class': ' m-badge--metal'},
                //             0: {'title': 'New', 'class': ' m-badge--primary'},
                //         };
                //         var finish = row.num_finished / row.number;
                //         if (finish < 1 && finish > 0) {
                //             return '<span class="m-badge ' + status[2].class +
                //                 ' m-badge--wide">' + status[2].title + '</span>';
                //         }
                //         return '<span class="m-badge ' + status[finish].class +
                //             ' m-badge--wide">' + status[finish].title + '</span>';
                //     },
                // }, {
                //     field: 'per_finished',
                //     title: 'Percentage',
                //     template: function (row) {
                //         var finish = row.per_finished;
                //         finish = (finish * 100).toFixed(2);
                //         return finish + '%';
                //     },
                // }
            ],
        });

        $('#m_form_status2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#m_form_type2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#m_form_status2, #m_form_type2').selectpicker();

    };

    return {
        // public functions
        init: function () {
            demo();
        },
    };
}();

var NewAdminReg = function () {

    var login = $('#m_login');

    var showErrorMsg = function (form, type, msg) {
        var alert = $('<div class="m-alert m-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        alert.animateClass('fadeIn animated');
        alert.find('span').html(msg);
    }

    var AdminRegs = function () {
        $('#submitReg').click(function (e) {
            e.preventDefault();
            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {

                    username: {
                        required: true,
                    },

                    email: {
                        required: true,
                        email: true
                    },

                    password: {
                        required: true
                    },

                    rpassword: {
                        required: true
                    },

                    agree: {
                        required: true
                    }

                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            var uMail = document.getElementById("u_email").value;

            var uName = document.getElementById("u_name").value;

            var uPd = document.getElementById("u_password").value;

            form.ajaxSubmit({
                type: "GET",
                url: "http://155.138.154.142:5000/register/admin_email/" + uMail + "/adminname/" + uName + "/password/" + uPd,
                success: function (json) {
                    if (json.code == 0) {
                        setTimeout(function () {
                            swal({
                                title: "Success!",
                                text: "You have successfully created an administrator",
                                type: "success"
                            }).then(function () {
                                window.location.reload();
                            })
                            ;
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            swal({
                                title: "Error!",
                                text: json.message,
                                type: "error"
                            }).then(function () {
                                var signInForm = login.find('#mainForm');
                                signInForm.clearForm();
                                signInForm.validate().resetForm();
                            });
                        }, 1000);
                    }
                }
            });
        });
    }

    return {
        init: function () {
            AdminRegs();
        },
    };
}();

jQuery(document).ready(function () {
    NewAdminReg.init();
    DatatableRemoteAjax1.init();
    DatatableRemoteAjax2.init();
});
