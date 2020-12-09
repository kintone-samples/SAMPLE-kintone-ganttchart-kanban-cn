import React, { useEffect } from 'react'
import 'gantt-task-react/dist/index.css'
import { Task, ViewMode, Gantt } from 'gantt-task-react'
import { ViewSwitcher } from './GanttViewSwitcher'
import { AppRecord, getRecords, updateDate } from '../KintoneAppRepository'
import { Spin, Result } from 'antd'
import './app.css'

const GanttCharts = ({ query = '' }) => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day)
  const [tasks, setTasks] = React.useState<Task[]>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  let columnWidth = 60
  if (view === ViewMode.Month) {
    columnWidth = 300
  } else if (view === ViewMode.Week) {
    columnWidth = 250
  }

  const onTaskChange = (task: Task) => {
    const start = new Date(task.start.getTime() - task.start.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0]
    const end = new Date(task.end.getTime() - task.end.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
    updateDate(task.id, start, end)
  }

  const onDblClick = (task: Task) => {
    const url =
      window.location.protocol + '//' + window.location.host + window.location.pathname + 'show#record=' + task.id
    window.location.assign(url.replaceAll('showshow', 'show'))
  }

  useEffect(() => {
    getRecords(display, query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const display = (records: AppRecord[], status: Map<string, number>, type: Map<string, string>) => {
    if (records.length === 0) {
      setLoading(false)
    } else {
      setTasks(
        records.map<Task>((record) => {
          return {
            id: record.$id.value,
            name: record.summary.value,
            start: new Date(record.startDate.value! + 'T00:00:00.000+08:00'),
            end: new Date(record.endDate.value! + 'T23:59:59.000+08:00'),
            progress: Math.ceil(((status.get(record.status.value!) || 0) * 100) / Math.max(status.size - 1, 1)),
            styles: { progressColor: type.get(record.type.value!) || '#ff9e0d', progressSelectedColor: '#ff9e0d' },
            dependencies: record.parent.value ? [record.parent.value] : [],
            // isDisabled: true,
          }
        }),
      )
    }
  }

  let content
  if (tasks && tasks.length > 0) {
    content = (
      <div>
        <ViewSwitcher onViewModeChange={(viewMode) => setView(viewMode)} />
        <Gantt
          tasks={tasks}
          viewMode={view}
          onDateChange={onTaskChange}
          // onTaskDelete={onTaskDelete}
          // onProgressChange={onProgressChange}
          onDoubleClick={onDblClick}
          // onSelect={onSelect}
          listCellWidth="155px"
          // ganttHeight={300}
          columnWidth={columnWidth}
          todayColor="#FCFF19"
        />
      </div>
    )
  } else if (isLoading) {
    content = (
      <div className="center">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  } else {
    content = <Result title="No data" />
  }

  return <>{content}</>
}

export default GanttCharts
