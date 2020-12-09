declare namespace kintone.types {
  interface Fields {
    summary: kintone.fieldTypes.SingleLineText
    parent: kintone.fieldTypes.Number
    endDate: kintone.fieldTypes.Date
    type: kintone.fieldTypes.DropDown
    priority: kintone.fieldTypes.DropDown
    version: kintone.fieldTypes.DropDown
    Lookup_0: kintone.fieldTypes.SingleLineText
    detail: kintone.fieldTypes.MultiLineText
    startDate: kintone.fieldTypes.Date
    status: kintone.fieldTypes.DropDown

    assignee: kintone.fieldTypes.UserSelect
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id
    $revision: kintone.fieldTypes.Revision
    更新人: kintone.fieldTypes.Modifier
    创建人: kintone.fieldTypes.Creator
    更新时间: kintone.fieldTypes.UpdatedTime
    创建时间: kintone.fieldTypes.CreatedTime
    key: kintone.fieldTypes.RecordNumber
  }
}
