import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Radio } from 'antd'
import GanttCharts from './GanttCharts'
import 'antd/dist/antd.css'
import Kanban from './Kanban'

// eslint-disable-next-line no-shadow
export enum AppType {
  Gantt = 'Gantt',
  Board = 'Kanban',
}

export const AppSwitcher = () => {
  const onAppChange = (app: AppType) => {
    switch (app) {
      case AppType.Gantt:
        ReactDOM.render(
          <GanttCharts query={kintone.app.getQueryCondition() || undefined} />,
          kintone.app.getHeaderSpaceElement(),
        )
        break
      default:
        ReactDOM.render(<Kanban />, kintone.app.getHeaderSpaceElement())
    }
  }

  useEffect(() => {
    ReactDOM.render(<Kanban />, kintone.app.getHeaderSpaceElement())
  }, [])

  return (
    <>
      <Radio.Group
        defaultValue={AppType.Board}
        buttonStyle="solid"
        size="large"
        onChange={(e) => onAppChange(e.target.value)}
      >
        <Radio.Button value={AppType.Gantt}>{AppType.Gantt}</Radio.Button>
        <Radio.Button value={AppType.Board}>{AppType.Board}</Radio.Button>
      </Radio.Group>
    </>
  )
}
