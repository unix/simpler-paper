type EventRecord = {
  type: string,
  handle: EventListener,
}

export class EventHub {
  
  private source: Text
  private eventRecords: EventRecord[] = []
  
  constructor() {
    this.source = document.createTextNode('')
  }
  
  dispath(eventType: string, detail?: any): void {
    const event: CustomEvent = new CustomEvent(eventType,
      Object.assign({
        bubbles: true,
        cancelable: true,
      }, { detail }))
    this.source.dispatchEvent(event)
  }
  
  listen(eventType: string, done: EventListener): void {
    const record: EventRecord = this.eventRecords.find(record => {
      return record.type === eventType && record.handle === done
    })
    if (!!record) return
    this.source.addEventListener(eventType, done)
    this.eventRecords.push({
      type: eventType,
      handle: done,
    })
  }
  
  remove(eventType: string, done?: EventListener): void {
    // just remove one
    if (done) return this.removeOne(eventType, done)
    this.eventRecords
      .filter(re => re.type === eventType)
      .forEach(re => this.source.removeEventListener(re.type, re.handle))
  }
  
  removeAll(): void {
    this.eventRecords
      .forEach(re => this.source.removeEventListener(re.type, re.handle))
  }
  
  private removeOne(eventType: string, done?: EventListener): void {
    const record: EventRecord = this.eventRecords.find(record => {
      return record.type === eventType && record.handle === done
    })
    if (!record) return
    this.source.removeEventListener(eventType, done)
  }
  
}
