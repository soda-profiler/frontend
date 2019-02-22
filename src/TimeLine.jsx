
  
import React from "react";
import { Card, Icon } from 'semantic-ui-react'
import moment from 'moment'

import Timeline from 'react-visjs-timeline'
import { connect } from "react-redux"

import Project from "./services/project"
import User from "./services/user"
import Record from "./services/record"

const RecordCard = (props) => (
    <Card>
      <Card.Content header={props.data.func_name} />
      <Card.Content description={JSON.stringify(props.data)} />
      <Card.Content extra>
        <Icon name='user' />
      </Card.Content>
    </Card>
  )
  
  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
  );

class TimeLineChart extends React.Component {
    options = {
        width: '100%',
        height: '300px',
        stack: false,
        showMajorLabels: true,
        showCurrentTime: true,
        zoomMin: 1,
        tooltip: {
            followMouse: true
        },
        format: {
          minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
          }
        }
      }
    state = {
        items: [],
        groups: []
    }
    async componentDidMount(){
        let { records } = this.props.record


        console.log("Grouping records")
        const counts = records.map(item => item.function_name).reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
          
            return acc;
          }, {});
        
        const groups = records.map(item => item.function_name).filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
          }).map((function_name, i) => {
              const group = {}
              group['id'] = `${function_name} (${counts[function_name]})`
              return group
          })
        console.log(records)
        const items = records.map(data => {
        return {
            start: moment.unix(data.start_time).toDate(),
            end: moment.unix(data.end_time).toDate(),
            content: `${((data.end_time - data.start_time)*1000).toFixed(2)} ms`,
            group: `${data.function_name} (${counts[data.function_name]})`,
            type: 'box',
            title: `
            <div>
                <div>
                    <div class="header"> <h3> ${data.function_name} <h3/> </div>
                    <div class="meta"> Took ${(parseFloat(data.end_time - data.start_time)*1000).toFixed(2)} ms</div>
                    <div class="meta"> Received ${moment.unix(data.received_at).fromNow()}</div>
                    <div class="description">
                    <p></p>
                    <p></p>
                    </div>
                </div>
                <div class="extra content">
                    <i class="check icon"></i>
                   
                </div>
            </div>
            `  // `<div> <span>  ${data.function_name} </span> <br/> <span> ${data.type} </span> </div>`,
            }
        })
        console.log(items)
        this.setState({
            items,
            groups
        })
    }
    render() {
        console.log(this.state)

        return (
            <div>
                {
                this.state.items.length > 0 ? <Timeline
                    options={this.options}
                    groups={this.state.groups}
                    items={this.state.items} 
                />: "Loading"}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    form: state.form,
    project: state.project,
    record: state.record,
  })
  
  export default connect(mapStateToProps)(TimeLineChart)
  