import moment from "moment";
import { NewRequestModel, RequestListModel, ResponsesModal, ResultModal } from "./RequestType.api";
import { CHART_TYPE, MONTHS } from "./type";
import utility from "./utility";

class Api {
    post = (url: any, param: any) => {
        var result = this.mockupAPI(param)
        return new Promise(function (resolve, reject) {
            resolve(result)
            // reject({});
            // fetch(url, {
            //     method: "POST",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //     },
            //     body: JSON.stringify(param)
            // }).then(function (response) {
            //     if (response.status == 200) {
            //         return response.json();
            //     } else if (response.status == 404) {
            //         return { statusCode: 404 };
            //     } else {
            //         return {}
            //     }
            // }).then(function (response) {
            //     resolve(response);
            // }).catch(err => {
            //     reject({});
            // });
        });
    }
    private _mockupAPI = (param: RequestListModel) => {
        const result = new ResultModal()
        let finalData: ResponsesModal[] = []
        result.success = true
        param.requests.forEach((value: NewRequestModel, index: number, array: NewRequestModel[]) => {
            let response = new ResponsesModal();

            response.date_ranges = value.date_ranges;
            response.metrics = value.metrics;
            response.labels = [];
            result.data = { responses: [] }
            response.datasets = []
            response.datasets[0] = { data: [], label: "" }
            // response.datasets;
            // result.data?.responses 
            if (value.metrics == CHART_TYPE.PROFIT || value.metrics == CHART_TYPE.USER_ACQUISITION) {
                var a = moment(value.date_ranges?.[0].start_date);
                var b = moment(value.date_ranges?.[0].end_date);
                let start = moment().clone().startOf('year').format('YYYY-MM-DD');
                let end = moment().clone().endOf('year').format('YYYY-MM-DD');
                const min = 300;
                const max = 1000;
                console.log(start)
                if (start == value.date_ranges?.[0].start_date && end == value.date_ranges?.[0].end_date) {
                    response.labels = MONTHS;

                    for (let index = 0; index < 12; index++) {
                        let rand = Math.floor(Math.random() * (max - min + 1) + min);
                        response.datasets[0].data.push(rand);
                    }
                } else {
                    let toltalDays = b.diff(a, 'days');
                    console.log(toltalDays,"daysss")

                    for (let index = 1; index <= toltalDays + 1; index++) {
                        // a.add(index, 'days').format('YYYY-MM-DD')
                        let rand = Math.floor(Math.random() * (max - min + 1) + min);
                        response.labels.push(utility.ordinal_suffix_of(index));
                        response.datasets[0].data.push(rand);
                        // response.labels.push()
                    }
                }


            }
            if (value.metrics == CHART_TYPE.DATA_USAGE) {
                const min = 300;
                const max = 1000;
                response.labels.push('User profile');
                response.labels.push('Credit score');
                response.labels.push('Payment info');
                response.labels.push('Shopping history');
                const rand1 = Math.floor(Math.random() * (max - min + 1) + min);
                const rand2 = Math.floor(Math.random() * (max - min + 1) + min);
                const rand3 = Math.floor(Math.random() * (max - min + 1) + min);
                const rand4 = Math.floor(Math.random() * (max - min + 1) + min);
                response.datasets?.[0].data.push(rand4);
                response.datasets?.[0].data.push(rand1);
                response.datasets?.[0].data.push(rand2);
                response.datasets?.[0].data.push(rand3);

            }
            finalData.push(response)
            // if (value.metrics == CHART_TYPE.USER_ACQUISITION) {
            //     response.labels.push('New users acquired')
            // }
        });
        // result.data = { responses: responses] }
        result.data.responses = finalData
        return result;
    }
    public get mockupAPI() {
        return this._mockupAPI;
    }
    // public set mockupAPI(value) {
    //     this._mockupAPI = value;
    // }
    postRequest = (body: RequestListModel) => {
        const url = `xxx`
        return this.post(url, body)
    }

}
const api = new Api()
export default api