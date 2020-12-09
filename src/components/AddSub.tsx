import React from 'react'
import { Button, Tooltip } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'

const AddSub = ({ id = '' }) => {
  const onClick = () => {
    if (id) {
      const url = window.location.protocol + '//' + window.location.host + window.location.pathname + 'edit?pid=' + id
      window.location.assign(url.replaceAll('showedit', 'edit'))
    }
  }
  return (
    <Tooltip title="add sub task">
      <Button type="primary" shape="circle" icon={<PlusCircleTwoTone />} size="large" onClick={onClick} />
    </Tooltip>
  )
}

export default AddSub
