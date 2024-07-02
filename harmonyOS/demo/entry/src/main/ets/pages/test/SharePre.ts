import preferences from '@ohos.data.preferences'

class SharePre {
  shareInstance = null

  getShareInstance() {
    return this.shareInstance
  }

  async setShareInstance(context) {
    this.shareInstance = await preferences.getPreferences(context, 'mystore')
  }

  getMode() {
    return this.shareInstance.get('mode', true)
  }

  async setMode(value) {
    await this.shareInstance.put('mode', value)
    await this.shareInstance.flush()
  }
}

export default new SharePre()