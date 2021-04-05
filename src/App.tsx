import React, { Component } from "react";
import images from './image'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShapePieChart from "./component/ShapePieChart";
import AreaChartComponent from "./component/AreaChart";
import Select from 'react-select'
import api from "./service/api";
import { NewRequestModel, RequestListModel, ResultModal } from "./service/RequestType.api";
import { CHART_TYPE, FILTER_TYPE } from "./service/type";
import moment from 'moment'
import utility from "./service/utility";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

const options = [
  { value: FILTER_TYPE.THIS_YEAR, label: 'This year analytics' },
  { value: FILTER_TYPE.THIS_MONTH, label: 'This month analytics' },
]

class App extends Component {
  state = {
    selectFilter: options[0],
    totalProfit: 0,
    totalUser: 0,
    totalDataUsage: 0,
    dataAreaChart: [],
    dataPieChart: [],
  }
  isSelectChange = (option: any) => {
    this.setState({ selectFilter: option })
    let data = this._mockupDataForFilter(FILTER_TYPE.THIS_YEAR)
    this.setState({ dataAreaChart: [], dataPieChart: [] })
    if (option.value == FILTER_TYPE.THIS_YEAR) {
      data = this._mockupDataForFilter(FILTER_TYPE.THIS_YEAR)
      // this.setState({ dataAreaChart: b })
    }
    if (option.value == FILTER_TYPE.THIS_MONTH) {
      data = this._mockupDataForFilter(FILTER_TYPE.THIS_MONTH)
      // this.setState({ dataAreaChart: a })
    }
    this.updateData(data)


  }
  private _mockupDataForFilter = (type: FILTER_TYPE) => {
    let start = moment().clone().startOf('year').format('YYYY-MM-DD')
    let end = moment().clone().endOf('year').format('YYYY-MM-DD')
    if (type == FILTER_TYPE.THIS_YEAR) {
      start = moment().clone().startOf('year').format('YYYY-MM-DD')
      end = moment().clone().endOf('year').format('YYYY-MM-DD')
    }
    if (type == FILTER_TYPE.THIS_MONTH) {
      start = moment().clone().startOf('month').format('YYYY-MM-DD')
      end = moment().clone().endOf('month').format('YYYY-MM-DD')
    }
    let dataSubmit1 = new NewRequestModel()
    dataSubmit1.date_ranges = [{ start_date: start, end_date: end }]
    dataSubmit1.metrics = CHART_TYPE.PROFIT
    let dataSubmit2 = new NewRequestModel()
    dataSubmit2.date_ranges = [{ start_date: start, end_date: end }]
    dataSubmit2.metrics = CHART_TYPE.DATA_USAGE
    let dataSubmit3 = new NewRequestModel()
    dataSubmit3.date_ranges = [{ start_date: start, end_date: end }]
    dataSubmit3.metrics = CHART_TYPE.USER_ACQUISITION

    const listRequest = new RequestListModel
    listRequest.requests.push(dataSubmit1)
    listRequest.requests.push(dataSubmit2)
    listRequest.requests.push(dataSubmit3)
    return listRequest
  }
  updateData = async (data: any) => {
    await api.postRequest(data).then((rs) => {
      let result: any = rs
      let data: any[] = result.data.responses
      // const dataAreaChart = []
      // const dataAreaChart = [
      //   {
      //     "name": "Page A",
      //     "uv": 4000,
      //     "pv": 2400,
      //   },
      // ]
      const { dataAreaChart } = this.state

      data.forEach((value: any, index: number, array: any[]) => {
        let dataArr = value.datasets[0].data
        if (value.metrics == CHART_TYPE.PROFIT) {
          this.setState({ totalProfit: dataArr.reduce((a: any, v: any) => a = a + v, 0) })
          let arr: any = []
          value.labels.forEach((value: any, index: number) => {
            arr = utility.merge_area_data_chart(dataAreaChart, value, 'profit', dataArr[index])
          })
          this.setState({ dataAreaChart: arr }, () => { })
        }
        if (value.metrics == CHART_TYPE.DATA_USAGE) {
          // const { dataPieChart } = this.state

          let total = dataArr.reduce((a: any, v: any) => a = a + v, 0)
          this.setState({ totalDataUsage: total })
          let arr: any = []
          value.labels.forEach((value: any, index: number) => {
            let percent = Math.ceil(dataArr[index] / total * 100)
            let ob = { name: value, value: percent, tableValue: dataArr[index] }
            arr.push(ob)
          })
          this.setState({ dataPieChart: arr })
          console.log(arr, total, dataArr)
          // this.setState({ dataAreaChart: arr })
          // console.log("lastDB", value)
          // const dataPieChart = [
          //   { name: 'Group A', value: 75 },
          //   { name: 'Group B', value: 15 },
          //   { name: 'Group C', value: 10 },
          //   { name: 'Group D', value: 10 },
          // ];

        }
        if (value.metrics == CHART_TYPE.USER_ACQUISITION) {
          this.setState({ totalUser: dataArr.reduce((a: any, v: any) => a = a + v, 0) })
          let arr: any = []
          value.labels.forEach((value: any, index: number) => {
            arr = utility.merge_area_data_chart(dataAreaChart, value, 'user', dataArr[index])
          })
          this.setState({ dataAreaChart: arr })
        }
      })
    }).then(() => {
      // this.setState({ dataAreaChart: [] })
      console.log(this.state.dataAreaChart)
    })
  }
  renderTooltip = (props: any) => {
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
      </Popover>
    )
  }
  componentDidMount() {
    const data = this._mockupDataForFilter(FILTER_TYPE.THIS_YEAR)
    this.updateData(data)
  }
  // renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // )
  render() {
    // const dataAreaChart = [
    //   {
    //     "name": "Page A",
    //     "profit": 200,
    //     "user": 200,
    //   },
    //   {
    //     "name": "Page A",
    //     "profit": 300,
    //     "user": 400,
    //   },
    // ]
    // console.log(dataAreaChart)
    // const dataPieChart = [
    //   { name: 'Group A', value: 75 },
    //   { name: 'Group B', value: 15 },
    //   { name: 'Group C', value: 10 },
    //   { name: 'Group D', value: 10 },
    // ];

    return (
      <div className="wapper-body">
        <div className="body">
          <div className="left-bar-menu">
            <a href="#" className="logo">
              <img src={images.logo.default} className="" alt="logo" />
            </a>
            <ul>
              <li>
                <a href="#" className="active">
                  <img src={images.home.default} alt="" />
                  <span>Overview</span>
                </a>
              </li>
              <li>
                <a href="#"><img src={images.offers.default} alt="" /><span>Offers</span></a>
              </li>
              <li>
                <a href="#"><img src={images.invoice.default} alt="" /><span>Invoice</span></a>
              </li>
              <li>
                <a href="#"><img src={images.setting.default} alt="" /><span>Settings</span></a>
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="title-content">
              <h1>Overview</h1>
              <div style={{ width: 200 }}>
                <Select
                  options={options}
                  onChange={this.isSelectChange}
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={options[0]}
                  isSearchable={false}
                // className="basic-single"
                // classNamePrefix="select"
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // name="color"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-7">


                <div className="card">
                  <div className="header-card">
                    <h4 className="title-card">Organization earning</h4>
                    <a href="#" className="action-top-card">
                      <img src={images.setting_card.default} alt="" />
                    </a>
                  </div>
                  <div className="body-card">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="info-card purple" >
                          <div className="info-num">$ {this.state.totalProfit.toLocaleString()}</div>
                          {
                            this.state.selectFilter.value == FILTER_TYPE.THIS_YEAR &&
                            <div className="info-des">This year’s earnings</div>
                          }
                          {
                            this.state.selectFilter.value == FILTER_TYPE.THIS_MONTH &&
                            <div className="info-des">This month’s earnings</div>
                          }

                          <div className="info-icon">
                            <img src={images.icon_card_1.default} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="info-card blue">
                          <div className="info-num">{this.state.totalUser.toLocaleString()}</div>
                          <div className="info-des">New users acquired</div>
                          <div className="info-icon">
                            <img src={images.icon_card_2.default} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        {
                          this.state.dataAreaChart && this.state.dataAreaChart.length &&
                          <AreaChartComponent
                            data={this.state.dataAreaChart}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="card">
                  <div className="header-card">
                    <h4 className="title-card">Organization earning</h4>
                    <a href="#" className="action-top-card">
                      <img src={images.setting_card.default} alt="" />
                    </a>
                  </div>
                  <div className="body-card">
                    <div className="row">
                      <div className="col-xl-7">
                        <div className="info-card red">
                          <div className="info-num">{this.state.totalDataUsage.toLocaleString()}</div>
                          <div className="info-des">Conversions</div>
                          <div className="info-icon">
                            <img src={images.icon_card_3.default} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <ShapePieChart
                          data={this.state.dataPieChart}
                        />
                      </div>
                      <div className="col-xl-12">
                        <table className="table-dashboard">
                          <thead>
                            <tr>
                              <th scope="col">Data</th>
                              <th scope="col">Conversions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.dataPieChart.length && this.state.dataPieChart.map((e: any, i, arr) => {
                                return (
                                  <tr>
                                    <td>{e.name}</td>
                                    <td>{e.tableValue}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                        <div className="next-prev">
                          <a href="#"><img src={images.arrow_left.default} alt="" /></a>
                          <a href="#"><img src={images.arrow_right.default} alt="" /></a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default App;
