import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'

export function* handleGetConsent(action) {
  try {
    const consentRes = yield call(getConsent, action.payload)
    let loans = yield select(getLoanData)
    if (consentRes.data.code == "200" || consentRes.data.status == "SUCCESS") {
      let userConsents = loans.consents ? { ...loans.consents } : {}
      userConsents[action.payload.name] = consentRes.data.loanPurposeTemplateList[0]
      yield put(setConsents(userConsents))
    }
  } catch (error) {
    console.log("handleGetConsent error", error)
  }
}