angular
    .module('wpReports')
    .controller('ReportsCtrl', ReportsCtrl);

function ReportsCtrl($uibModal) {
    var self = this;
    self.openReviewModal = openReviewModal;
    self.openScheduleModal = openScheduleModal;

    self.dateRange = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };

    self.opts = {
        // locale: {
        //     applyClass: 'btn-green',
        //     applyLabel: "Apply",
        //     fromLabel: "From",
        //     format: "YYYY-MM-DD",
        //     toLabel: "To",
        //     cancelLabel: 'Cancel',
        //     customRangeLabel: 'Custom range'
        // },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    };

    function openReviewModal(uibModal) {


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'reviewEmailModal.html'
        });

    }

    function openScheduleModal(uibModal) {
        var modalInstance = $uibModal.open({
            animation: true,
            controller: "ScheduleModalCtrl as scheduleModalCtrl",
            templateUrl: 'setScheduleModal.html',
            size: 'custom-size'
        });
    }

}

angular
    .module('wpReports')
    .controller('ScheduleModalCtrl', function($uibModalInstance) {
        self = this;

        self.dayNumbers = _.range(1, 32);

    });
