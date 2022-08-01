import { KintoneRestAPIClient, KintoneRecordField, KintoneFormFieldProperty } from '@kintone/rest-api-client'
import stc from 'string-to-color'

export type AppRecord = {
  $id: KintoneRecordField.ID
  parent: KintoneRecordField.Number
  summary: KintoneRecordField.SingleLineText
  detail: KintoneRecordField.MultiLineText
  assignee: KintoneRecordField.UserSelect
  startDate: KintoneRecordField.Date
  endDate: KintoneRecordField.Date
  type: KintoneRecordField.Dropdown
  status: KintoneRecordField.Dropdown
}

export type AppProperty = {
  type: KintoneFormFieldProperty.Dropdown
  status: KintoneFormFieldProperty.Dropdown
}

const getRecordsByApi = (query?: string) => {
  return new KintoneRestAPIClient().record.getRecords<AppRecord>({
    app: kintone.app.getId()!,
    query: `${query ? query : ''} order by $id asc`,
  })
}

const getFieldsByApi = () => {
  return new KintoneRestAPIClient().app.getFormFields<AppProperty>({ app: kintone.app.getId()! })
}

export const updateStatus = async (recordID: string, status: string) => {
  await new KintoneRestAPIClient().record.updateRecord({
    app: kintone.app.getId()!,
    id: recordID,
    record: {
      status: {
        value: status,
      },
    },
  })
}
export const updateDate = async (recordID: string, start: string, end: string) => {
  await new KintoneRestAPIClient().record.updateRecord({
    app: kintone.app.getId()!,
    id: recordID,
    record: {
      startDate: {
        value: start,
      },
      endDate: {
        value: end,
      },
    },
  })
}

export const getRecords = async (
  cb: (records: AppRecord[], status: Map<string, number>, type: Map<string, string>) => void,
  query?: string,
) => {
  const [fields, list] = await kintone.Promise.all([getFieldsByApi(), getRecordsByApi(query)])
  const type = new Map()
  const status = new Map()
  Object.keys(fields.properties.type.options).forEach((k) => {
    type.set(k, stc(k))
  })
  Object.keys(fields.properties.status.options).forEach((k) => {
    status.set(k, fields.properties.status.options[k].index)
  })
  cb(list.records, status, type)
}
