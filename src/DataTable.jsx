import React from "react"
import { render } from "react-dom"
import _ from "lodash"
// Import React Table
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from "react-redux"
import Project from "./services/project"
import User from "./services/user"
import Record from "./services/record"

import moment from 'moment'


class DataTable extends React.Component {
  constructor() {
    super()
    this.state = {
      records: [],
      numberOfPages: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this)
  }


  async fetchData(state, instance) {
    this.setState({ loading: true })

    const { currentProject } = this.props.project;
    if(currentProject) {
      const { records} = this.props.record
      const numberOfPages  = 1;
      this.setState({
            records,
            numberOfPages,
            loading: false
          })
    }
 
  }

  render() {
    const { numberOfPages, loading, records } = this.state
    
    return (
      <div>
        <ReactTable
          columns={[
            
              {
              Header: "Received at",
              id: "received_at",
              accessor: d => moment.unix(d.received_at).fromNow()

            },{
                Header: "Function Name",
                accessor: "function_name"
              },
              {
                Header: "Time Elapsed",
                id: "elapsed",
                accessor: d => `${(d.end_time - d.start_time)*1000} ms`

              },
            {
                Header: "Start Time",
                id: "start_time",
                accessor: d => moment.unix(d.start_time).format()

              },{
                Header: "End Time",
                id: "end_time",
                accessor: d => moment.unix(d.end_time).format()
              },
            {
              Header: "Arguments",
              id: "arguments",
              accessor: d => JSON.stringify(d.arguments)
            },
            {
              Header: "Called With",
              id: "call_params",
              accessor: d => JSON.stringify(d.call_params)
            },
            {
                Header: "Type",
                accessor: "type"
              },
          ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={records}
          numberOfPages={numberOfPages} // Display the total number of numberOfPages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          defaultPageSize={5}
          getTrProps={(state, rowInfo, column) => {
            return {
              style: {
                background: "white",
                border: null
              }
            }
          }}
          getProps={(state, rowInfo, column) => {
            return {
              style: {
                background: "white",
                fontSize: 12,
                border: 0,
              }
            }
          }}
        />
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  form: state.form,
  project: state.project,
  record: state.record,
})

export default connect(mapStateToProps)(DataTable)
