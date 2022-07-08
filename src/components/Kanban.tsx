import React, { useEffect } from 'react'
import Board from 'react-trello'
import { AppRecord, getRecords, updateStatus } from '../KintoneAppRepository'
import { AntdCard, KCard } from './Card'
import { Spin, Result } from 'antd'
import './app.css'

const Kanban = () => {
  const [data, setData] = React.useState<ReactTrello.BoardData>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  const display = (records: AppRecord[], status: Map<string, number>, type: Map<string, string>) => {
    if (records.length === 0) {
      setLoading(false)
    } else {
      const lanes = new Array(status.size)
      status.forEach((v, k) => {
        lanes[v] = {
          id: k,
          title: k,
          cards: new Array<KCard>(),
        }
      })
      records.forEach((record) =>
        lanes[status.get(record.status.value!)!].cards!.push({
          id: record.$id.value,
          title: record.summary.value,
          label: record.type.value!,
          labelColor: type.get(record.type.value!),
          description: record.detail.value,
          assignee: record.assignee,
          startDate: record.startDate.value!,
          endDate: record.endDate.value!,
        }),
      )
      setData({ lanes })
    }
  }

  useEffect(() => {
    getRecords(display, kintone.app.getQueryCondition() || undefined)
  }, [])

  const onCardClick = (cardId: string) => {
    const url =
      window.location.protocol + '//' + window.location.host + window.location.pathname + 'show#record=' + cardId
    window.location.assign(url)
  }

  const handleDragEnd = (cardId: string, _sourceLandId: string, targetLaneId: string) => {
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
