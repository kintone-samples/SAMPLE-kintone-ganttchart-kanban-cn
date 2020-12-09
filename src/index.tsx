import React from 'react'
import ReactDOM from 'react-dom'
import { AppSwitcher } from './components/App'
import GanttCharts from './components/GanttCharts'
import AddSub from './components/AddSub'

interface KintoneEvent {
  record: kintone.types.SavedFields
}

kintone.events.on('app.record.index.show', (event: KintoneEvent) => {
  ReactDOM.render(<AppSwitcher />, kintone.app.getHeaderMenuSpaceElement())
  return event
})

kintone.events.on('app.record.detail.show', (event: KintoneEvent) => {
  let query = `parent = ${event.record.$id.value} or $id= ${event.record.$id.value}`
  event.record.parent.value && (query += ` or $id = ${event.record.parent.value}`)
  ReactDOM.render(<GanttCharts query={query} />, kintone.app.record.getHeaderMenuSpaceElement())
  ReactDOM.render(<AddSub id={event.record.$id.value} />, kintone.app.record.getSpaceElement('addSub'))
  return event
})

kintone.events.on('app.record.create.show', (event: KintoneEvent) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const pid = urlParams.get('pid')
  if (pid) {
    event.record.parent.value = pid
  }
  return event
})
