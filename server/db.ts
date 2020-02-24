import localforage from 'localforage'

type TodoRecord = {
  id: number
  label: string
  description: string
  checked: boolean
}

type DBData = {
  __cnt: number
  records: TodoRecord[]
}

class DB {
  private static NAME = 'my-db'
  private data: DBData
  constructor() {
    this.data = {
      __cnt: 0,
      records: []
    }
  }

  selectAll() {
    return this.data.records
  }

  insert(label: string[]) {
    const newRecords = label.map(lbl => ({
      id: this.data.__cnt++,
      label: lbl,
      description: "",
      checked: false
    }))

    this.data.records = [...this.data.records, ...newRecords]
  }

  update(id: number, column: string, value: any) {
    const record = this.data.records.find(record => record.id===id)
    if (record) {
      record[column] = value
      return record
    }
  }

  delete(id: number) {
    const recordIdx = this.data.records.findIndex(record => record.id===id)
    if (recordIdx!==-1) {
      this.data.records.splice(recordIdx, 1)
    }
  }
}

export default DB