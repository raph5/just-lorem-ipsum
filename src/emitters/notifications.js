// import emitter from 'tiny-emitter/instance'
const subscriberCallback = [];


export function pushNotification(text) {
  console.log('push', subscriberCallback)
  for(const callback of subscriberCallback) {
    callback(text)
  }
}
export function submitNotification(callback) {
  console.log('sub', callback)
  subscriberCallback.push(callback)
}