import { Card, Avatar, Tag } from 'antd'
import React from 'react'

const { Meta } = Card

const Avatars = (props) => {
  return (
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      {props.assignee.map((element) => {
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

const AntdCard = (props) => {
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

export default AntdCard
