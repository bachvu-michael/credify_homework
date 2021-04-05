export class NewRequestModel {
    date_ranges: [{
        start_date: any
        end_date: any
    }] | undefined
    metrics: string = ""
}
export class RequestListModel {
    requests: NewRequestModel[] = []
}

export class ResultModal {
    success: any
    data: {
        responses: ResponsesModal[]
    } | any
}
export class ResponsesModal {
    date_ranges: [{
        start_date: any
        end_date: any
    }] | undefined
    metrics: string = ""
    labels: any
    datasets: any
}
