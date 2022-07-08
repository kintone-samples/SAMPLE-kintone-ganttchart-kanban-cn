import { KintoneRecordField } from '@kintone/rest-api-client'
import { Card, Avatar, Tag } from 'antd'
import React from 'react'

const { Meta } = Card

export interface KCard extends ReactTrello.DraggableCard {
  labelColor?: string
  assignee: KintoneRecordField.UserSelect
  startDate: string
  endDate: string
  onClick?: () => void
}

const Avatars = (props: { assignee: KintoneRecordField.UserSelect }) => {
  return (
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      {props.assignee.value.map((element) => {
        return (
          <Avatar
            // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            style={{
              backgroundColor: '#15dad2',
            }}
            key={element.code}
          >
            {element.name}
          </Avatar>
        )
      })}
    </Avatar.Group>
  )
}

export const AntdCard = (props: KCard) => {
  return (
    <Card
      extra={<Tag color={props.labelColor}>{props.label}</Tag>}
      style={{ width: 300 }}
      title={props.title}
      onClick={props.onClick}
    >
      <Meta
        avatar={<Avatars assignee={props.assignee} />}
        title={`${props.startDate.substring(5)}~${props.endDate.substring(5)}`}
        description={props.description}
      />
    </Card>
  )
}
