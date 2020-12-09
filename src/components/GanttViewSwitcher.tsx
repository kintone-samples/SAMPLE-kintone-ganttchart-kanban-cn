import React from 'react'
import { ViewMode } from 'gantt-task-react'
import { Radio } from 'antd'
import 'antd/dist/antd.css'

type ViewSwitcherProps = {
  onViewModeChange: (viewMode: ViewMode) => void
}

export const ViewSwitcher: React.FunctionComponent<ViewSwitcherProps> = ({ onViewModeChange }) => {
  return (
    <>
      <Radio.Group defaultValue={ViewMode.Day} buttonStyle="solid" onChange={(e) => onViewModeChange(e.target.value)}>
        <Radio.Button value={ViewMode.QuarterDay}>{ViewMode.QuarterDay}</Radio.Button>
        <Radio.Button value={ViewMode.HalfDay}>{ViewMode.HalfDay}</Radio.Button>
        <Radio.Button value={ViewMode.Day}>{ViewMode.Day}</Radio.Button>
        <Radio.Button value={ViewMode.Week}>{ViewMode.Week}</Radio.Button>
        <Radio.Button value={ViewMode.Month}>{ViewMode.Month}</Radio.Button>
      </Radio.Group>
    </>
  )
}
