import React, { useEffect } from 'react'
import Board from 'react-trello'
import { getRecords, updateStatus } from '../KintoneAppRepository'
import AntdCard from './Card'
import { Spin, Result } from 'antd'
import './app.css'

const Kanban = () => {
  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)

  useEffect(() => {
    getRecords((records, status, type) => {
      const d = { lanes: [] }
      status.forEach((v, k) => {
        d.lanes[v] = {
          id: k,
          title: k,
          cards: [],
        }
      })
      if (records.length === 0) {
        setLoading(false)
      } else {
        records.forEach((r) => {
          d.lanes[status.get(r.status.value)].cards.push({
            id: r.$id.value,
            title: r.summary.value,
            label: r.type.value,
            labelColor: type.get(r.type.value),
            description: r.detail.value,
            assignee: r.assignee.value,
            startDate: r.startDate.value,
            endDate: r.endDate.value,
          })
        })
        setData(d)
      }
    }, kintone.app.getQueryCondition() || undefined)
  }, [])

  const onCardClick = (cardId, metadata, laneId) => {
    const url =
      window.location.protocol + '//' + window.location.host + window.location.pathname + 'show#record=' + cardId
    window.location.assign(url)
  }

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    updateStatus(cardId, targetLaneId)
  }

  let content
  if (data) {
    content = (
      <Board
        data={data}
        draggable
        onCardClick={onCardClick}
        hideCardDeleteIcon
        handleDragEnd={handleDragEnd}
        style={{ padding: '30px 20px', backgroundColor: '#5F9AF8' }}
        components={{ Card: AntdCard }}
      />
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
export default Kanban
